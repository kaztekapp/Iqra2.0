import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const DAILY_MESSAGE_LIMIT = 50;

const MODEL_MAP: Record<string, string> = {
  haiku: 'claude-haiku-4-5-20251001',
  sonnet: 'claude-sonnet-4-5-20250929',
};

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, content-type, x-client-info, apikey',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    });
  }

  try {
    // 1. Authenticate
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify the JWT
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Rate limiting
    const today = new Date().toISOString().split('T')[0];
    const { data: usage } = await supabase
      .from('ai_chat_usage')
      .select('message_count')
      .eq('user_id', user.id)
      .eq('usage_date', today)
      .single();

    if (usage && usage.message_count >= DAILY_MESSAGE_LIMIT) {
      return new Response(JSON.stringify({ error: 'Daily message limit reached' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 3. Parse request
    const { messages, systemPrompt, model: modelKey, maxTokens } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Messages required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const modelId = MODEL_MAP[modelKey] || MODEL_MAP.haiku;

    // Resolve max tokens with server-side cap
    const MAX_LIMITS: Record<string, number> = { haiku: 1024, sonnet: 1536 };
    const resolvedMaxTokens = Math.min(maxTokens || 768, MAX_LIMITS[modelKey] || 1024);

    // 4. Call Anthropic API with streaming
    const anthropicResponse = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: modelId,
        max_tokens: resolvedMaxTokens,
        system: systemPrompt,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
        stream: true,
      }),
    });

    if (!anthropicResponse.ok) {
      const errorBody = await anthropicResponse.text();
      console.error('Anthropic API error:', anthropicResponse.status, errorBody);
      return new Response(JSON.stringify({ error: 'AI service error' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 5. Increment usage counter (fire-and-forget)
    supabase
      .from('ai_chat_usage')
      .upsert(
        {
          user_id: user.id,
          usage_date: today,
          message_count: (usage?.message_count || 0) + 1,
        },
        { onConflict: 'user_id,usage_date' }
      )
      .then(() => {});

    // 6. Stream the response back
    return new Response(anthropicResponse.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

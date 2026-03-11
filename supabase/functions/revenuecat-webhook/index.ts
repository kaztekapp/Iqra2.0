import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ── Product ID → credit amount mapping ────────────────────────────
const CREDIT_AMOUNTS: Record<string, number> = {
  iqra_credits_10: 10,
  iqra_credits_50: 50,
  iqra_credits_200: 200,
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type, x-revenuecat-webhook-auth',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // 1. Verify webhook authorization (MANDATORY — never skip)
    const webhookSecret = Deno.env.get('REVENUECAT_WEBHOOK_SECRET');
    if (!webhookSecret) {
      console.error('[RevenueCat Webhook] REVENUECAT_WEBHOOK_SECRET is not set — rejecting all requests');
      return new Response(JSON.stringify({ error: 'Server misconfigured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const authHeader = req.headers.get('Authorization');
    if (authHeader !== `Bearer ${webhookSecret}`) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. Parse webhook body
    const body = await req.json();
    const event = body.event;

    if (!event) {
      return new Response(JSON.stringify({ error: 'Missing event' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const eventType: string = event.type;
    const eventId: string | undefined = event.id;
    const appUserId: string | undefined = event.app_user_id;
    const productId: string | undefined = event.product_id;
    const expirationAt: string | undefined = event.expiration_at_ms
      ? new Date(event.expiration_at_ms).toISOString()
      : undefined;

    console.log(`[RevenueCat Webhook] ${eventType} | id: ${eventId} | user: ${appUserId} | product: ${productId}`);

    if (!appUserId) {
      return new Response(JSON.stringify({ error: 'Missing app_user_id' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 3. Init Supabase with service role for admin operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 4. Idempotency check — skip if this event was already processed
    if (eventId) {
      const { data: existing } = await supabase
        .from('webhook_events')
        .select('id')
        .eq('event_id', eventId)
        .maybeSingle();

      if (existing) {
        console.log(`[RevenueCat Webhook] Duplicate event ${eventId} — skipping`);
        return new Response(JSON.stringify({ success: true, duplicate: true }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Record this event ID (fire-and-forget; the unique constraint also guards against races)
      await supabase
        .from('webhook_events')
        .insert({ event_id: eventId, event_type: eventType, app_user_id: appUserId })
        .then(() => {});
    }

    // 5. Handle event types
    switch (eventType) {
      // ── Consumable credit purchase ─────────────────────────────
      case 'NON_RENEWING_PURCHASE': {
        if (!productId || !CREDIT_AMOUNTS[productId]) {
          console.log(`[RevenueCat Webhook] Unknown product: ${productId}`);
          break;
        }

        const creditAmount = CREDIT_AMOUNTS[productId];

        const { data, error } = await supabase.rpc('grant_credits', {
          p_user_id: appUserId,
          p_amount: creditAmount,
          p_description: `Purchase: ${productId}`,
        });

        if (error) {
          console.error('[RevenueCat Webhook] grant_credits error:', error);
          return new Response(JSON.stringify({ error: 'Failed to grant credits' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        console.log(`[RevenueCat Webhook] Granted ${creditAmount} credits. New balance: ${data?.balance}`);
        break;
      }

      // ── Subscription started or renewed ────────────────────────
      case 'INITIAL_PURCHASE':
      case 'RENEWAL': {
        const plan = productId?.includes('yearly') ? 'yearly' : 'monthly';

        const { error } = await supabase
          .from('user_credits')
          .update({
            subscription_status: 'active',
            subscription_plan: plan,
            subscription_expires_at: expirationAt ?? null,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', appUserId);

        if (error) {
          console.error('[RevenueCat Webhook] Subscription update error:', error);
          // Try to auto-create row if missing
          if (error.code === 'PGRST116') {
            await supabase.from('user_credits').insert({
              user_id: appUserId,
              subscription_status: 'active',
              subscription_plan: plan,
              subscription_expires_at: expirationAt ?? null,
            });
          }
        }

        console.log(`[RevenueCat Webhook] Subscription activated: ${plan}`);
        break;
      }

      // ── Subscription cancelled (still active until expiry) ─────
      case 'CANCELLATION': {
        const { error } = await supabase
          .from('user_credits')
          .update({
            subscription_status: 'cancelled',
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', appUserId);

        if (error) console.error('[RevenueCat Webhook] Cancellation error:', error);
        console.log('[RevenueCat Webhook] Subscription cancelled');
        break;
      }

      // ── Subscription expired ───────────────────────────────────
      case 'EXPIRATION': {
        const { error } = await supabase
          .from('user_credits')
          .update({
            subscription_status: 'expired',
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', appUserId);

        if (error) console.error('[RevenueCat Webhook] Expiration error:', error);
        console.log('[RevenueCat Webhook] Subscription expired');
        break;
      }

      default:
        console.log(`[RevenueCat Webhook] Unhandled event type: ${eventType}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('[RevenueCat Webhook] Error:', e);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

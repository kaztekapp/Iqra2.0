import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as moderation from '../services/moderationService';
import { useSettingsStore } from './settingsStore';
import { quietly } from '../lib/report';

/**
 * People this person has blocked. Kept on the phone so a block hides content
 * the moment it is made (and offline), and mirrored to blocked_users so it
 * follows the account to another device.
 */
export interface BlockedPerson {
  name: string;
  blockedAt: string;
}

interface ModerationState {
  blocked: Record<string, BlockedPerson>;
  /** Whose list this is, so a different account signing in starts clean. */
  ownerId: string | null;
  /** Blocks the person on the server, then hides them. Throws if the server refuses. */
  block: (userId: string, name: string) => Promise<void>;
  /** Unblocks on the server, then shows them again. Throws if the server refuses. */
  unblock: (userId: string) => Promise<void>;
  /** Pull blocks made on other devices. Failure keeps the local list. */
  sync: () => Promise<void>;
}

export const useModerationStore = create<ModerationState>()(
  persist(
    (set, get) => ({
      blocked: {},
      ownerId: null,

      block: async (userId, name) => {
        const me = useSettingsStore.getState().user?.id;
        if (!me) throw new Error('Not signed in');
        await moderation.blockUser(me, userId);
        set((s) => {
          const base = s.ownerId === me ? s.blocked : {};
          return { ownerId: me, blocked: { ...base, [userId]: { name, blockedAt: new Date().toISOString() } } };
        });
      },

      unblock: async (userId) => {
        const me = useSettingsStore.getState().user?.id;
        if (!me) throw new Error('Not signed in');
        await moderation.unblockUser(me, userId);
        set((s) => {
          const next = { ...s.blocked };
          delete next[userId];
          return { blocked: next };
        });
      },

      sync: async () => {
        const me = useSettingsStore.getState().user?.id;
        if (!me) return;
        try {
          const rows = await moderation.fetchBlockedUsers(me);
          const local = get().ownerId === me ? get().blocked : {};
          const missing = rows.map((r) => r.blockedId).filter((id) => !local[id]);
          const names = missing.length ? await moderation.fetchDisplayNames(missing).catch(() => ({} as Record<string, string>)) : {};
          const next: Record<string, BlockedPerson> = {};
          for (const r of rows) {
            next[r.blockedId] = local[r.blockedId] ?? { name: names[r.blockedId] ?? '', blockedAt: r.createdAt };
          }
          // Local-only entries (sample content, never on the server) survive a sync.
          for (const [id, p] of Object.entries(local)) {
            if (!next[id] && !/^[0-9a-f-]{36}$/i.test(id)) next[id] = p;
          }
          set({ blocked: next, ownerId: me });
        } catch (e) {
          quietly(e, 'moderation.sync');
        }
      },
    }),
    {
      name: 'iqra-moderation',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ blocked: s.blocked, ownerId: s.ownerId }),
    }
  )
);

/** Non-hook check for filters that run outside React. */
export function isBlocked(userId: string | null | undefined): boolean {
  return !!userId && !!useModerationStore.getState().blocked[userId];
}

/** Hook: the set of blocked ids, stable until the list changes. */
export function useBlockedMap(): Record<string, BlockedPerson> {
  return useModerationStore((s) => s.blocked);
}

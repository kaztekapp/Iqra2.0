import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AIModuleContext, AIConversationMemory } from '../types/aiChat';

interface AIMemoryState {
  memories: Partial<Record<AIModuleContext, AIConversationMemory>>;
  updateMemory: (module: AIModuleContext, memory: AIConversationMemory) => void;
  getMemory: (module: AIModuleContext) => AIConversationMemory | undefined;
  clearMemory: (module?: AIModuleContext) => void;
}

export const useAIMemoryStore = create<AIMemoryState>()(
  persist(
    (set, get) => ({
      memories: {},

      updateMemory: (module, memory) =>
        set((state) => ({
          memories: {
            ...state.memories,
            [module]: memory,
          },
        })),

      getMemory: (module) => get().memories[module],

      clearMemory: (module) => {
        if (module) {
          set((state) => {
            const { [module]: _, ...rest } = state.memories;
            return { memories: rest };
          });
        } else {
          set({ memories: {} });
        }
      },
    }),
    {
      name: 'iqra-ai-memory',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

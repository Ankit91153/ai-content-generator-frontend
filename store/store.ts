import { create } from 'zustand';

interface StoreState {
  totelUsage: number; // Fixing typo
  setTotelUsage: (usage: number) => void;
  aiResponseData: any;
  setAiResponseData: (data: any) => void;
  user: any;
  setUser: (data:any) => void;

  
}

// Create the Zustand store
export const useStore = create<StoreState>((set) => ({
  totelUsage: 0, // Initialize totalUsage to 0
  setTotelUsage: (usage: number) => set({ totelUsage: usage }), // Setter for totalUsage
  aiResponseData: null, // Initial AI response data
  setAiResponseData: (data: any) => set({ aiResponseData: data }), // Setter for AI response data
  user: {}, // Subscription initially false
  setUser: (data: any) => set({ user: data }), // Setter for subscription
}));

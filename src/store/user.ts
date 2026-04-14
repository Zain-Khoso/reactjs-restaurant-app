import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: string;
  phone?: string | null;
};

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (data: Partial<User>) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (data) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    })),
  clearUser: () => set({ user: null }),
}));

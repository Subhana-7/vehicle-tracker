import { create } from "zustand";
import { loginUser } from "../services/auth.service";

type AuthState = {
  isAuthenticated: boolean;
  loading: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setAuth: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  loading: false,

  login: async (email, password) => {
    try {
      set({ loading: true });

      await loginUser({ email, password });

      set({ isAuthenticated: true, loading: false });
    } catch (err) {
      set({ isAuthenticated: false, loading: false });
      throw err;
    }
  },

  logout: () => {
    set({ isAuthenticated: false });
  },

  setAuth: (value) => set({ isAuthenticated: value }),
}));
import { create } from "zustand";
import { authService } from "@/api/authService";
import type { AuthUser, LoginData, RegisterData } from "@/types/auth";
import { tokenStorage } from "@/utils/tokenStorage";

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  loadUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,

  login: async (data) => {
    const response = await authService.login(data);

    tokenStorage.setToken(response.token);

    set({
      user: response.user,
      isAuthenticated: true,
    });
  },

  register: async (data) => {
    const response = await authService.register(data);

    tokenStorage.setToken(response.token);

    set({
      user: response.user,
      isAuthenticated: true,
    });
  },

  loadUser: async () => {
    try {
      set({ isLoading: true });

      const token = tokenStorage.getToken();

      if (!token) {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        return;
      }

      const user = await authService.getMe();

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      tokenStorage.removeToken();

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  logout: () => {
    tokenStorage.removeToken();

    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));
import { apiClient } from "./apiClient";
import type { AuthResponse, AuthUser, LoginData, RegisterData } from "@/types/auth";

export const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  getMe: async (): Promise<AuthUser> => {
  const response = await apiClient.get<{ user: AuthUser }>("/auth/me");
  return response.data.user;
},
};
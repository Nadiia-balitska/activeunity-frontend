import { apiClient } from "./apiClient";
import type { AuthResponse, LoginData, RegisterData } from "@/types/auth";

export const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  getMe: async (): Promise<AuthResponse["user"]> => {
    const response = await apiClient.get<AuthResponse["user"]>("/auth/me");
    return response.data;
  },
};
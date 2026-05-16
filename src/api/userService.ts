import { apiClient } from "@/api/apiClient";
import type { UserProfileResponse } from "@/types/user";

export const userService = {
  getProfile: async (): Promise<UserProfileResponse> => {
    const response = await apiClient.get<UserProfileResponse>("/users/profile");
    return response.data;
  },
};
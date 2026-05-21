import { apiClient } from "@/api/apiClient";

import type {
  UpdateProfileData,
  UpdateProfileResponse,
  UserProfileResponse,
} from "@/types/user";

export const userService = {
  getProfile: async (): Promise<UserProfileResponse> => {
    const response = await apiClient.get<UserProfileResponse>("/users/profile");
    return response.data;
  },

  updateProfile: async (
    data: UpdateProfileData
  ): Promise<UpdateProfileResponse> => {
    const response = await apiClient.put<UpdateProfileResponse>(
      "/users/profile",
      data
    );

    return response.data;
  },

  getUserById: async (id: string): Promise<UserProfileResponse> => {
  const response = await apiClient.get<UserProfileResponse>(`/users/${id}`);
  return response.data;
},


addFavoriteEvent: async (eventId: string) => {
  const response = await apiClient.post(
    `/users/favorites/${eventId}`
  );

  return response.data;
},

removeFavoriteEvent: async (eventId: string) => {
  const response = await apiClient.delete(
    `/users/favorites/${eventId}`
  );

  return response.data;
},
};



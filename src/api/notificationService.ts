import { apiClient } from "@/api/apiClient";
import type { NotificationsResponse } from "@/types/notification";

export const notificationService = {
  getNotifications: async (): Promise<NotificationsResponse> => {
    const response =
      await apiClient.get<NotificationsResponse>("/notifications");

    return response.data;
  },

  markAsRead: async (id: string) => {
    const response = await apiClient.patch(`/notifications/${id}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await apiClient.patch("/notifications/read-all");
    return response.data;
  },
};
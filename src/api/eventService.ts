import { apiClient } from "@/api/apiClient";
import type { Event } from "@/types/event";

export const eventService = {
  getEvents: async (): Promise<Event[]> => {
    const response = await apiClient.get<Event[]>("/events");
    return response.data;
  },
};
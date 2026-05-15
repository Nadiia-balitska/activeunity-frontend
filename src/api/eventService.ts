import { apiClient } from "@/api/apiClient";

import type {
  Event,
  EventResponse,
  EventsResponse,
  ParticipantsResponse,
} from "@/types/event";


export const eventService = {
  getEvents: async (): Promise<Event[]> => {
    const response = await apiClient.get<EventsResponse>("/events");
    return response.data.events;
  },

  getEventById: async (id: string): Promise<Event> => {
    const response = await apiClient.get<EventResponse>(`/events/${id}`);
    return response.data.event;
  },

  joinEvent: async (id: string): Promise<Event> => {
    const response = await apiClient.post<EventResponse>(`/events/${id}/join`);
    return response.data.event;
  },

  leaveEvent: async (id: string): Promise<Event> => {
    const response = await apiClient.post<EventResponse>(`/events/${id}/leave`);
    return response.data.event;
  },

  getEventParticipants: async (
    id: string
  ): Promise<ParticipantsResponse> => {
    const response = await apiClient.get<ParticipantsResponse>(
      `/events/${id}/participants`
    );
    return response.data;
  },
};
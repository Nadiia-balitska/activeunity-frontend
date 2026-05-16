import { apiClient } from "@/api/apiClient";

import type {
  CreateEventData,
  DeleteEventResponse,
  Event,
  EventFilters,
  EventResponse,
  EventsResponse,
  ParticipantsResponse,
  UpdateEventData,
} from "@/types/event";

export const eventService = {

getEvents: async (
  filters?: EventFilters & { page?: number }
): Promise<EventsResponse> => {
  const response = await apiClient.get<EventsResponse>("/events", {
    params: filters,
  });

  return response.data;
},

  getEventById: async (id: string): Promise<Event> => {
    const response = await apiClient.get<EventResponse>(`/events/${id}`);
    return response.data.event;
  },

  createEvent: async (data: CreateEventData): Promise<Event> => {
    const response = await apiClient.post<EventResponse>("/events", data);
    return response.data.event;
  },

  updateEvent: async (id: string, data: UpdateEventData): Promise<Event> => {
    const response = await apiClient.put<EventResponse>(`/events/${id}`, data);
    return response.data.event;
  },

  deleteEvent: async (id: string): Promise<DeleteEventResponse> => {
    const response = await apiClient.delete<DeleteEventResponse>(
      `/events/${id}`
    );
    return response.data;
  },

  joinEvent: async (id: string): Promise<Event> => {
    const response = await apiClient.post<EventResponse>(`/events/${id}/join`);
    return response.data.event;
  },

  leaveEvent: async (id: string): Promise<Event> => {
    const response = await apiClient.delete<EventResponse>(
      `/events/${id}/leave`
    );
    return response.data.event;
  },

  getEventParticipants: async (id: string): Promise<ParticipantsResponse> => {
    const response = await apiClient.get<ParticipantsResponse>(
      `/events/${id}/participants`
    );
    return response.data;
  },
};
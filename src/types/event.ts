export interface EventParticipant {
  id?: string;
  _id?: string;
  name: string;
  email: string;
}

export interface EventOrganizer {
  id?: string;
  _id?: string;
  name: string;
  email: string;
}

export type EventParticipantValue = EventParticipant | string;

export interface Event {
  id?: string;
  _id?: string;

  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  image?: string;
  status?: string;
  maxParticipants?: number;

  organizer?: EventOrganizer;
  participants?: EventParticipantValue[];

  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEventData {
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  image?: string;
  maxParticipants?: number;
}

export interface UpdateEventData {
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  category?: string;
  image?: string;
  maxParticipants?: number;
  status?: string;
}

export interface EventsResponse {
  success: boolean;
  page: number;
  pages: number;
  total: number;
  count: number;
  events: Event[];
}

export interface EventResponse {
  success: boolean;
  event: Event;
}

export interface DeleteEventResponse {
  success: boolean;
  message: string;
}

export interface ParticipantsResponse {
  success: boolean;
  count: number;
  participants: EventParticipant[];
}

export interface EventFilters {
  search?: string;
  category?: string;
  status?: string;
}
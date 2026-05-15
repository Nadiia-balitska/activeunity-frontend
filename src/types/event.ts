export interface EventParticipant {
  _id: string;
  name: string;
  email: string;
}

export interface EventOrganizer {
  _id: string;
  name: string;
  email: string;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  image?: string;
  status?: string;
  maxParticipants?: number;

  organizer?: EventOrganizer;

  participants?: EventParticipant[];

  createdAt?: string;
  updatedAt?: string;
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

export interface ParticipantsResponse {
  success: boolean;
  count: number;
  participants: EventParticipant[];
}
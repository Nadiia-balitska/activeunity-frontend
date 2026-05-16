import type { Event } from "@/types/event";

export interface ProfileUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
  createdAt?: string;
}

export interface UserProfileResponse {
  success: boolean;
  user: ProfileUser;
  createdEvents: Event[];
  joinedEvents: Event[];
}



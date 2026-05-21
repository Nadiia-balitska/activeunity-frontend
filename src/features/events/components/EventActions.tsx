"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { eventService } from "@/api/eventService";
import type { Event, EventParticipant } from "@/types/event";
import { useAuthStore } from "@/store/authStore";

interface EventActionsProps {
  event: Event;
  onEventChange: (event: Event) => void;
}

type AuthUserLike = {
  id?: string;
  _id?: string;
  name?: string;
  email?: string;
};

function getEventId(event: Event) {
  return event.id || event._id || "";
}

function getUserId(user: AuthUserLike | null | undefined) {
  return user?.id || user?._id || "";
}

function getParticipantId(participant: EventParticipant | string | undefined) {
  if (!participant) return "";

  if (typeof participant === "string") {
    return participant;
  }

  return participant.id || participant._id || "";
}

export function EventActions({ event, onEventChange }: EventActionsProps) {
  const { user } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);

  const eventId = getEventId(event);
  const userId = getUserId(user);
  const participants = event.participants ?? [];

  const isJoined = participants.some(
    (participant) => getParticipantId(participant) === userId
  );

  const isFull =
    event.maxParticipants !== undefined &&
    participants.length >= event.maxParticipants;

  const isUnavailable =
    event.status === "completed" || event.status === "cancelled";

  const handleJoin = async () => {
    if (!eventId) {
      toast.error("Event id is missing.");
      return;
    }

    if (!userId) {
      toast.error("Please log in to join this event.");
      return;
    }

    if (isJoined) return;

    try {
      setIsLoading(true);

      const updatedEvent = await eventService.joinEvent(eventId);

      onEventChange(updatedEvent);
      toast.success("Joined event successfully.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to join event.");
      } else {
        toast.error("Failed to join event.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeave = async () => {
    if (!eventId) {
      toast.error("Event id is missing.");
      return;
    }

    if (!userId) {
      toast.error("Please log in again.");
      return;
    }

    if (!isJoined) return;

    try {
      setIsLoading(true);

      const updatedEvent = await eventService.leaveEvent(eventId);

      onEventChange(updatedEvent);
      toast.success("Left event successfully.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to leave event.");
      } else {
        toast.error("Failed to leave event.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
        <p className="text-sm text-slate-300">
          Please log in to join this event.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <p className="text-sm text-slate-300">
        {participants.length}
        {event.maxParticipants ? ` / ${event.maxParticipants}` : ""}{" "}
        participants
      </p>

      {isUnavailable ? (
        <p className="mt-4 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-300">
          This event is no longer active.
        </p>
      ) : isJoined ? (
        <button
          type="button"
          onClick={handleLeave}
          disabled={isLoading}
          className="mt-4 rounded-xl bg-blue-950 px-5 py-3 text-sm font-medium text-blue-200 transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Leaving..." : "Leave event"}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleJoin}
          disabled={isLoading || isFull}
          className="mt-4 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Joining..." : isFull ? "Event is full" : "Join event"}
        </button>
      )}
    </div>
  );
}
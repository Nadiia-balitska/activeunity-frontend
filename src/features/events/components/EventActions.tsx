"use client";

import { useState } from "react";
import axios from "axios";

import { eventService } from "@/api/eventService";
import type { Event, EventParticipant } from "@/types/event";
import { useAuthStore } from "@/store/authStore";

interface EventActionsProps {
  event: Event;
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

export function EventActions({ event }: EventActionsProps) {
  const { user } = useAuthStore();

  const [currentEvent, setCurrentEvent] = useState<Event>(event);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const eventId = getEventId(currentEvent);
  const userId = getUserId(user);

  const participants = currentEvent.participants ?? [];

  const isJoined = participants.some(
    (participant) => getParticipantId(participant) === userId
  );

  const isFull =
    currentEvent.maxParticipants !== undefined &&
    participants.length >= currentEvent.maxParticipants;

  const handleJoin = async () => {
    if (!eventId) {
      setError("Event id is missing.");
      return;
    }

    if (!userId) {
      setError("User id is missing. Please log in again.");
      return;
    }

    if (isJoined) return;

    try {
      setIsLoading(true);
      setError("");

      await eventService.joinEvent(eventId);

      setCurrentEvent((prevEvent) => ({
        ...prevEvent,
        participants: [...(prevEvent.participants ?? []), userId],
      }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to join event.");
      } else {
        setError("Failed to join event.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeave = async () => {
    if (!eventId) {
      setError("Event id is missing.");
      return;
    }

    if (!userId) {
      setError("User id is missing. Please log in again.");
      return;
    }

    if (!isJoined) return;

    try {
      setIsLoading(true);
      setError("");

      await eventService.leaveEvent(eventId);

      setCurrentEvent((prevEvent) => ({
        ...prevEvent,
        participants: (prevEvent.participants ?? []).filter(
          (participant) => getParticipantId(participant) !== userId
        ),
      }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to leave event.");
      } else {
        setError("Failed to leave event.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <p className="mt-8 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
        Please log in to join this event.
      </p>
    );
  }

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm text-slate-600">
        {participants.length}
        {currentEvent.maxParticipants
          ? ` / ${currentEvent.maxParticipants}`
          : ""}{" "}
        participants
      </p>

      {error && (
        <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {isJoined ? (
        <button
          type="button"
          onClick={handleLeave}
          disabled={isLoading}
          className="mt-4 rounded-xl border border-red-200 px-5 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Leaving..." : "Leave event"}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleJoin}
          disabled={isLoading || isFull}
          className="mt-4 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Joining..." : isFull ? "Event is full" : "Join event"}
        </button>
      )}
    </div>
  );
}
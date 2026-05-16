"use client";
import { useState } from "react";

import { eventService } from "@/api/eventService";
import type { Event } from "@/types/event";
import { useAuthStore } from "@/store/authStore";


interface EventActionsProps {
  event: Event;
}

export function EventActions({ event }: EventActionsProps) {
  const { user } = useAuthStore();

  const [currentEvent, setCurrentEvent] = useState(event);
  const [isLoading, setIsLoading] = useState(false);

  const participants = currentEvent.participants ?? [];

  const isJoined = participants.some(
    (participant) => participant._id === user?._id
  );

  const isFull =
    currentEvent.maxParticipants !== undefined &&
    participants.length >= currentEvent.maxParticipants;

  const handleJoin = async () => {
    try {
      setIsLoading(true);
      const updatedEvent = await eventService.joinEvent(currentEvent._id);
      setCurrentEvent(updatedEvent);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeave = async () => {
    try {
      setIsLoading(true);
      const updatedEvent = await eventService.leaveEvent(currentEvent._id);
      setCurrentEvent(updatedEvent);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
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
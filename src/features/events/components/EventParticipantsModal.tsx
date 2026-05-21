"use client";

import { useState } from "react";
import axios from "axios";

import { eventService } from "@/api/eventService";
import type { EventParticipant } from "@/types/event";

interface EventParticipantsModalProps {
  eventId: string;
  participantsCount: number;
}

function getParticipantId(participant: EventParticipant) {
  return participant.id || participant._id || participant.email;
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase();
}

export function EventParticipantsModal({
  eventId,
  participantsCount,
}: EventParticipantsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [participants, setParticipants] = useState<EventParticipant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadParticipants = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await eventService.getEventParticipants(eventId);

      setParticipants(response.participants);
      setIsOpen(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Failed to load participants."
        );
      } else {
        setError("Failed to load participants.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={loadParticipants}
        disabled={isLoading || !eventId || participantsCount === 0}
        className="mt-4 rounded-xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Loading..." : `View participants (${participantsCount})`}
      </button>

      {error && (
        <p className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/40">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Event participants
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  {participants.length} people joined this event.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            {participants.length > 0 ? (
              <div className="max-h-96 space-y-3 overflow-y-auto pr-1">
                {participants.map((participant) => (
                  <div
                    key={getParticipantId(participant)}
                    className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-blue-500/20 bg-blue-500/10 text-sm font-bold text-blue-300">
                      {participant.avatar ? (
                        <img
                          src={participant.avatar}
                          alt={participant.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        getInitial(participant.name)
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-white">
                        {participant.name}
                      </p>

                      <p className="truncate text-sm text-slate-400">
                        {participant.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 text-center text-slate-400">
                No participants yet.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
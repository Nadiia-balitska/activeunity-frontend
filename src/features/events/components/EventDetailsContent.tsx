"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { Event } from "@/types/event";
import { EventActions } from "@/features/events/components/EventActions";
import { EventOwnerActions } from "@/features/events/components/EventOwnerActions";
import { EventParticipantsModal } from "@/features/events/components/EventParticipantsModal";
import { useAuthStore } from "@/store/authStore";

interface EventDetailsContentProps {
  event: Event;
}

function getOrganizerId(organizer: Event["organizer"]) {
  if (!organizer) return "";

  if (typeof organizer === "string") {
    return organizer;
  }

  return organizer.id || organizer._id || "";
}

export function EventDetailsContent({ event }: EventDetailsContentProps) {
  const [currentEvent, setCurrentEvent] = useState<Event>(event);

  const user = useAuthStore((state) => state.user);

  const participantsCount = currentEvent.participants?.length ?? 0;

  const eventId = currentEvent.id || currentEvent._id || "";
  const organizerId = getOrganizerId(currentEvent.organizer);

const userId =
  (user as { id?: string; _id?: string })?.id ||
  (user as { id?: string; _id?: string })?._id;

  const isMyEvent = Boolean(userId && organizerId && organizerId === userId);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <Link
          href="/events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-blue-400"
        >
          <ArrowLeft size={18} />
          Back to events
        </Link>

        <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/20">
          <div className="h-80 bg-slate-800">
            {currentEvent.image ? (
              <img
                src={currentEvent.image}
                alt={currentEvent.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-500">
                No image available
              </div>
            )}
          </div>

          <div className="p-8 md:p-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
                  {currentEvent.category}
                </span>

                {isMyEvent && (
                  <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-semibold text-violet-300">
                    My event
                  </span>
                )}
              </div>

              <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 px-5 py-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">
                  Event time
                </p>

                <time
                  dateTime={currentEvent.date}
                  className="mt-1 block text-base font-bold text-white"
                >
                  {new Date(currentEvent.date).toLocaleString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </time>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white">
              {currentEvent.title}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
              {currentEvent.description}
            </p>
            
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-5">
  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-blue-500/20 bg-blue-500/10 text-lg font-bold text-blue-300">
    {currentEvent.organizer &&
    typeof currentEvent.organizer !== "string" &&
    currentEvent.organizer.avatar ? (
      <img
        src={currentEvent.organizer.avatar}
        alt={currentEvent.organizer.name}
        className="h-full w-full object-cover"
      />
    ) : currentEvent.organizer &&
      typeof currentEvent.organizer !== "string" ? (
      currentEvent.organizer.name.charAt(0).toUpperCase()
    ) : (
      "O"
    )}
  </div>

  <div className="min-w-0">
    <div className="mb-1 flex items-center gap-2">
      <p className="font-semibold text-white">
        {currentEvent.organizer &&
        typeof currentEvent.organizer !== "string"
          ? currentEvent.organizer.name
          : "Organizer"}
      </p>

      <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-300">
        Organizer
      </span>
    </div>

    {currentEvent.organizer &&
      typeof currentEvent.organizer !== "string" && (
        <p className="truncate text-sm text-slate-400">
          {currentEvent.organizer.email}
        </p>
      )}
  </div>
</div>

            <dl className="mt-10 grid gap-6 border-t border-slate-800 pt-8 md:grid-cols-3">
              <div>
                <dt className="text-sm font-semibold text-white">Location</dt>
                <dd className="mt-2 text-slate-400">{currentEvent.location}</dd>
              </div>

              <div>
                <dt className="text-sm font-semibold text-white">
                  Participants
                </dt>
                <dd className="mt-2 text-slate-400">
                  {participantsCount}
                  {currentEvent.maxParticipants
                    ? ` / ${currentEvent.maxParticipants}`
                    : ""}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-semibold text-white">Status</dt>
                <dd className="mt-2 capitalize text-slate-400">
                  {currentEvent.status || "Unknown"}
                </dd>
              </div>
            </dl>

            <EventParticipantsModal
              eventId={eventId}
              participantsCount={participantsCount}
            />

            <EventActions
              event={currentEvent}
              onEventChange={setCurrentEvent}
            />

            {isMyEvent && eventId && (
              <EventOwnerActions
                eventId={eventId}
                currentStatus={currentEvent.status}
                onStatusChange={(status) =>
                  setCurrentEvent((prevEvent) => ({
                    ...prevEvent,
                    status,
                  }))
                }
              />
            )}
          </div>
        </article>
      </section>
    </main>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { Event } from "@/types/event";
import { EventActions } from "@/features/events/components/EventActions";

interface EventDetailsContentProps {
  event: Event;
}

export function EventDetailsContent({ event }: EventDetailsContentProps) {
  const [currentEvent, setCurrentEvent] = useState<Event>(event);

  const participantsCount = currentEvent.participants?.length ?? 0;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <Link
          href="/events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to events
        </Link>

        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="h-80 bg-slate-100">
            {currentEvent.image ? (
              <img
                src={currentEvent.image}
                alt={currentEvent.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                No image available
              </div>
            )}
          </div>

          <div className="p-8 md:p-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <span className="rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
                {currentEvent.category}
              </span>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-500">
                  Event time
                </p>

                <time
                  dateTime={currentEvent.date}
                  className="mt-1 block text-base font-bold text-blue-700"
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

            <h1 className="text-4xl font-bold tracking-tight text-slate-950">
              {currentEvent.title}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
              {currentEvent.description}
            </p>

            <dl className="mt-10 grid gap-6 border-t border-slate-200 pt-8 md:grid-cols-3">
              <div>
                <dt className="text-sm font-semibold text-slate-900">
                  Location
                </dt>
                <dd className="mt-2 text-slate-600">
                  {currentEvent.location}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-semibold text-slate-900">
                  Participants
                </dt>
                <dd className="mt-2 text-slate-600">
                  {participantsCount}
                  {currentEvent.maxParticipants
                    ? ` / ${currentEvent.maxParticipants}`
                    : ""}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-semibold text-slate-900">
                  Status
                </dt>
                <dd className="mt-2 capitalize text-slate-600">
                  {currentEvent.status || "Unknown"}
                </dd>
              </div>
            </dl>

            <EventActions event={currentEvent} onEventChange={setCurrentEvent} />
          </div>
        </article>
      </section>
    </main>
  );
}
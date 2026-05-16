"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { eventService } from "@/api/eventService";
import { EventCard } from "@/features/events/components/EventCard";
import type { Event } from "@/types/event";

export function EventsList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setError("");

        const data = await eventService.getEvents();

        setEvents(data);
      } catch {
        setError("Failed to load events.");
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="container py-16">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 mt-3">
              Events
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600">
              Discover activities, workshops, and local initiatives created by
              the ActiveUnity community.
            </p>
          </div>

          <Link
            href="/events/create"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Create event
          </Link>
        </div>

        {isLoading && <p className="text-slate-600">Loading events...</p>}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {!isLoading && !error && events.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              No events yet
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Events created by users will appear here.
            </p>
          </div>
        )}

        {!isLoading && !error && events.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.id || event._id}
                event={event}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
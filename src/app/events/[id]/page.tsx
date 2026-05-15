import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { notFound } from "next/navigation";

import { eventService } from "@/api/eventService";
import type { Event } from "@/types/event";

interface EventDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;

  let event: Event;

  try {
    event = await eventService.getEventById(id);
  } catch {
    notFound();
  }

  const participantsCount = event.participants?.length ?? 0;

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
            {event.image ? (
              <img
                src={event.image}
                alt={event.title}
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
                {event.category || "Community"}
              </span>

              <time className="text-sm text-slate-500" dateTime={event.date}>
                {new Date(event.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950">
              {event.title}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
              {event.description}
            </p>

            <dl className="mt-10 grid gap-6 border-t border-slate-200 pt-8 md:grid-cols-3">
              <div>
                <dt className="text-sm font-semibold text-slate-900">
                  Location
                </dt>
                <dd className="mt-2 text-slate-600">{event.location}</dd>
              </div>

              <div>
                <dt className="text-sm font-semibold text-slate-900">
                  Participants
                </dt>
                <dd className="mt-2 text-slate-600">
                  {participantsCount}
                  {event.maxParticipants ? ` / ${event.maxParticipants}` : ""}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-semibold text-slate-900">Status</dt>
                <dd className="mt-2 capitalize text-slate-600">
                  {event.status || "Unknown"}
                </dd>
              </div>
            </dl>
          </div>
        </article>
      </section>
    </main>
  );
}
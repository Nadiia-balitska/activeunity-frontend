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

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="container mx-auto px-4 py-16">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
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

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">
            {event.description}
          </p>

          <dl className="mt-10 grid gap-6 border-t border-slate-200 pt-8 md:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold text-slate-900">Location</dt>
              <dd className="mt-2 text-slate-600">{event.location}</dd>
            </div>

            <div>
              <dt className="text-sm font-semibold text-slate-900">
                Event date
              </dt>
              <dd className="mt-2 text-slate-600">
                {new Date(event.date).toLocaleString("en-GB")}
              </dd>
            </div>
          </dl>
        </article>
      </section>
    </main>
  );
}
import Link from "next/link";

import type { Event } from "@/types/event";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
const formattedDate = new Date(event.date).toLocaleString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

  const participantsCount = event.participants?.length || 0;

  return (
    <Link href={`/events/${event._id}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
        <div className="h-52 overflow-hidden bg-slate-100">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              No image available
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              {event.category || "Community"}
            </span>

            <time
  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
  dateTime={event.date}
>
  {formattedDate}
</time>
          </div>

          <h2 className="text-xl font-semibold text-slate-950 transition group-hover:text-blue-600">
            {event.title}
          </h2>

          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
            {event.description}
          </p>

          <div className="mt-auto pt-6">
            <div className="space-y-2">
              <p className="text-sm text-slate-500">{event.location}</p>

              <p className="text-sm text-slate-500">
                {participantsCount} participant
                {participantsCount !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  event.status === "upcoming"
                    ? "bg-green-50 text-green-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {event.status || "Unknown"}
              </span>

              <span className="text-sm font-medium text-blue-600">
                View details →
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
import Link from "next/link";

import type { Event } from "@/types/event";
import { useAuthStore } from "@/store/authStore";

interface EventCardProps {
  event: Event;
}

function getEventId(event: Event) {
  return event.id || event._id || "";
}

function getOrganizerId(event: Event) {
  if (!event.organizer) return "";

  if (typeof event.organizer === "string") {
    return event.organizer;
  }

  return event.organizer.id || event.organizer._id || "";
}

export function EventCard({ event }: EventCardProps) {
  const { user } = useAuthStore();

  const eventId = getEventId(event);
  const organizerId = getOrganizerId(event);
const userId = user?.id;

  const isMyEvent = Boolean(userId && organizerId === userId);

  const participantsCount = event.participants?.length ?? 0;

  const formattedDate = new Date(event.date).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Link href={`/events/${eventId}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-blue-500/10">
        <div className="relative h-56 overflow-hidden bg-slate-800">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">
              No image available
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
              {event.category || "Community"}
            </span>

            <time
              className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300"
              dateTime={event.date}
            >
              {formattedDate}
            </time>
          </div>

          {isMyEvent && (
            <span className="mb-3 w-fit rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
              My event
            </span>
          )}

          <h2 className="text-xl font-semibold text-white transition group-hover:text-blue-400">
            {event.title}
          </h2>

          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
            {event.description}
          </p>

          <div className="mt-auto pt-6">
            <div className="space-y-2">
              <p className="text-sm text-slate-400">📍 {event.location}</p>

              <p className="text-sm text-slate-400">
                👥 {participantsCount}
                {event.maxParticipants ? ` / ${event.maxParticipants}` : ""}{" "}
                participants
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  event.status === "upcoming"
                    ? "border border-green-500/20 bg-green-500/10 text-green-300"
                    : "border border-slate-700 bg-slate-800 text-slate-400"
                }`}
              >
                {event.status || "Unknown"}
              </span>

              <span className="text-sm font-semibold text-blue-400 transition group-hover:translate-x-1">
                View details →
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
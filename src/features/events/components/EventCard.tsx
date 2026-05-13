import type { Event } from "@/types/event";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          {event.category}
        </span>

        <span className="text-sm text-slate-500">{formattedDate}</span>
      </div>

      <h2 className="text-xl font-semibold text-slate-950">{event.title}</h2>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
        {event.description}
      </p>

      <div className="mt-5 text-sm text-slate-500">{event.location}</div>
    </article>
  );
}
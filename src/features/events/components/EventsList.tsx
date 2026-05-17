"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { eventService } from "@/api/eventService";
import { EventCard } from "@/features/events/components/EventCard";
import type { Event, EventFilters } from "@/types/event";

export function EventsList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [filters, setFilters] = useState<EventFilters>({
    search: "",
    category: "",
    status: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await eventService.getEvents({
          search: filters.search || undefined,
          category: filters.category || undefined,
          status: filters.status || undefined,
          page,
        });

        setEvents(response.events);
        setPages(response.pages || 1);
      } catch {
        setError("Failed to load events.");
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, [filters, page]);

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));

    setPage(1);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      status: "",
    });

    setPage(1);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="container py-16">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              Explore community activities
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-white">
              Events
            </h1>

            <p className="mt-3 max-w-2xl text-slate-300">
              Discover activities, workshops, and local initiatives created by
              the ActiveUnity community.
            </p>
          </div>

          {isAuthenticated && (
            <Link
              href="/events/create"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              Create event
            </Link>
          )}
        </div>

        <div className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/10">
          <div className="grid gap-4 md:grid-cols-4">
            <input
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search events..."
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500"
            />

            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-500"
            >
              <option value="">All categories</option>
              <option value="environment">Environment</option>
              <option value="education">Education</option>
              <option value="sport">Sport</option>
              <option value="culture">Culture</option>
              <option value="volunteering">Volunteering</option>
              <option value="other">Other</option>
            </select>

            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-500"
            >
              <option value="">All statuses</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              Clear filters
            </button>
          </div>
        </div>

        {isLoading && <p className="text-slate-300">Loading events...</p>}

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {!isLoading && !error && events.length === 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-xl">
            <h2 className="text-lg font-semibold text-white">
              No events found
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Try changing your search or filters.
            </p>
          </div>
        )}

        {!isLoading && !error && events.length > 0 && (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id || event._id} event={event} />
              ))}
            </div>

            {pages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-4">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage((prevPage) => prevPage - 1)}
                  className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <div className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
                  Page {page} of {pages}
                </div>

                <button
                  type="button"
                  disabled={page >= pages}
                  onClick={() => setPage((prevPage) => prevPage + 1)}
                  className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";

import { EventCard } from "@/features/events/components/EventCard";
import type { UserProfileResponse } from "@/types/user";

interface PublicProfileContentProps {
  profile: UserProfileResponse;
}

export function PublicProfileContent({ profile }: PublicProfileContentProps) {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  const { user, createdEvents, joinedEvents } = profile;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="container py-16">
        <div className="mb-4">
          <Link
            href="/events"
            className="mt-4 inline-flex items-center rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:text-white"
          >
            ← Back to events
          </Link>
        </div>

        <div className="mb-10 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <button
              type="button"
              onClick={() => user.avatar && setIsAvatarOpen(true)}
              className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 text-3xl font-bold text-blue-300 transition hover:scale-105"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </button>

            <div>
              <p className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
                Public profile
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-white">
                {user.name}
              </h1>

              <p className="mt-3 text-slate-300">{user.email}</p>
              <p className="mt-1 text-sm capitalize text-slate-500">
                Role: {user.role}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-sm text-slate-400">Created events</p>
              <p className="mt-2 text-3xl font-bold text-white">
                {createdEvents.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-sm text-slate-400">Joined events</p>
              <p className="mt-2 text-3xl font-bold text-white">
                {joinedEvents.length}
              </p>
            </div>
          </div>
        </div>

        <section className="mb-14">
          <h2 className="mb-5 text-2xl font-bold text-white">
            Created events
          </h2>

          {createdEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {createdEvents.map((event) => (
                <EventCard key={event.id || event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
              This user has not created any events yet.
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-5 text-2xl font-bold text-white">
            Joined events
          </h2>

          {joinedEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {joinedEvents.map((event) => (
                <EventCard key={event.id || event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
              This user has not joined any events yet.
            </div>
          )}
        </section>
      </section>

      {isAvatarOpen && user.avatar && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setIsAvatarOpen(false)}
        >
          <div
            className="max-h-[90vh] max-w-4xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="max-h-[90vh] w-full object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
}
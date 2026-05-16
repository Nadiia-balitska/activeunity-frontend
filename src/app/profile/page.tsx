"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { userService } from "@/api/userService";
import { EventCard } from "@/features/events/components/EventCard";
import type { UserProfileResponse } from "@/types/user";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setError("");

        const data = await userService.getProfile();

        setProfile(data);
      } catch {
        setError("Failed to load profile.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
        <p className="text-slate-300">Loading profile...</p>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error || "Profile not found."}
        </p>
      </main>
    );
  }

  const { user, createdEvents, joinedEvents } = profile;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="container py-16">
        <div className="mb-10 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
                My profile
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-white">
                {user.name}
              </h1>

              <p className="mt-3 text-slate-300">{user.email}</p>
              <p className="mt-1 text-sm capitalize text-slate-500">
                Role: {user.role}
              </p>
            </div>

            <Link
              href="/events/create"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              Create event
            </Link>
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
            My created events
          </h2>

          {createdEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {createdEvents.map((event) => (
                <EventCard key={event.id || event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
              You have not created any events yet.
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
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
              You have not joined any events yet.
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
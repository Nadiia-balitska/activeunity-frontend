"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { userService } from "@/api/userService";
import { EventCard } from "@/features/events/components/EventCard";
import { EditProfileModal } from "@/features/profile/components/EditProfileModal";
import { ProfileSkeleton } from "@/features/profile/components/ProfileSkeleton";

import type { UserProfileResponse } from "@/types/user";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await userService.getProfile();
        setProfile(data);
      } catch {
        toast.error("Failed to load profile.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

 if (isLoading) {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <section className="container">
        <ProfileSkeleton />
      </section>
    </main>
  );
}

  if (!profile) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
        <p className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300">
          Profile not found.
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
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 text-3xl font-bold text-blue-300">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>

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
            </div>

            <div className="flex flex-wrap gap-3">
              <EditProfileModal
                initialName={user.name}
                initialAvatar={user.avatar || ""}
                onProfileUpdated={(updatedData) => {
                  setProfile((prevProfile) => {
                    if (!prevProfile) return prevProfile;

                    return {
                      ...prevProfile,
                      user: {
                        ...prevProfile.user,
                        name: updatedData.name,
                        avatar: updatedData.avatar || "",
                      },
                    };
                  });
                }}
              />

              <Link
                href="/events/create"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                Create event
              </Link>
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
            My created events
          </h2>

          {createdEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {createdEvents.map((event) => (
                <EventCard key={event.id || event._id} event={event} />
              ))}
            </div>
          ) : (
           <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">
  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
    🎉
  </div>

  <h3 className="mt-5 text-xl font-semibold text-white">
    No created events yet
  </h3>

  <p className="mt-3 text-sm text-slate-400">
    Start building your community by creating your first event.
  </p>

  <Link
    href="/events/create"
    className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
  >
    Create first event
  </Link>
</div>
          )}
        </section>

        <section>
          <h2 className="mb-5 text-2xl font-bold text-white">Joined events</h2>

          {joinedEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {joinedEvents.map((event) => (
                <EventCard key={event.id || event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">
  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-2xl">
    🚀
  </div>

  <h3 className="mt-5 text-xl font-semibold text-white">
    No joined events
  </h3>

  <p className="mt-3 text-sm text-slate-400">
    Explore community activities and join interesting events.
  </p>

  <Link
    href="/events"
    className="mt-6 inline-flex rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:text-white"
  >
    Browse events
  </Link>
</div>
          )}
        </section>
      </section>
    </main>
  );
}
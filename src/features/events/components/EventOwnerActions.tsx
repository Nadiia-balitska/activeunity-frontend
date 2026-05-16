"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { eventService } from "@/api/eventService";

interface EventOwnerActionsProps {
  eventId: string;
}

export function EventOwnerActions({ eventId }: EventOwnerActionsProps) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError("");

      await eventService.deleteEvent(eventId);

      router.push("/events");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to delete event.");
      } else {
        setError("Failed to delete event.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href={`/events/${eventId}/edit`}
          className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/20"
        >
          Edit event
        </Link>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
        >
          Delete event
        </button>

        {error && (
          <p className="w-full rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/40">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-white">Delete event?</h2>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                This action cannot be undone. The event will be permanently
                removed from ActiveUnity.
              </p>
            </div>

            {error && (
              <p className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                disabled={isDeleting}
                className="rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Delete event"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
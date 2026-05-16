"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { eventService } from "@/api/eventService";

interface EventOwnerActionsProps {
  eventId: string;
}

export function EventOwnerActions({
  eventId,
}: EventOwnerActionsProps) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);
      setError("");

      await eventService.deleteEvent(eventId);

      router.push("/events");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Failed to delete event."
        );
      } else {
        setError("Failed to delete event.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <Link
        href={`/events/${eventId}/edit`}
        className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-sm font-medium text-blue-300 transition hover:bg-blue-500/20"
      >
        Edit event
      </Link>

      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isDeleting ? "Deleting..." : "Delete event"}
      </button>

      {error && (
        <p className="w-full rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
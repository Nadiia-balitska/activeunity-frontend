"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { eventService } from "@/api/eventService";

interface EventOwnerActionsProps {
  eventId: string;
  currentStatus?: string;
  onStatusChange?: (status: string) => void;
}

export function EventOwnerActions({
  eventId,
  currentStatus = "upcoming",
  onStatusChange,
}: EventOwnerActionsProps) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isInactive =
    currentStatus === "completed" || currentStatus === "cancelled";

  const handleStatusUpdate = async (status: string) => {
    try {
      setIsUpdatingStatus(true);

      await eventService.updateEvent(eventId, { status });

      onStatusChange?.(status);

      if (status === "completed") {
        toast.success("Event marked as completed.");
      } else if (status === "cancelled") {
        toast.success("Event cancelled.");
      } else {
        toast.success("Event reopened.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to update status.");
      } else {
        toast.error("Failed to update status.");
      }
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await eventService.deleteEvent(eventId);

      toast.success("Event deleted successfully.");
      router.push("/events");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to delete event.");
      } else {
        toast.error("Failed to delete event.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
        <p className="mb-4 text-sm font-semibold text-slate-300">
          Owner actions
        </p>

        <div className="flex flex-wrap gap-4">
          {isInactive ? (
            <>
              <button
                type="button"
                onClick={() => handleStatusUpdate("upcoming")}
                disabled={isUpdatingStatus}
                className="rounded-xl border border-slate-600 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Reopen event
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
              >
                Delete event
              </button>
            </>
          ) : (
            <>
              <Link
                href={`/events/${eventId}/edit`}
                className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/20"
              >
                Edit event
              </Link>

              <button
                type="button"
                onClick={() => handleStatusUpdate("completed")}
                disabled={isUpdatingStatus}
                className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Mark as completed
              </button>

              <button
                type="button"
                onClick={() => handleStatusUpdate("cancelled")}
                disabled={isUpdatingStatus}
                className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel event
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
              >
                Delete event
              </button>
            </>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/40">
            <h2 className="text-xl font-bold text-white">Delete event?</h2>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              This action cannot be undone. The event will be permanently
              removed from ActiveUnity.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
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
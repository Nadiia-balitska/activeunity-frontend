import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CreateEventForm } from "@/features/events/components/CreateEventForm";

export default function CreateEventPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-3xl px-4 py-10">
        <Link
          href="/events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-blue-400"
        >
          <ArrowLeft size={18} />
          Back to events
        </Link>

        <div className="mb-8">
          <p className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
            Create community activity
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white">
            Create new event
          </h1>

          <p className="mt-3 text-slate-300">
            Add a new community event and invite people to join.
          </p>
        </div>

        <CreateEventForm />
      </section>
    </main>
  );
}
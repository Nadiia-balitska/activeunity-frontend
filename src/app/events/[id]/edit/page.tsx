import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { eventService } from "@/api/eventService";
import { EditEventForm } from "@/features/events/components/EditEventForm";

interface EditEventPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;

  try {
    const event = await eventService.getEventById(id);

    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="mx-auto max-w-3xl px-4 py-10">
          <Link
            href={`/events/${id}`}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-blue-400"
          >
            <ArrowLeft size={18} />
            Back to event
          </Link>

          <div className="mb-8">
            <p className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              Manage your activity
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white">
              Edit event
            </h1>

            <p className="mt-3 text-slate-300">
              Update event details, status, image, and participant limit.
            </p>
          </div>

          <EditEventForm event={event} />
        </section>
      </main>
    );
  } catch {
    notFound();
  }
}
import Link from "next/link";

export default function EventNotFound() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-slate-950">
            Event not found
          </h1>

          <p className="mt-4 text-slate-600">
            The event you are looking for does not exist or has been removed.
          </p>

          <Link
            href="/events"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Back to events
          </Link>
        </div>
      </section>
    </main>
  );
}
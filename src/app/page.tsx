import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-6 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
          Community events made simple
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-white md:text-6xl">
          Discover, create, and join meaningful local events.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          ActiveUnity helps people connect through community activities,
          workshops, meetups, and local initiatives — all in one clean and
          easy-to-use platform.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/events"
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Browse events
          </Link>

          <Link
            href="/profile"
            className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:text-white"
          >
            View profile
          </Link>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white">Find events</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Explore activities by category, location, and date.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white">
              Join communities
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Connect with people who share your interests and goals.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white">
              Manage participation
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Keep track of joined events and your own created activities.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
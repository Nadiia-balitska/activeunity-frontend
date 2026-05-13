import { HomeHeroActions } from "@/features/home/components/HomeHeroActions";

export default function Home() {
  return (
    <main className="bg-white">
      <section className="container py-24">
        <div className="max-w-3xl">
          <span className="mb-5 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Community events made simple
          </span>

          <h1 className="text-5xl font-semibold tracking-tight text-slate-950">
            Discover, create, and join meaningful local events.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            ActiveUnity helps people connect through community activities,
            workshops, meetups, and local initiatives — all in one clean and
            easy-to-use platform.
          </p>

          <HomeHeroActions />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="container grid gap-6 py-16 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Find events
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Explore activities by category, location, and date.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Join communities
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Connect with people who share your interests and goals.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Manage participation
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Keep track of joined events and your own created activities.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
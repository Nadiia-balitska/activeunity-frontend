export function ProfileSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-10 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-black/20">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div className="h-24 w-24 rounded-3xl bg-slate-800" />

            <div className="space-y-4">
              <div className="h-8 w-40 rounded bg-slate-800" />
              <div className="h-5 w-56 rounded bg-slate-800" />
              <div className="h-4 w-24 rounded bg-slate-800" />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="h-12 w-32 rounded-xl bg-slate-800" />
            <div className="h-12 w-36 rounded-xl bg-slate-800" />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <div className="h-4 w-28 rounded bg-slate-800" />
            <div className="mt-4 h-10 w-16 rounded bg-slate-800" />
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <div className="h-4 w-28 rounded bg-slate-800" />
            <div className="mt-4 h-10 w-16 rounded bg-slate-800" />
          </div>
        </div>
      </div>

      <div className="space-y-10">
        <div>
          <div className="mb-5 h-8 w-56 rounded bg-slate-800" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-80 rounded-3xl border border-slate-800 bg-slate-900"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
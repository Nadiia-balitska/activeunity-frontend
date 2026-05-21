export function EventCardSkeleton() {
  return (
    <div className="h-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/10">
      <div className="h-56 animate-pulse bg-slate-800" />

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="h-7 w-24 animate-pulse rounded-full bg-slate-800" />
          <div className="h-7 w-32 animate-pulse rounded-full bg-slate-800" />
        </div>

        <div className="h-7 w-3/4 animate-pulse rounded-lg bg-slate-800" />

        <div className="mt-4 space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-slate-800" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-slate-800" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-slate-800" />
        </div>

        <div className="mt-8 space-y-3">
          <div className="h-4 w-1/2 animate-pulse rounded bg-slate-800" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-slate-800" />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="h-7 w-24 animate-pulse rounded-full bg-slate-800" />
          <div className="h-5 w-28 animate-pulse rounded bg-slate-800" />
        </div>
      </div>
    </div>
  );
}
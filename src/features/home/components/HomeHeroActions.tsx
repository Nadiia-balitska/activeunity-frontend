"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export function HomeHeroActions() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="mt-10 mb-10 flex flex-wrap gap-4">
      <Link
        href="/events"
        className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
      >
        Browse events
      </Link>

      {isAuthenticated ? (
        <Link
          href="/profile"
          className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:text-white"
        >
          View profile
        </Link>
      ) : (
        <Link
          href="/register"
          className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:text-white"
        >
          Create account
        </Link>
      )}
    </div>
  );
}

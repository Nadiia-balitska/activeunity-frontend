"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export function HomeHeroActions() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="mt-10 mb-10 flex flex-wrap gap-4">
      <Link
        href="/events"
        className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        Browse events
      </Link>

      {isAuthenticated ? (
        <Link
          href="/profile"
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
        >
          View profile
        </Link>
      ) : (
        <Link
          href="/register"
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
        >
          Create account
        </Link>
      )}
    </div>
  );
}
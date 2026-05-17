"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/authStore";

export function Navbar() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <nav className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-white transition hover:text-blue-400"
        >
          ActiveUnity
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/events"
            className="text-sm font-medium text-slate-300 transition hover:text-blue-400"
          >
            Events
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link
  href="/profile"
  className="text-sm font-medium text-slate-300 transition hover:text-blue-400"
>
  {user?.name}
</Link>

             <button
  onClick={() => {
    logout();
    router.push("/");
    router.refresh();
  }}
   className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-400"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-300 transition hover:text-blue-400"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { useAuthStore } from "@/store/authStore";

import { NotificationDropdown } from "@/components/NotificationDropdown";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <nav className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={closeMenu}
          className="text-2xl font-bold tracking-tight text-white transition hover:text-blue-400"
        >
          ActiveUnity
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-slate-300 transition hover:text-blue-400"
          >
            Home
          </Link>

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
              
              <NotificationDropdown />

              <button
                type="button"
                onClick={handleLogout}
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

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="inline-flex rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-200 transition hover:border-blue-500 hover:text-white md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-4 py-4 md:hidden">
          <div className="container flex flex-col gap-3">
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-blue-400"
            >
              Home
            </Link>

            <Link
              href="/events"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-blue-400"
            >
              Events
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-blue-400"
                >
                  {user?.name || "Profile"}
                </Link>
                
                <NotificationDropdown />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-left text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-blue-400"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
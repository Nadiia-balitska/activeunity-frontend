"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useAuthStore } from "@/store/authStore";
import type { LoginData } from "@/types/auth";

export function LoginForm() {
  const router = useRouter();

  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      await login(data);

      toast.success("Signed in successfully.");

      router.push("/");
    } catch {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-50 px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Sign in to continue using ActiveUnity.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              placeholder="Enter your email"
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              placeholder="Enter your password"
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
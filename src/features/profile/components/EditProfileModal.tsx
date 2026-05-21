"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { userService } from "@/api/userService";
import { useAuthStore } from "@/store/authStore";

interface EditProfileModalProps {
  initialName: string;
  initialAvatar?: string;
  onProfileUpdated?: (data: { name: string; avatar?: string }) => void;
}

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function EditProfileModal({
  initialName,
  initialAvatar = "",
  onProfileUpdated,
}: EditProfileModalProps) {
  const { user, setUser } = useAuthStore();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(initialName);
  const [avatar, setAvatar] = useState(initialAvatar);

  const [isLoading, setIsLoading] = useState(false);

  const inputClassName =
    "mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60";

  const handleClose = () => {
    if (isLoading) return;

    setIsOpen(false);
    setName(initialName);
    setAvatar(initialAvatar);
  };

  const handleSave = async () => {
    if (name.trim().length < 2) {
      toast.error("Name must be at least 2 characters.");
      return;
    }

    if (avatar && !isValidUrl(avatar)) {
      toast.error("Avatar must be a valid URL.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await userService.updateProfile({
        name,
        avatar,
      });

      setUser({
        ...user!,
        name: response.user.name,
        avatar: response.user.avatar,
      });

      onProfileUpdated?.({
        name: response.user.name,
        avatar: response.user.avatar,
      });

      toast.success("Profile updated successfully.");
      setIsOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to update profile.");
      } else {
        toast.error("Failed to update profile.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/20"
      >
        Edit profile
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg scale-100 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/40">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">Edit profile</h2>
              <p className="mt-2 text-sm text-slate-400">
                Update your display name and avatar.
              </p>
            </div>

            <div className="grid gap-5">
              <div>
                <label className="text-sm font-medium text-slate-300">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  disabled={isLoading}
                  className={inputClassName}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-300">
                  Avatar URL
                </label>
                <input
                  value={avatar}
                  onChange={(event) => setAvatar(event.target.value)}
                  disabled={isLoading}
                  className={inputClassName}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              {avatar && isValidUrl(avatar) && (
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                  <img
                    src={avatar}
                    alt="Avatar preview"
                    className="h-56 w-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={isLoading}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
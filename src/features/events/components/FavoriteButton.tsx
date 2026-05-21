"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { userService } from "@/api/userService";
import { useAuthStore } from "@/store/authStore";

interface FavoriteButtonProps {
  eventId: string;
  isFavorite?: boolean;
  onFavoriteChange?: (eventId: string, isFavorite: boolean) => void;
}

export function FavoriteButton({
  eventId,
  isFavorite = false,
  onFavoriteChange,
}: FavoriteButtonProps) {
  const { user, isAuthenticated, setUser } = useAuthStore();

  const [favorite, setFavorite] = useState(isFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleFavorite = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isAuthenticated || !user) {
      toast.error("Please log in to save events.");
      return;
    }

    try {
      setIsLoading(true);

      if (favorite) {
        const response = await userService.removeFavoriteEvent(eventId);

        setFavorite(false);
        onFavoriteChange?.(eventId, false);

setUser({
  ...user,
  favoriteEvents: response.favoriteEvents,
});

        toast.success("Removed from favorites.");
      } else {
        const response = await userService.addFavoriteEvent(eventId);

        setFavorite(true);
        onFavoriteChange?.(eventId, true);

        setUser({
          ...user,
          favoriteEvents: response.favoriteEvents,
        });

        toast.success("Added to favorites.");
      }
    } catch {
      toast.error("Failed to update favorites.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`absolute right-4 top-4 z-10 rounded-full border p-2 backdrop-blur transition disabled:cursor-not-allowed disabled:opacity-60 ${
        favorite
          ? "border-red-500/30 bg-red-500/20 text-red-300"
          : "border-slate-700 bg-slate-950/70 text-slate-300 hover:border-red-500/40 hover:text-red-300"
      }`}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart size={18} fill={favorite ? "currentColor" : "none"} />
    </button>
  );
}
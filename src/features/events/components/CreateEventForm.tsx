"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { eventService } from "@/api/eventService";
import type { CreateEventData } from "@/types/event";

export function CreateEventForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<CreateEventData>({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    image: "",
    maxParticipants: 10,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const inputClassName =
    "mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60";

  const labelClassName = "text-sm font-medium text-slate-300";

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "maxParticipants" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      setError("");

      const createdEvent = await eventService.createEvent(formData);

      router.push(`/events/${createdEvent.id || createdEvent._id}`);
    } catch {
      setError("Failed to create event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-black/20"
    >
      {error && (
        <p className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="grid gap-5">
        <div>
          <label className={labelClassName}>Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            disabled={isLoading}
            className={inputClassName}
            placeholder="Community meetup"
          />
        </div>

        <div>
          <label className={labelClassName}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            disabled={isLoading}
            className={inputClassName}
            placeholder="Describe your event..."
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClassName}>Date and time</label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              disabled={isLoading}
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              disabled={isLoading}
              className={inputClassName}
              placeholder="Write the event location or address"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClassName}>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              disabled={isLoading}
              className={inputClassName}
            >
              <option value="">Select category</option>
              <option value="environment">Environment</option>
              <option value="education">Education</option>
              <option value="sport">Sport</option>
              <option value="culture">Culture</option>
              <option value="volunteering">Volunteering</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className={labelClassName}>Max participants</label>
            <input
              type="number"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              min={1}
              required
              disabled={isLoading}
              className={inputClassName}
            />
          </div>
        </div>

        <div>
          <label className={labelClassName}>Image URL</label>

          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            disabled={isLoading}
            className={inputClassName}
            placeholder="https://example.com/image.jpg"
          />

          <p className="mt-2 text-xs text-slate-500">
            Paste a public image URL for your event cover.
          </p>
        </div>

        {formData.image && (
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
            <img
              src={formData.image}
              alt="Event preview"
              className="h-64 w-full object-cover"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-8 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Creating event..." : "Create event"}
      </button>
    </form>
  );
}
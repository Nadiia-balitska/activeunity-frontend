"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { eventService } from "@/api/eventService";
import type { Event, UpdateEventData } from "@/types/event";

interface EditEventFormProps {
  event: Event;
}

type FormErrors = Partial<Record<keyof UpdateEventData, string>>;

function formatDateForInput(date: string) {
  return new Date(date).toISOString().slice(0, 16);
}

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function EditEventForm({ event }: EditEventFormProps) {
  const router = useRouter();

  const eventId = event.id || event._id || "";

  const [formData, setFormData] = useState<UpdateEventData>({
    title: event.title,
    description: event.description,
    date: formatDateForInput(event.date),
    location: event.location,
    category: event.category,
    image: event.image || "",
    maxParticipants: event.maxParticipants || 10,
    status: event.status || "upcoming",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const inputClassName =
    "mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60";

  const selectClassName =
    "mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60";

  const labelClassName = "text-sm font-medium text-slate-300";
  const errorClassName = "mt-2 text-xs text-red-300";

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.title || formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters.";
    }

    if (!formData.description || formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }

    if (!formData.date) {
      newErrors.date = "Date and time are required.";
    }

    if (!formData.location || formData.location.trim().length < 2) {
      newErrors.location = "Location is required.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    if (!formData.maxParticipants || formData.maxParticipants < 1) {
      newErrors.maxParticipants = "Max participants must be at least 1.";
    }

    if (formData.image && !isValidUrl(formData.image)) {
      newErrors.image = "Image must be a valid URL.";
    }

    if (!formData.status) {
      newErrors.status = "Please select a status.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

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

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!eventId) {
      setSubmitError("Event id is missing.");
      return;
    }

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setSubmitError("");

      const updatedEvent = await eventService.updateEvent(eventId, formData);

      router.push(`/events/${updatedEvent.id || updatedEvent._id}`);
    } catch {
      setSubmitError("Failed to update event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-black/20"
    >
      {submitError && (
        <p className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {submitError}
        </p>
      )}

      <div className="grid gap-5">
        <div>
          <label className={labelClassName}>Title</label>
          <input
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            disabled={isLoading}
            className={inputClassName}
            placeholder="Community meetup"
          />
          {errors.title && <p className={errorClassName}>{errors.title}</p>}
        </div>

        <div>
          <label className={labelClassName}>Description</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            rows={5}
            disabled={isLoading}
            className={inputClassName}
            placeholder="Describe your event..."
          />
          {errors.description && (
            <p className={errorClassName}>{errors.description}</p>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClassName}>Date and time</label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date || ""}
              onChange={handleChange}
              disabled={isLoading}
              className={inputClassName}
            />
            {errors.date && <p className={errorClassName}>{errors.date}</p>}
          </div>

          <div>
            <label className={labelClassName}>Location</label>
            <input
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              disabled={isLoading}
              className={inputClassName}
              placeholder="Write the event location or address"
            />
            {errors.location && (
              <p className={errorClassName}>{errors.location}</p>
            )}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClassName}>Category</label>
            <select
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              disabled={isLoading}
              className={selectClassName}
            >
              <option value="">Select category</option>
              <option value="environment">Environment</option>
              <option value="education">Education</option>
              <option value="sport">Sport</option>
              <option value="culture">Culture</option>
              <option value="volunteering">Volunteering</option>
              <option value="other">Other</option>
            </select>
            {errors.category && (
              <p className={errorClassName}>{errors.category}</p>
            )}
          </div>

          <div>
            <label className={labelClassName}>Status</label>
            <select
              name="status"
              value={formData.status || "upcoming"}
              onChange={handleChange}
              disabled={isLoading}
              className={selectClassName}
            >
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {errors.status && <p className={errorClassName}>{errors.status}</p>}
          </div>
        </div>

        <div>
          <label className={labelClassName}>Max participants</label>
          <input
            type="number"
            name="maxParticipants"
            value={formData.maxParticipants || 1}
            onChange={handleChange}
            min={1}
            disabled={isLoading}
            className={inputClassName}
          />
          {errors.maxParticipants && (
            <p className={errorClassName}>{errors.maxParticipants}</p>
          )}
        </div>

        <div>
          <label className={labelClassName}>Image URL</label>

          <input
            type="url"
            name="image"
            value={formData.image || ""}
            onChange={handleChange}
            disabled={isLoading}
            className={inputClassName}
            placeholder="https://example.com/image.jpg"
          />

          <p className="mt-2 text-xs text-slate-500">
            Paste a public image URL for your event cover.
          </p>

          {errors.image && <p className={errorClassName}>{errors.image}</p>}
        </div>

        {formData.image && !errors.image && (
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
        {isLoading ? "Saving changes..." : "Save changes"}
      </button>
    </form>
  );
}
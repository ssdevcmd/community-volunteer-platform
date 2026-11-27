"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

const categoryOptions = [
  "Environment",
  "Healthcare",
  "Education",
  "Social Welfare",
  "Community Development",
  "Animal Welfare",
];

export default function EventForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    maxVolunteers: "20",
    requiredSkills: "",
    registrationDeadline: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiRequest("/api/events", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          maxVolunteers: Number(formData.maxVolunteers),
          requiredSkills: formData.requiredSkills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
          status: "PUBLISHED",
        }),
      });

      router.push("/dashboard/organizer/events");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create event.",
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100";

  const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Event title */}
      <div>
        <label htmlFor="title" className={labelClass}>
          Event Title *
        </label>

        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter your event title"
          className={inputClass}
          required
          maxLength={120}
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className={labelClass}>
          Event Description *
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your event, its purpose, and activities..."
          rows={5}
          maxLength={3000}
          className={inputClass}
          required
        />
      </div>

      {/* Category and Location */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className={labelClass}>
            Category *
          </label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option value="">Select category</option>

            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="location" className={labelClass}>
            Event Location *
          </label>

          <input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter event location"
            className={inputClass}
            required
          />
        </div>
      </div>

      {/* Dates */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className={labelClass}>
            Event Date *
          </label>

          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={inputClass}
            min={new Date().toISOString().slice(0, 16)}
            required
          />
        </div>

        <div>
          <label htmlFor="registrationDeadline" className={labelClass}>
            Registration Deadline *
          </label>

          <input
            type="datetime-local"
            id="registrationDeadline"
            name="registrationDeadline"
            value={formData.registrationDeadline}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
      </div>

      {/* Capacity */}
      <div>
        <label htmlFor="maxVolunteers" className={labelClass}>
          Maximum Volunteers *
        </label>

        <input
          type="number"
          id="maxVolunteers"
          name="maxVolunteers"
          value={formData.maxVolunteers}
          onChange={handleChange}
          min="1"
          max="10000"
          className={inputClass}
          required
        />
      </div>

      {/* Skills */}
      <div>
        <label htmlFor="requiredSkills" className={labelClass}>
          Required Skills
        </label>

        <input
          id="requiredSkills"
          name="requiredSkills"
          value={formData.requiredSkills}
          onChange={handleChange}
          placeholder="Communication, First Aid, Teamwork"
          className={inputClass}
        />

        <p className="mt-2 text-xs text-gray-500">
          Separate multiple skills with commas.
        </p>
      </div>

      {/* Submit */}
      <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating Event..." : "Publish Event"}
        </button>
      </div>
    </form>
  );
}

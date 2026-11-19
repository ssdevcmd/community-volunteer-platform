
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, X } from "lucide-react";
import { apiRequest } from "@/lib/api";

const categories = [
  "Environment",
  "Education",
  "Healthcare",
  "Community",
  "Animal Welfare",
  "Other",
];

export default function CreateEventPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [skill, setSkill] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    maxVolunteers: "20",
    requiredSkills: [] as string[],
    registrationDeadline: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addSkill = () => {
    const value = skill.trim();

    if (
      value &&
      !form.requiredSkills.some(
        (item) => item.toLowerCase() === value.toLowerCase()
      )
    ) {
      setForm({
        ...form,
        requiredSkills: [...form.requiredSkills, value],
      });
    }

    setSkill("");
  };

  const removeSkill = (value: string) => {
    setForm({
      ...form,
      requiredSkills: form.requiredSkills.filter(
        (item) => item !== value
      ),
    });
  };

  const handleSubmit = async (
    status: "DRAFT" | "PUBLISHED"
  ) => {
    setError("");

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.date ||
      !form.location.trim() ||
      !form.category ||
      !form.registrationDeadline
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (new Date(form.registrationDeadline) >= new Date(form.date)) {
      setError("Registration deadline must be before the event date.");
      return;
    }

    try {
      setLoading(true);

      await apiRequest("/api/events", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          maxVolunteers: Number(form.maxVolunteers),
          status,
        }),
      });

      router.push("/dashboard/organizer/manage-events");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create event."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/dashboard/organizer"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Event
          </h1>
          <p className="mt-2 text-gray-500">
            Share a new opportunity with your community.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
        >
          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Event Title *
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Community Tree Plantation"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="Describe your event..."
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Maximum Volunteers *
              </label>
              <input
                type="number"
                name="maxVolunteers"
                min="1"
                value={form.maxVolunteers}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Event Date *
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Registration Deadline *
              </label>
              <input
                type="date"
                name="registrationDeadline"
                value={form.registrationDeadline}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Location *
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Narayanganj, Bangladesh"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Required Skills
            </label>

            <div className="flex gap-2">
              <input
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="e.g. Communication"
                className="min-w-0 flex-1 rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500"
              />

              <button
                type="button"
                onClick={addSkill}
                className="rounded-lg bg-emerald-600 px-4 text-white hover:bg-emerald-700"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {form.requiredSkills.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm text-emerald-700"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeSkill(item)}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSubmit("DRAFT")}
              className="rounded-lg border border-gray-200 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Save as Draft
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleSubmit("PUBLISHED")}
              className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Publish Event"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

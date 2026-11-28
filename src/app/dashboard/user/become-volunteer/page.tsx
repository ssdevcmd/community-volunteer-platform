"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import type { VolunteerApplication } from "@/types/volunteer-application";
import {
  HeartHandshake,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

interface ApplicationResponse {
  success: boolean;
  application: VolunteerApplication | null;
}

export default function BecomeVolunteerPage() {
  const [application, setApplication] =
    useState<VolunteerApplication | null>(null);

  const [phone, setPhone] = useState("");
  const [motivation, setMotivation] = useState("");
  const [skills, setSkills] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadApplication() {
    try {
      const result = await apiRequest<ApplicationResponse>(
        "/api/volunteer-applications/my-application"
      );

      setApplication(result.application);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load your application."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadApplication();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!phone.trim() || !motivation.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    const skillsArray = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    setSubmitting(true);

    try {
      const result = await apiRequest<ApplicationResponse>(
        "/api/volunteer-applications",
        {
          method: "POST",
          body: JSON.stringify({
            phone,
            motivation,
            skills: skillsArray,
          }),
        }
      );

      setApplication(result.application);
      setMessage("Your volunteer application was submitted successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit your application."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading your application...
      </div>
    );
  }

  if (application) {
    const statusConfig = {
      PENDING: {
        label: "Pending Review",
        icon: Clock3,
        color: "text-amber-700 bg-amber-50",
        description:
          "Your application has been submitted. Please wait for the organizer to review it.",
      },
      APPROVED: {
        label: "Approved",
        icon: CheckCircle2,
        color: "text-green-700 bg-green-50",
        description:
          "Congratulations! Your volunteer application has been approved. Sign out and sign in again to refresh your account role.",
      },
      REJECTED: {
        label: "Rejected",
        icon: XCircle,
        color: "text-red-700 bg-red-50",
        description:
          "Your previous application was rejected. You can submit a new application.",
      },
    };

    const config = statusConfig[application.status];
    const StatusIcon = config.icon;

    if (application.status !== "REJECTED") {
      return (
        <div className="mx-auto max-w-3xl p-6 sm:p-10">
          <div className="rounded-2xl border border-gray-200 bg-white p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-green-50 p-3 text-green-700">
                <HeartHandshake size={26} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Volunteer Application
                </h1>
                <p className="text-sm text-gray-500">
                  Your application information
                </p>
              </div>
            </div>

            <div
              className={`mb-5 flex items-center gap-2 rounded-xl p-4 ${config.color}`}
            >
              <StatusIcon size={21} />
              <span className="font-semibold">{config.label}</span>
            </div>

            <p className="mb-6 text-sm leading-7 text-gray-600">
              {config.description}
            </p>

            <div className="space-y-3 text-sm text-gray-700">
              <p><strong>Phone:</strong> {application.phone}</p>
              <p><strong>Motivation:</strong> {application.motivation}</p>
              <p>
                <strong>Skills:</strong>{" "}
                {application.skills.join(", ") || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-6 sm:p-10">
      <div className="mb-8">
        <div className="mb-4 inline-flex rounded-xl bg-green-50 p-3 text-green-700">
          <HeartHandshake size={28} />
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          Become a Volunteer
        </h1>

        <p className="mt-2 leading-7 text-gray-500">
          Share a little about yourself and why you want to contribute
          to our community.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Phone number *
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="01XXXXXXXXX"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Why do you want to become a volunteer? *
          </label>
          <textarea
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            rows={5}
            required
            maxLength={1000}
            placeholder="Tell us why you want to help your community..."
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Your skills
          </label>
          <input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="First aid, teaching, communication..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
          <p className="mt-1 text-xs text-gray-400">
            Separate skills with commas.
          </p>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {message && (
          <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}

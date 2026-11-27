
"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  MapPin,
  Clock,
  XCircle,
} from "lucide-react";
import { apiRequest } from "@/lib/api";

interface Registration {
  _id: string;
  eventId: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  registeredAt: string;
  event: {
    _id: string;
    title: string;
    date: string;
    location: string;
    category: string;
  } | null;
}

interface RegistrationsResponse {
  success: boolean;
  registrations: Registration[];
}

export default function MyRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const fetchRegistrations = async () => {
    try {
      setError("");

      const data = await apiRequest<RegistrationsResponse>(
        "/api/registrations/my-registrations"
      );

      setRegistrations(data.registrations);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load registrations."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleCancel = async (registrationId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this registration?"
    );

    if (!confirmed) return;

    try {
      setCancellingId(registrationId);
      setMessage("");
      setError("");

      await apiRequest(
        `/api/registrations/${registrationId}/cancel`,
        {
          method: "PATCH",
        }
      );

      setRegistrations((previous) =>
        previous.map((registration) =>
          registration._id === registrationId
            ? { ...registration, status: "CANCELLED" }
            : registration
        )
      );

      setMessage("Registration cancelled successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to cancel registration."
      );
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return <p className="p-8 text-gray-500">Loading registrations...</p>;
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          My Registrations
        </h1>
        <p className="mt-1 text-gray-500">
          Track and manage your volunteer event registrations.
        </p>
      </div>

      {message && (
        <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
          {message}
        </p>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {registrations.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
          <CalendarDays className="mx-auto mb-3 text-gray-400" size={36} />
          <h2 className="font-semibold text-gray-800">
            No registrations yet
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Browse events and register as a volunteer.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {registrations.map((registration) => (
            <article
              key={registration._id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  {registration.event?.title ?? "Event unavailable"}
                </h2>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                  {registration.status}
                </span>
              </div>

              {registration.event && (
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    {new Date(
                      registration.event.date
                    ).toLocaleDateString("en-BD")}
                  </p>

                  <p className="flex items-center gap-2">
                    <MapPin size={16} />
                    {registration.event.location}
                  </p>

                  <p className="flex items-center gap-2">
                    <Clock size={16} />
                    Registered on{" "}
                    {new Date(
                      registration.registeredAt
                    ).toLocaleDateString("en-BD")}
                  </p>
                </div>
              )}

              {(registration.status === "PENDING" ||
                registration.status === "CONFIRMED") && (
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <button
                    type="button"
                    onClick={() => handleCancel(registration._id)}
                    disabled={cancellingId === registration._id}
                    className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <XCircle size={16} />
                    {cancellingId === registration._id
                      ? "Cancelling..."
                      : "Cancel Registration"}
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
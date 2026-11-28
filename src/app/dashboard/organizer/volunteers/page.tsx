
"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  MapPin,
  CheckCircle,
  XCircle,
  Users,
} from "lucide-react";
import { apiRequest } from "@/lib/api";

interface Registration {
  _id: string;
  volunteerId: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "REJECTED";
  registeredAt: string;
  event: {
    _id: string;
    title: string;
    date: string;
    location: string;
  } | null;
}

interface VolunteersResponse {
  success: boolean;
  registrations: Registration[];
}

export default function OrganizerVolunteersPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchVolunteers = async () => {
    try {
      setError("");

      const data = await apiRequest<VolunteersResponse>(
        "/api/organizer/volunteers"
      );

      setRegistrations(data.registrations);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load volunteers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const updateStatus = async (
    registrationId: string,
    status: "CONFIRMED" | "REJECTED"
  ) => {
    const action = status === "CONFIRMED" ? "approve" : "reject";

    if (!window.confirm(`Are you sure you want to ${action} this volunteer?`)) {
      return;
    }

    try {
      setUpdatingId(registrationId);
      setError("");

      await apiRequest(
        `/api/organizer/volunteers/${registrationId}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status }),
        }
      );

      setRegistrations((previous) =>
        previous.map((registration) =>
          registration._id === registrationId
            ? { ...registration, status }
            : registration
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update registration."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const pending = registrations.filter(
    (item) => item.status === "PENDING"
  ).length;

  const confirmed = registrations.filter(
    (item) => item.status === "CONFIRMED"
  ).length;

  if (loading) {
    return <p className="p-8 text-gray-500">Loading volunteers...</p>;
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Volunteer Management
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage volunteers registered for your events.
        </p>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Total Registrations" value={registrations.length} />
        <StatCard title="Pending" value={pending} />
        <StatCard title="Confirmed" value={confirmed} />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 p-5">
          <h2 className="font-semibold text-gray-900">
            Volunteer Registrations
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Review and manage your event registrations.
          </p>
        </div>

        {registrations.length === 0 ? (
          <div className="p-10 text-center">
            <Users className="mx-auto mb-3 text-gray-400" size={36} />
            <p className="font-medium text-gray-800">
              No volunteer registrations yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {registrations.map((registration) => (
              <article key={registration._id} className="space-y-4 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {registration.event?.title ?? "Event unavailable"}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      Volunteer ID: {registration.volunteerId}
                    </p>
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold">
                    {registration.status}
                  </span>
                </div>

                {registration.event && (
                  <div className="space-y-2 text-sm text-gray-500">
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
                  </div>
                )}

                {registration.status === "PENDING" && (
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() =>
                        updateStatus(registration._id, "CONFIRMED")
                      }
                      disabled={updatingId === registration._id}
                      className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                    >
                      <CheckCircle size={16} />
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(registration._id, "REJECTED")
                      }
                      disabled={updatingId === registration._id}
                      className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
                    >
                      <XCircle size={16} />
                      Reject
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

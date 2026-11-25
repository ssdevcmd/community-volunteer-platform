
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  RefreshCw,
  UserCheck,
  XCircle,
} from "lucide-react";
import { apiRequest } from "@/lib/api";
import type { VolunteerApplication } from "@/types/volunteer-application";

interface ApplicationsResponse {
  success: boolean;
  applications: VolunteerApplication[];
}

export default function VolunteerApplicationsPage() {
  const [applications, setApplications] = useState<
    VolunteerApplication[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchApplications = useCallback(async () => {
    setError("");

    try {
      const result = await apiRequest<ApplicationsResponse>(
        "/api/organizer/volunteer-applications"
      );

      setApplications(result.applications);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load volunteer applications."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  async function updateApplication(
    id: string,
    status: "APPROVED" | "REJECTED"
  ) {
    const action = status === "APPROVED" ? "approve" : "reject";

    if (!window.confirm(`Are you sure you want to ${action} this application?`)) {
      return;
    }

    setUpdatingId(id);
    setError("");
    setMessage("");

    try {
      await apiRequest(
        `/api/organizer/volunteer-applications/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ status }),
        }
      );

      setMessage(
        status === "APPROVED"
          ? "Volunteer application approved successfully."
          : "Volunteer application rejected."
      );

      await fetchApplications();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update application."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  const pendingCount = applications.filter(
    (item) => item.status === "PENDING"
  ).length;

  const approvedCount = applications.filter(
    (item) => item.status === "APPROVED"
  ).length;

  const rejectedCount = applications.filter(
    (item) => item.status === "REJECTED"
  ).length;

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading volunteer applications...
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-sm font-medium text-green-700">
            ORGANIZER DASHBOARD
          </p>
          <h1 className="text-3xl font-bold text-gray-900">
            Volunteer Applications
          </h1>
          <p className="mt-2 text-gray-500">
            Review applications and approve new community volunteers.
          </p>
        </div>

        <button
          onClick={fetchApplications}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Pending"
          value={pendingCount}
          icon={<Clock3 size={21} />}
          color="text-amber-700 bg-amber-50"
        />
        <StatCard
          title="Approved"
          value={approvedCount}
          icon={<CheckCircle2 size={21} />}
          color="text-green-700 bg-green-50"
        />
        <StatCard
          title="Rejected"
          value={rejectedCount}
          icon={<XCircle size={21} />}
          color="text-red-700 bg-red-50"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      {message && (
        <p className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
          {message}
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="font-semibold text-gray-900">
            All Applications
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {applications.length} application(s) found
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="p-12 text-center">
            <UserCheck className="mx-auto mb-3 text-gray-300" size={36} />
            <p className="font-medium text-gray-700">
              No volunteer applications yet
            </p>
            <p className="mt-1 text-sm text-gray-500">
              New applications will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {applications.map((application) => (
              <article key={application._id} className="p-6">
                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {application.name}
                      </h3>

                      <StatusBadge status={application.status} />
                    </div>

                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                      <p>{application.email}</p>
                      <p>Phone: {application.phone}</p>
                      <p>
                        Applied:{" "}
                        {new Date(application.submittedAt).toLocaleDateString(
                          "en-BD",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-semibold text-gray-700">
                        Motivation
                      </p>
                      <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                        {application.motivation}
                      </p>
                    </div>

                    {application.skills.length > 0 && (
                      <div className="mt-4">
                        <p className="mb-2 text-sm font-semibold text-gray-700">
                          Skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {application.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {application.status === "PENDING" && (
                    <div className="flex shrink-0 flex-row gap-2 lg:flex-col">
                      <button
                        onClick={() =>
                          updateApplication(application._id, "APPROVED")
                        }
                        disabled={updatingId === application._id}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                      >
                        <CheckCircle2 size={16} />
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateApplication(application._id, "REJECTED")
                        }
                        disabled={updatingId === application._id}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
                      >
                        <XCircle size={16} />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className={`rounded-lg p-2 ${color}`}>{icon}</div>
      </div>
      <p className="mt-4 text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: VolunteerApplication["status"];
}) {
  const styles = {
    PENDING: "bg-amber-50 text-amber-700",
    APPROVED: "bg-green-50 text-green-700",
    REJECTED: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

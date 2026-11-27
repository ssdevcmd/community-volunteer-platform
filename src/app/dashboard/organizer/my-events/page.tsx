"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, Plus, Trash2 } from "lucide-react";
import { apiRequest } from "@/lib/api";
import type { Event, EventsResponse } from "@/types/event";

export default function ManageEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const data = await apiRequest<EventsResponse>(
        "/api/events/my-events"
      );

      setEvents(data.events);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load events."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const updateStatus = async (
    id: string,
    status: Event["status"]
  ) => {
    try {
      await apiRequest(`/api/events/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      await fetchEvents();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Update failed.");
    }
  };

  const deleteEvent = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      await apiRequest(`/api/events/${id}`, {
        method: "DELETE",
      });

      setEvents((previous) =>
        previous.filter((event) => event._id !== id)
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed.");
    }
  };

  const statusStyle: Record<Event["status"], string> = {
    PUBLISHED: "bg-emerald-50 text-emerald-700",
    DRAFT: "bg-amber-50 text-amber-700",
    CLOSED: "bg-gray-100 text-gray-600",
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Events
            </h1>
            <p className="mt-2 text-gray-500">
              Manage the events created by you.
            </p>
          </div>

          <Link
            href="/dashboard/organizer/create-event"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            <Plus size={18} />
            Create Event
          </Link>
        </div>

        {loading ? (
          <p className="py-16 text-center text-gray-500">
            Loading events...
          </p>
        ) : error ? (
          <p className="rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </p>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
            <CalendarDays className="mx-auto text-gray-400" size={36} />
            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              No events yet
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Create your first community event.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="divide-y divide-gray-100">
              {events.map((event) => (
                <article
                  key={event._id}
                  className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {event.title}
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[event.status]}`}
                      >
                        {event.status}
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                      {event.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={16} />
                        {new Date(event.date).toLocaleDateString()}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <MapPin size={16} />
                        {event.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      aria-label={`Change status for ${event.title}`}
                      value={event.status}
                      onChange={(e) =>
                        updateStatus(
                          event._id,
                          e.target.value as Event["status"]
                        )
                      }
                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
                    >
                      <option value="DRAFT">Draft</option>
                      <option value="PUBLISHED">Published</option>
                      <option value="CLOSED">Closed</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => deleteEvent(event._id)}
                      aria-label={`Delete ${event.title}`}
                      className="rounded-lg border border-red-100 p-2.5 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

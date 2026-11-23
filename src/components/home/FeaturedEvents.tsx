"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import EventCard from "@/components/events/EventCard";
import { apiRequest } from "@/lib/api";
import type { Event } from "@/types/event";

interface EventsResponse {
  events: Event[];
}

export default function FeaturedEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await apiRequest<EventsResponse>("/api/events");

        setEvents(data.events.slice(0, 3));
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load featured events."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <section id="featured-events" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
              Find your opportunity
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Events that make a difference
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-gray-600">
              Discover opportunities to give back, learn new skills, and
              connect with your community.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 font-semibold text-emerald-700 hover:text-emerald-900"
          >
            Explore all events
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-96 animate-pulse rounded-xl bg-gray-100"
                />
              ))}
            </div>
          ) : error ? (
            <p className="rounded-xl bg-red-50 p-6 text-center text-sm text-red-600">
              {error}
            </p>
          ) : events.length === 0 ? (
            <p className="rounded-xl bg-gray-50 p-8 text-center text-gray-500">
              No published events available right now.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

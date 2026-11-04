"use client";

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import EventCard from "@/components/events/EventCard";
import { apiRequest } from "@/lib/api";
import type { Event } from "@/types/event";

type EventsResponse = {
  events: Event[];
};

const categories = [
  "All",
  "Environment",
  "Healthcare",
  "Education",
  "Social Welfare",
  "Community Development",
  "Animal Welfare",
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        setError("");

        const data = await apiRequest<EventsResponse>("/api/events");

        setEvents(data.events);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load events.",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-rose-500 px-4 py-16 text-center text-white sm:py-20">
        <div className="mx-auto max-w-3xl">
          <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
            Make a Difference Together
          </span>

          <h1 className="mt-6 text-3xl font-bold sm:text-5xl">
            Discover Community Events
          </h1>

          <p className="mt-4 text-sm leading-7 text-red-50 sm:text-base">
            Find meaningful volunteering opportunities, connect with your
            community, and help create a better future.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Search and filters */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by event name, location..."
                className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-gray-500" />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-red-500 sm:w-56"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item === "All" ? "All Categories" : item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Available Events
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {loading
                ? "Loading events..."
                : `${filteredEvents.length} events found`}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-96 animate-pulse rounded-xl bg-gray-200"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="font-medium text-red-700">{error}</p>
            <p className="mt-2 text-sm text-red-600">
              Please check your backend server and try again.
            </p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white px-5 py-16 text-center">
            <Search className="mx-auto text-gray-400" size={40} />

            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              No events found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try another search term or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

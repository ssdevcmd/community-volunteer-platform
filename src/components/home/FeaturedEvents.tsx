import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Users,
  Leaf,
  BookOpen,
  HeartPulse,
  HandHeart,
} from "lucide-react";

import { events } from "@/data/events";
import type { CommunityEvent } from "@/types";

const themeStyles = {
  green: {
    background: "bg-emerald-50",
    icon: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-800",
    Icon: Leaf,
  },
  orange: {
    background: "bg-orange-50",
    icon: "text-orange-700",
    badge: "bg-orange-100 text-orange-800",
    Icon: BookOpen,
  },
  blue: {
    background: "bg-sky-50",
    icon: "text-sky-700",
    badge: "bg-sky-100 text-sky-800",
    Icon: HeartPulse,
  },
  purple: {
    background: "bg-purple-50",
    icon: "text-purple-700",
    badge: "bg-purple-100 text-purple-800",
    Icon: HandHeart,
  },
};

function EventCard({ event }: { event: CommunityEvent }) {
  const theme = themeStyles[event.theme];
  const Icon = theme.Icon;

  const formattedDate = new Date(
    `${event.date}T12:00:00`,
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const spotsLeft = Math.max(
    0,
    event.volunteersNeeded - event.volunteersRegistered,
  );

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className={`relative flex h-44 items-center justify-center ${theme.background}`}
      >
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full border-[20px] border-white" />
          <div className="absolute -bottom-12 -right-5 h-36 w-36 rounded-full border-[24px] border-white" />
        </div>

        <div className={`relative rounded-2xl bg-white p-5 shadow-sm ${theme.icon}`}>
          <Icon size={48} strokeWidth={1.5} />
        </div>

        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold ${theme.badge}`}
        >
          {event.category}
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          Organized by {event.organizer}
        </p>

        <h3 className="mt-2 text-xl font-bold text-gray-900 transition group-hover:text-emerald-700">
          {event.title}
        </h3>

        <p className="mt-3 min-h-12 text-sm leading-6 text-gray-600">
          {event.description}
        </p>

        <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
          <p className="flex items-center gap-2 text-sm text-gray-600">
            <CalendarDays size={17} className="shrink-0 text-emerald-600" />
            {formattedDate}
          </p>

          <p className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={17} className="shrink-0 text-emerald-600" />
            {event.location}
          </p>

          <p className="flex items-center gap-2 text-sm text-gray-600">
            <Users size={17} className="shrink-0 text-emerald-600" />
            {spotsLeft} spots remaining
          </p>
        </div>

        <Link
          href={`/events/${event.id}`}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 px-4 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
        >
          View Details
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}

export default function FeaturedEvents() {
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

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
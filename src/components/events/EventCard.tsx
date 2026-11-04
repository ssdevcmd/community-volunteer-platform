import Link from "next/link";
import { CalendarDays, MapPin, Users, ArrowRight } from "lucide-react";
import type { Event } from "@/types/event";

export default function EventCard({ event }: { event: Event }) {
  const date = new Date(event.date);

  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-44 items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <CalendarDays
          size={54}
          className="text-red-300 transition group-hover:scale-110"
        />
      </div>

      <div className="p-5">
        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
          {event.category}
        </span>

        <h2 className="mt-4 line-clamp-1 text-lg font-bold text-gray-900">
          {event.title}
        </h2>

        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-gray-500">
          {event.description}
        </p>

        <div className="mt-4 space-y-2 text-sm text-gray-500">
          <p className="flex items-center gap-2">
            <CalendarDays size={16} className="text-red-500" />
            {date.toLocaleDateString("en-BD", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p className="flex items-center gap-2">
            <MapPin size={16} className="text-red-500" />
            <span className="line-clamp-1">{event.location}</span>
          </p>

          <p className="flex items-center gap-2">
            <Users size={16} className="text-red-500" />
            Maximum {event.maxVolunteers} volunteers
          </p>
        </div>

        <div className="mt-5 border-t border-gray-100 pt-4">
          <Link
            href={`/events/${event._id}`}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            View Details
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

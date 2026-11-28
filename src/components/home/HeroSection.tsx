import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Heart,
  MapPin,
} from "lucide-react";

interface HeroEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  capacity: number;
  registered: number;
}

interface HeroStats {
  events: number;
  volunteers: number;
}

interface HeroData {
  success: boolean;
  events: HeroEvent[];
  stats: HeroStats;
}

const BENEFITS = [
  "Find events near you",
  "Register in seconds",
  "Track your volunteering",
];

const compact = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600";

// Fetch real homepage data from backend
async function getHeroData(): Promise<HeroData | null> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    console.error("NEXT_PUBLIC_API_URL is missing.");
    return null;
  }

  try {
    const response = await fetch(
      `${API_URL}/api/home/hero`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch hero data: ${response.status}`
      );
    }

    const data: HeroData = await response.json();

    if (!data.success) {
      throw new Error("Failed to load homepage data.");
    }

    return data;
  } catch (error) {
    console.error("Hero data error:", error);
    return null;
  }
}

// Format event date
function formatEventDate(dateValue: string) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return {
      month: "TBA",
      day: "--",
    };
  }

  return {
    month: date.toLocaleDateString("en-US", {
      month: "short",
      timeZone: "UTC",
    }),
    day: date.toLocaleDateString("en-US", {
      day: "numeric",
      timeZone: "UTC",
    }),
  };
}

// Individual event card
function EventRow({ event }: { event: HeroEvent }) {
  const { month, day } = formatEventDate(event.date);

  const capacity = Math.max(0, event.capacity || 0);
  const registered = Math.max(0, event.registered || 0);

  const slotsLeft = Math.max(0, capacity - registered);

  const isFull = capacity > 0 && slotsLeft === 0;

  const percent =
    capacity > 0
      ? Math.min(100, Math.round((registered / capacity) * 100))
      : 0;

  return (
    <li>
      <Link
        href={`/events/${event.id}`}
        className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-sm transition hover:bg-white/[0.17] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {/* Event date */}
        <time
          dateTime={event.date}
          className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-white shadow-sm"
        >
          <span className="text-[11px] font-bold uppercase tracking-wide text-emerald-600">
            {month}
          </span>

          <span className="text-xl font-extrabold leading-none text-emerald-950">
            {day}
          </span>
        </time>

        {/* Event information */}
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold">
            {event.title}
          </p>

          <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-emerald-100/90">
            <MapPin
              size={12}
              aria-hidden="true"
              className="shrink-0"
            />

            <span className="truncate">
              {event.location} · {event.category}
            </span>
          </p>

          {/* Registration progress */}
          <div className="mt-2.5 flex items-center gap-2.5">
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={capacity || 100}
              aria-valuenow={
                capacity > 0
                  ? Math.min(registered, capacity)
                  : 0
              }
              aria-label={`${registered} of ${capacity} volunteer slots filled`}
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/20"
            >
              <div
                className={`h-full rounded-full transition-all ${
                  isFull ? "bg-rose-400" : "bg-lime-300"
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>

            <span
              className={`text-[11px] font-semibold ${
                isFull ? "text-rose-200" : "text-emerald-50"
              }`}
            >
              {capacity === 0
                ? "N/A"
                : isFull
                  ? "Full"
                  : `${slotsLeft} left`}
            </span>
          </div>
        </div>

        <ArrowUpRight
          size={18}
          aria-hidden="true"
          className="shrink-0 text-white/50 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
        />
      </Link>
    </li>
  );
}

// Empty event state
function EmptyEvents() {
  return (
    <div className="relative mt-6 rounded-2xl border border-white/15 bg-white/10 px-5 py-10 text-center">
      <CalendarDays
        size={30}
        className="mx-auto mb-3 text-emerald-100"
        aria-hidden="true"
      />

      <p className="font-semibold">
        No upcoming events yet
      </p>

      <p className="mt-1 text-sm text-emerald-100/80">
        Check back soon for new volunteering opportunities.
      </p>

      <Link
        href="/events"
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 hover:text-lime-200"
      >
        Explore all events
        <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </div>
  );
}

// Main Hero Section
export default async function HeroSection() {
  const data = await getHeroData();

  const events = data?.events ?? [];
  const stats = data?.stats ?? null;

  const statItems = [
    {
      label: "Events",
      value: stats?.events,
    },
    {
      label: "Volunteers",
      value: stats?.volunteers,
    },
  ].filter(
    (item): item is { label: string; value: number } =>
      typeof item.value === "number" &&
      Number.isFinite(item.value)
  );

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-white"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-emerald-100/70 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 right-[-8rem] -z-10 h-[30rem] w-[30rem] rounded-full bg-lime-100/70 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_75%_65%_at_75%_40%,black,transparent)]"
        style={{
          backgroundImage:
            "radial-gradient(rgb(16 185 129 / 0.22) 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-28">
        {/* Left: Hero content */}
        <div className="lg:col-span-6">
          <p className="inline-flex items-center gap-2.5 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-600/15">
            <span
              className="relative flex h-2 w-2"
              aria-hidden="true"
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
            </span>

            Small actions. Meaningful change.
          </p>

          <h1
            id="hero-heading"
            className="mt-6 max-w-xl text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-gray-950 sm:text-5xl lg:text-[3.5rem]"
          >
            Together, we can make a{" "}
            <span className="relative whitespace-nowrap text-emerald-600">
              difference

              <svg
                aria-hidden="true"
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                fill="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-lime-400"
              >
                <path
                  d="M3 9C60 3 150 2 297 8"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-gray-600 sm:text-lg">
            Discover community events, meet people who care,
            and volunteer your time to create a better tomorrow.
          </p>

          {/* CTA buttons */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/events"
              className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-4 font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:-translate-y-0.5 hover:bg-emerald-700 ${focusRing}`}
            >
              Explore Events

              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/register"
              className={`inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-4 font-semibold text-gray-800 transition hover:border-emerald-300 hover:bg-emerald-50 ${focusRing}`}
            >
              Become a Volunteer

              <ArrowUpRight
                size={18}
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Benefits */}
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-gray-700">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-2"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check
                    size={12}
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                </span>

                {benefit}
              </li>
            ))}
          </ul>

          {/* Statistics */}
          {statItems.length > 0 && (
            <dl className="mt-10 grid max-w-md grid-cols-2 divide-x divide-gray-200 border-t border-gray-200 pt-6">
              {statItems.map((item) => (
                <div
                  key={item.label}
                  className="px-4 first:pl-0"
                >
                  <dt className="text-xs text-gray-500">
                    {item.label}
                  </dt>

                  <dd className="mt-1 text-2xl font-extrabold tracking-tight text-gray-950">
                    {compact.format(item.value)}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* Right: Upcoming events */}
        <div className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-linear-to-tr from-emerald-200/60 via-lime-100/40 to-transparent blur-2xl"
          />

          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-600 p-5 text-white shadow-2xl shadow-emerald-900/25 sm:p-7">
            {/* Decoration */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/10"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-lime-300/10 blur-3xl"
            />

            {/* Header */}
            <div className="relative flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                  <CalendarDays
                    size={22}
                    aria-hidden="true"
                  />
                </span>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-emerald-100/80">
                    Your next opportunity
                  </p>

                  <h2 className="text-lg font-bold">
                    Happening soon
                  </h2>
                </div>
              </div>

              <Link
                href="/events"
                className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-semibold ring-1 ring-white/20 transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                View all

                <ArrowUpRight
                  size={15}
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* Real events */}
            {events.length > 0 ? (
              <ul className="relative mt-6 space-y-3">
                {events.map((event) => (
                  <EventRow
                    key={event.id}
                    event={event}
                  />
                ))}
              </ul>
            ) : (
              <EmptyEvents />
            )}

            {/* Bottom message */}
            <p className="relative mt-6 flex items-start gap-2.5 border-t border-white/15 pt-5 text-sm leading-6 text-emerald-50/90">
              <Heart
                size={16}
                aria-hidden="true"
                className="mt-1 shrink-0 fill-lime-300 text-lime-300"
              />

              Every hour you give can make a difference in someone&apos;s life.
            </p>
          </div>

          {/* Floating note */}
          <div className="absolute -bottom-6 left-3 hidden items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 pr-6 shadow-xl sm:flex lg:-left-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Heart
                size={20}
                aria-hidden="true"
              />
            </span>

            <div>
              <p className="text-sm font-bold text-gray-900">
                Be the change
              </p>

              <p className="text-xs text-gray-500">
                Start with one small step
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

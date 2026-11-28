import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  Search,
  Users,
  Clock,
  Heart,
  CalendarCheck,
} from "lucide-react";

const upcomingEvents = [
  {
    id: "1",
    title: "Community Clean-Up Drive",
    description:
      "Join us to make our neighborhood cleaner, greener, and healthier.",
    category: "Environment",
    date: "November 15, 2026",
    location: "Gazipur, Bangladesh",
    volunteers: 35,
    capacity: 50,
    image: "🌱",
  },
  {
    id: "2",
    title: "Free Health Awareness Camp",
    description:
      "Help spread health awareness and support people in our community.",
    category: "Healthcare",
    date: "November 20, 2026",
    location: "Dhaka, Bangladesh",
    volunteers: 24,
    capacity: 40,
    image: "🩺",
  },
  {
    id: "3",
    title: "Winter Clothing Distribution",
    description:
      "Support underprivileged families by distributing winter clothing.",
    category: "Social Welfare",
    date: "November 25, 2026",
    location: "Narayanganj, Bangladesh",
    volunteers: 42,
    capacity: 60,
    image: "❤️",
  },
];

const categories = [
  { name: "Environment", icon: "🌱", count: "12 Events" },
  { name: "Healthcare", icon: "🩺", count: "8 Events" },
  { name: "Education", icon: "📚", count: "10 Events" },
  { name: "Social Welfare", icon: "❤️", count: "15 Events" },
];

export default function UserDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 p-6 text-white sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-2 text-sm font-medium text-red-100">
            Welcome to CommunityHub 👋
          </p>

          <h2 className="text-2xl font-bold sm:text-3xl">
            Make a Difference in Your Community
          </h2>

          <p className="mt-3 text-sm leading-6 text-red-50 sm:text-base">
            Discover meaningful events, connect with people, and be part of
            something bigger. Every small action creates a positive impact.
          </p>

          <Link
            href="/events"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Explore Events
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10" />
        <div className="pointer-events-none absolute -bottom-24 right-32 h-64 w-64 rounded-full border-[35px] border-white/10" />
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Available Events"
          value="45"
          description="Events you can explore"
          icon={<CalendarDays size={22} />}
          color="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Active Categories"
          value="8"
          description="Different ways to contribute"
          icon={<Heart size={22} />}
          color="bg-rose-50 text-rose-600"
        />

        <StatCard
          title="Community Volunteers"
          value="320"
          description="People making a difference"
          icon={<Users size={22} />}
          color="bg-emerald-50 text-emerald-600"
        />
      </section>

      {/* Categories */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Explore Categories
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Find events based on your interests.
            </p>
          </div>

          <Link
            href="/events"
            className="hidden items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700 sm:flex"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/events?category=${encodeURIComponent(category.name)}`}
              className="group rounded-xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-red-200 hover:shadow-md"
            >
              <span className="text-3xl">{category.icon}</span>

              <h3 className="mt-4 font-semibold text-gray-800 transition group-hover:text-red-600">
                {category.name}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {category.count}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section>
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Upcoming Events
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Discover opportunities to get involved.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
          >
            Browse All Events
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {upcomingEvents.map((event) => (
            <article
              key={event.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-md"
            >
              <div className="flex h-36 items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
                <span className="text-6xl">{event.image}</span>
              </div>

              <div className="p-5">
                <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                  {event.category}
                </span>

                <h3 className="mt-3 text-lg font-bold text-gray-900">
                  {event.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                  {event.description}
                </p>

                <div className="mt-4 space-y-2 text-sm text-gray-500">
                  <p className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-red-500" />
                    {event.date}
                  </p>

                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-red-500" />
                    {event.location}
                  </p>

                  <p className="flex items-center gap-2">
                    <Users size={16} className="text-red-500" />
                    {event.volunteers}/{event.capacity} volunteers
                  </p>
                </div>

                <div className="mt-5 border-t border-gray-100 pt-4">
                  <Link
                    href={`/events/${event.id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    View Details
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-red-100 bg-red-50 p-6 sm:flex-row sm:p-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Ready to Become a Volunteer?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our volunteer community and start making a positive impact.
          </p>
        </div>

        <Link
          href="/events"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <CalendarCheck size={18} />
          Find Opportunities
        </Link>
      </section>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
  color,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-gray-900">{value}</h3>
        </div>

        <div className={`rounded-xl p-3 ${color}`}>{icon}</div>
      </div>

      <p className="mt-3 text-xs text-gray-500">{description}</p>
    </div>
  );
}

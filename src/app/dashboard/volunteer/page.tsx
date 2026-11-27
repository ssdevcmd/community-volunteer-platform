import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  Search,
  Users,
  XCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Registrations",
    value: "12",
    description: "Events you've joined",
    icon: CalendarDays,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Confirmed",
    value: "8",
    description: "Approved registrations",
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Pending",
    value: "3",
    description: "Waiting for approval",
    icon: Clock,
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Completed",
    value: "1",
    description: "Events you've attended",
    icon: Users,
    color: "bg-purple-50 text-purple-600",
  },
];

const activities = [
  {
    id: "1",
    title: "Community Clean-Up Drive",
    date: "November 15, 2026",
    location: "Gazipur, Bangladesh",
    status: "Confirmed",
    statusStyle: "bg-emerald-50 text-emerald-700",
  },
  {
    id: "2",
    title: "Free Health Awareness Camp",
    date: "November 20, 2026",
    location: "Dhaka, Bangladesh",
    status: "Pending",
    statusStyle: "bg-amber-50 text-amber-700",
  },
  {
    id: "3",
    title: "Winter Clothing Distribution",
    date: "November 25, 2026",
    location: "Narayanganj, Bangladesh",
    status: "Confirmed",
    statusStyle: "bg-emerald-50 text-emerald-700",
  },
];

export default function VolunteerDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 p-6 text-white sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-medium text-red-100">
            Volunteer Dashboard
          </p>

          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Your Actions Make a Difference!
          </h2>

          <p className="mt-3 text-sm leading-6 text-red-50 sm:text-base">
            Thank you for being part of our community. Keep exploring
            opportunities and making a positive impact through volunteering.
          </p>

          <Link
            href="/events"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Find Opportunities
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10" />
      </section>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-gray-900">
                    {stat.value}
                  </h3>
                </div>

                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={22} />
                </div>
              </div>

              <p className="mt-3 text-xs text-gray-500">
                {stat.description}
              </p>
            </div>
          );
        })}
      </section>

      {/* My Activities */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              My Volunteer Activities
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Keep track of your event registrations.
            </p>
          </div>

          <Link
            href="/dashboard/volunteer/registrations"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="divide-y divide-gray-100">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
            >
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900">
                  {activity.title}
                </h3>

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={15} />
                    {activity.date}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <MapPin size={15} />
                    {activity.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${activity.statusStyle}`}
                >
                  {activity.status}
                </span>

                <Link
                  href={`/events/${activity.id}`}
                  className="text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <Search size={22} />
          </div>

          <h3 className="mt-4 text-lg font-bold text-gray-900">
            Discover More Events
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Explore community events that match your interests and skills.
          </p>

          <Link
            href="/events"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
          >
            Browse Events <ArrowRight size={16} />
          </Link>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={22} />
          </div>

          <h3 className="mt-4 text-lg font-bold text-gray-900">
            Stay Involved
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Check your registration status regularly and stay updated about
            your upcoming activities.
          </p>

          <Link
            href="/dashboard/volunteer/registrations"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
          >
            My Registrations <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

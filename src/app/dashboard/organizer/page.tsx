import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  Plus,
  Users,
  XCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Events",
    value: "18",
    description: "Events you've created",
    icon: CalendarDays,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Active Events",
    value: "8",
    description: "Currently accepting volunteers",
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Total Volunteers",
    value: "245",
    description: "Across all your events",
    icon: Users,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Pending Requests",
    value: "12",
    description: "Registrations to review",
    icon: Clock,
    color: "bg-amber-50 text-amber-600",
  },
];

const events = [
  {
    id: "1",
    title: "Community Clean-Up Drive",
    category: "Environment",
    date: "November 15, 2026",
    location: "Gazipur, Bangladesh",
    volunteers: 35,
    capacity: 50,
    status: "Published",
    statusStyle: "bg-emerald-50 text-emerald-700",
  },
  {
    id: "2",
    title: "Free Health Awareness Camp",
    category: "Healthcare",
    date: "November 20, 2026",
    location: "Dhaka, Bangladesh",
    volunteers: 24,
    capacity: 40,
    status: "Published",
    statusStyle: "bg-emerald-50 text-emerald-700",
  },
  {
    id: "3",
    title: "Winter Clothing Distribution",
    category: "Social Welfare",
    date: "November 25, 2026",
    location: "Narayanganj, Bangladesh",
    volunteers: 42,
    capacity: 60,
    status: "Draft",
    statusStyle: "bg-gray-100 text-gray-700",
  },
];

export default function OrganizerDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 p-6 text-white sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-medium text-red-100">
            Organizer Dashboard
          </p>

          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Create Events. Inspire People. Make an Impact.
          </h2>

          <p className="mt-3 text-sm leading-6 text-red-50 sm:text-base">
            Manage your community events, connect with volunteers, and
            organize meaningful activities that bring people together.
          </p>

          <Link
            href="/dashboard/organizer/create-event"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <Plus size={18} />
            Create New Event
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

      {/* Quick Actions */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <QuickAction
            title="Create Event"
            description="Publish a new community event."
            href="/dashboard/organizer/create-event"
            icon={<Plus size={21} />}
          />

          <QuickAction
            title="Manage Events"
            description="Edit and manage your existing events."
            href="/dashboard/organizer/events"
            icon={<CalendarDays size={21} />}
          />

          <QuickAction
            title="Manage Volunteers"
            description="Review registrations and volunteer lists."
            href="/dashboard/organizer/volunteers"
            icon={<Users size={21} />}
          />
        </div>
      </section>

      {/* Recent Events */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Your Recent Events
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Monitor your recently created community events.
            </p>
          </div>

          <Link
            href="/dashboard/organizer/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
          >
            Manage All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="divide-y divide-gray-100">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col justify-between gap-4 p-5 xl:flex-row xl:items-center"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-gray-900">
                    {event.title}
                  </h3>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${event.statusStyle}`}
                  >
                    {event.status}
                  </span>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                  {event.category}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={15} />
                    {event.date}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <MapPin size={15} />
                    {event.location}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 xl:justify-end">
                <div className="min-w-32">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-gray-500">Volunteers</span>
                    <span className="font-semibold text-gray-800">
                      {event.volunteers}/{event.capacity}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-red-600"
                      style={{
                        width: `${Math.min(
                          (event.volunteers / event.capacity) * 100,
                          100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <Link
                  href={`/events/${event.id}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  View <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Organizer Reminder */}
      <section className="rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-amber-100 p-2 text-amber-700">
            <Clock size={21} />
          </div>

          <div>
            <h3 className="font-bold text-gray-900">
              Don't forget to review registrations!
            </h3>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              You have 12 pending volunteer registrations. Review them to
              confirm participation and keep your events organized.
            </p>

            <Link
              href="/dashboard/organizer/volunteers"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-900"
            >
              Review Registrations <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function QuickAction({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-red-200 hover:shadow-md"
    >
      <div className="rounded-xl bg-red-50 p-3 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="font-semibold text-gray-900 group-hover:text-red-600">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-5 text-gray-500">
          {description}
        </p>
      </div>
    </Link>
  );
}

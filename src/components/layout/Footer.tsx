"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  HeartHandshake,
  Mail,
  MapPin,
  MoveUpRight,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const platformLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Events", href: "/events" },
  { label: "About Us", href: "/about" },
];

function getCommunityLinks(role?: string) {
  switch (role) {
    case "ORGANIZER":
      return [
        { label: "Organizer Dashboard", href: "/dashboard/organizer" },
        { label: "Manage Events", href: "/dashboard/organizer/my-events" },
        { label: "Create Event", href: "/dashboard/organizer/create-event" },
      ];

    case "VOLUNTEER":
      return [
        { label: "Volunteer Dashboard", href: "/dashboard/volunteer" },
        { label: "My Registrations", href: "/dashboard/volunteer/registrations" },
        { label: "Explore Events", href: "/events" },
      ];

    case "USER":
      return [
        { label: "Become a Volunteer", href: "/dashboard/user/become-volunteer" },
        { label: "My Dashboard", href: "/dashboard/user" },
        { label: "Explore Events", href: "/events" },
      ];

    default:
      return [
        { label: "Become a Volunteer", href: "/register" },
        { label: "Create an Account", href: "/register" },
        { label: "Log In", href: "/login" },
      ];
  }
}

export default function Footer() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const role = (
    user as typeof user & { role?: string }
  )?.role;

  const communityLinks = getCommunityLinks(role);

  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-16 lg:px-8">
        {/* Main footer content */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              aria-label="TogetherWeCan home"
              className="inline-flex items-center gap-2.5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                <HeartHandshake size={24} />
              </span>

              <span className="text-xl font-extrabold tracking-tight text-white">
                Together
                <span className="text-emerald-400">WeCan</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-gray-400">
              Connecting people, empowering volunteers, and bringing
              communities together through meaningful events and
              shared experiences.
            </p>

            <Link
              href="/events"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
            >
              Discover our events
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Platform links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Platform
            </h3>

            <ul className="mt-6 space-y-4">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-emerald-400"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Community
            </h3>

            {isPending ? (
              <div className="mt-6 space-y-4">
                <div className="h-4 w-36 animate-pulse rounded bg-gray-800" />
                <div className="h-4 w-28 animate-pulse rounded bg-gray-800" />
                <div className="h-4 w-32 animate-pulse rounded bg-gray-800" />
              </div>
            ) : (
              <ul className="mt-6 space-y-4">
                {communityLinks.map((link) => (
                  <li key={`${link.label}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-emerald-400"
                    >
                      {link.label}
                      <MoveUpRight size={13} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact section */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Get in touch
            </h3>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-emerald-400">
                  <Mail size={17} />
                </span>

                <div>
                  <p className="text-sm font-semibold text-gray-200">
                    Email
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Contact information coming soon
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-emerald-400">
                  <MapPin size={17} />
                </span>

                <div>
                  <p className="text-sm font-semibold text-gray-200">
                    Location
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} TogetherWeCan. All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-sm text-gray-500">
            Built for stronger communities
            <HeartHandshake
              size={16}
              className="text-emerald-400"
            />
          </p>
        </div>
      </div>
    </footer>
  );
}

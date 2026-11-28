
"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  User,
  Mail,
  ShieldCheck,
  CalendarDays,
  ArrowRight,
  HeartHandshake,
  Loader2,
} from "lucide-react";

export default function VolunteerProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <p className="text-gray-600">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  const user = session.user;

  const initials = (user.name || "Volunteer")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-10">
      {/* Page Header */}
      <div>
        <p className="mb-2 text-sm font-medium text-emerald-600">
          Volunteer Dashboard
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          View your account information and volunteer activities.
        </p>
      </div>

      {/* Profile Overview */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-400" />

        <div className="px-6 pb-7">
          <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end">
            {/* Profile Image */}
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "Volunteer"}
                className="h-24 w-24 rounded-2xl border-4 border-white bg-white object-cover shadow-sm"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-emerald-100 text-2xl font-bold text-emerald-700 shadow-sm">
                {initials}
              </div>
            )}

            <div className="pb-1">
              <h2 className="text-xl font-bold text-gray-900">
                {user.name || "Volunteer"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {user.email}
              </p>
            </div>

            <div className="sm:ml-auto sm:pb-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                <HeartHandshake className="h-4 w-4" />
                Volunteer
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Account Information */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-2.5">
              <User className="h-5 w-5 text-emerald-600" />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Account Information
              </h2>
              <p className="text-sm text-gray-500">
                Your registered account details
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-6 sm:grid-cols-2">
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-700">
                {user.name || "Not provided"}
              </span>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="truncate text-sm text-gray-700">
                {user.email || "Not provided"}
              </span>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Account Role
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <ShieldCheck className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-700">
                {user.role || "VOLUNTEER"}
              </span>
            </div>
          </div>

          {/* Account ID */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Account ID
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <User className="h-4 w-4 shrink-0 text-gray-400" />
              <span className="truncate text-sm text-gray-700">
                {user.id}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 px-6 py-3">
          <p className="text-xs text-gray-400">
            These details come from your Better Auth account.
          </p>
        </div>
      </section>

      {/* Volunteer Activities */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-2.5">
              <CalendarDays className="h-5 w-5 text-emerald-600" />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Volunteer Activities
              </h2>
              <p className="text-sm text-gray-500">
                Explore events and manage your registrations
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2">
          <Link
            href="/events"
            className="group flex items-center justify-between rounded-xl border border-gray-200 p-5 transition hover:border-emerald-300 hover:bg-emerald-50/50"
          >
            <div>
              <h3 className="font-semibold text-gray-900">
                Browse Events
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Discover opportunities to volunteer.
              </p>
            </div>

            <ArrowRight className="h-5 w-5 text-gray-400 transition group-hover:translate-x-1 group-hover:text-emerald-600" />
          </Link>

          <Link
            href="/dashboard/volunteer/registrations"
            className="group flex items-center justify-between rounded-xl border border-gray-200 p-5 transition hover:border-emerald-300 hover:bg-emerald-50/50"
          >
            <div>
              <h3 className="font-semibold text-gray-900">
                My Registrations
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Track your event registration status.
              </p>
            </div>

            <ArrowRight className="h-5 w-5 text-gray-400 transition group-hover:translate-x-1 group-hover:text-emerald-600" />
          </Link>
        </div>
      </section>
    </div>
  );
}

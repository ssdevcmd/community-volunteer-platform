
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Users,
  Clock,
  Tag,
  CheckCircle2,
} from "lucide-react";

import { apiRequest } from "@/lib/api";
import type { Event } from "@/types/event";
import { authClient } from "@/lib/auth-client";

interface EventResponse {
  success: boolean;
  event: Event;
}

export default function EventsDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { data: session } = authClient.useSession();

  const [registering, setRegistering] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await apiRequest<EventResponse>(
          `/api/events/${id}`
        );

        setEvent(data.event);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load event details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  const handleRegister = async () => {
    if (!session?.user) {
      setRegistrationError("Please log in before registering.");
      return;
    }

    if (session.user.role !== "VOLUNTEER") {
      setRegistrationError(
        "Only volunteers can register for events."
      );
      return;
    }

    try {
      setRegistering(true);
      setRegistrationMessage("");
      setRegistrationError("");

      const response = await apiRequest<{
        success: boolean;
        message: string;
      }>("/api/registrations", {
        method: "POST",
        body: JSON.stringify({
          eventId: event?._id,
        }),
      });

      setRegistrationMessage(response.message);
    } catch (err) {
      setRegistrationError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    } finally {
      setRegistering(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
          <p className="mt-4 text-sm text-gray-500">
            Loading event details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 rounded-full bg-red-50 p-4">
          <CalendarDays className="h-8 w-8 text-red-500" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900">
          Event Not Found
        </h2>

        <p className="mt-2 text-gray-500">
          {error || "The event you are looking for does not exist."}
        </p>

        <Link
          href="/events"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <Link
          href="/events"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-emerald-600"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Event Information */}
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                  {event.category}
                </span>

                <span className="rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
                  Published
                </span>
              </div>

              <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                {event.title}
              </h1>

              <div className="mt-6 flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:flex-wrap">
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarDays className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm">
                    {formatDate(event.date)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900">
                  About This Event
                </h2>

                <p className="mt-4 whitespace-pre-line leading-8 text-gray-600">
                  {event.description}
                </p>
              </div>

              {/* Required Skills */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Required Skills
                </h2>

                {event.requiredSkills.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {event.requiredSkills.map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-emerald-600"
                        />
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-gray-500">
                    No specific skills required.
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* Event Summary Sidebar */}
          <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Event Information
            </h2>

            <div className="mt-6 space-y-6">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-emerald-50 p-2.5">
                  <Users className="h-5 w-5 text-emerald-600" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Volunteers Needed
                  </p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {event.maxVolunteers} Volunteers
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-emerald-50 p-2.5">
                  <CalendarDays className="h-5 w-5 text-emerald-600" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Event Date
                  </p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {formatDate(event.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-emerald-50 p-2.5">
                  <Clock className="h-5 w-5 text-emerald-600" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Registration Deadline
                  </p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {formatDate(event.registrationDeadline)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-emerald-50 p-2.5">
                  <Tag className="h-5 w-5 text-emerald-600" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Category
                  </p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {event.category}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-emerald-50 p-4">
              <p className="text-sm leading-6 text-emerald-800">
                Interested in making a difference? Join this
                community event and contribute your skills.
              </p>
            </div>

            <Link
              href="/events"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              <ArrowLeft size={18} />
              Explore More Events
            </Link>

            <button
              onClick={handleRegister}
              disabled={
                registering ||
                !session?.user ||
                session.user.role !== "VOLUNTEER" ||
                new Date(event.registrationDeadline) <= new Date() ||
                new Date(event.date) <= new Date()
              }
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {registering ? "Registering..." : "Register Now"}
            </button>

            {registrationMessage && (
              <p className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
                {registrationMessage}
              </p>
            )}

            {registrationError && (
              <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {registrationError}
              </p>
            )}

            {!session?.user && (
              <p className="mt-3 text-center text-xs text-gray-500">
                Please log in as a volunteer to register.
              </p>
            )}

            {session?.user && session.user.role !== "VOLUNTEER" && (
              <p className="mt-3 text-center text-xs text-gray-500">
                Only volunteer accounts can register.
              </p>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
};

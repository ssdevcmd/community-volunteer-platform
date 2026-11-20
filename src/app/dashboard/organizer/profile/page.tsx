
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { apiRequest } from "@/lib/api";
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  FileText,
  Save,
  Loader2,
} from "lucide-react";

interface OrganizerProfile {
  organizerId?: string;
  organizationName: string;
  phone: string;
  location: string;
  bio: string;
  website: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProfileResponse {
  success: boolean;
  profile: OrganizerProfile | null;
  message?: string;
}

const initialProfile: OrganizerProfile = {
  organizationName: "",
  phone: "",
  location: "",
  bio: "",
  website: "",
};

export default function OrganizerProfilePage() {
  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  const [profile, setProfile] =
    useState<OrganizerProfile>(initialProfile);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load organizer profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await apiRequest<ProfileResponse>(
            "/api/organizer/profile"
          );

        if (response.profile) {
          setProfile({
            organizationName:
              response.profile.organizationName || "",
            phone: response.profile.phone || "",
            location: response.profile.location || "",
            bio: response.profile.bio || "",
            website: response.profile.website || "",
          });
        }
      } catch (err) {
        console.error("Failed to load organizer profile:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load your profile."
        );
      } finally {
        setLoading(false);
      }
    };

    if (!sessionLoading && session?.user) {
      loadProfile();
    } else if (!sessionLoading && !session?.user) {
      setLoading(false);
    }
  }, [sessionLoading, session]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Save organizer profile
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await apiRequest<ProfileResponse>(
        "/api/organizer/profile",
        {
          method: "PUT",
          body: JSON.stringify(profile),
        }
      );

      setMessage(
        response.message || "Profile saved successfully!"
      );

      if (response.profile) {
        setProfile({
          organizationName:
            response.profile.organizationName || "",
          phone: response.profile.phone || "",
          location: response.profile.location || "",
          bio: response.profile.bio || "",
          website: response.profile.website || "",
        });
      }
    } catch (err) {
      console.error("Failed to save organizer profile:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (sessionLoading || loading) {
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

  const accountName = session.user.name || "Organizer";
  const accountEmail = session.user.email || "";

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-10">
      {/* Page Header */}
      <div>
        <p className="mb-2 text-sm font-medium text-emerald-600">
          Organizer Dashboard
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Manage your account and organization information.
        </p>
      </div>

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
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-700">
                {accountName}
              </span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="truncate text-sm text-gray-700">
                {accountEmail}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 px-6 py-3">
          <p className="text-xs text-gray-400">
            Account information is managed through your authentication account.
          </p>
        </div>
      </section>

      {/* Organization Profile Form */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-2.5">
              <Building2 className="h-5 w-5 text-emerald-600" />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Organization Details
              </h2>
              <p className="text-sm text-gray-500">
                Tell volunteers about your organization
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Organization Name */}
          <div>
            <label
              htmlFor="organizationName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Organization Name <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                id="organizationName"
                name="organizationName"
                type="text"
                required
                value={profile.organizationName}
                onChange={handleChange}
                placeholder="Enter your organization name"
                className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Phone and Location */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Organization Location
              </label>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  id="location"
                  name="location"
                  type="text"
                  value={profile.location}
                  onChange={handleChange}
                  placeholder="e.g. Narayanganj, Bangladesh"
                  className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
          </div>

          {/* Website */}
          <div>
            <label
              htmlFor="website"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Website
            </label>

            <div className="relative">
              <Globe className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                id="website"
                name="website"
                type="url"
                value={profile.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              About Organization
            </label>

            <div className="relative">
              <FileText className="absolute left-4 top-4 h-4 w-4 text-gray-400" />

              <textarea
                id="bio"
                name="bio"
                rows={5}
                value={profile.bio}
                onChange={handleChange}
                placeholder="Write a short description about your organization..."
                className="w-full resize-y rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <p className="mt-2 text-xs text-gray-400">
              Introduce your organization and explain its mission.
            </p>
          </div>

          {/* Feedback Messages */}
          {message && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {message}
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end border-t border-gray-100 pt-5">
            <button
              type="submit"
              disabled={saving || !profile.organizationName.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Profile
                </>
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

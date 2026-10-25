"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  HeartHandshake,
  LoaderCircle,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const { error: signUpError } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        callbackURL: "/dashboard",
      });

      if (signUpError) {
        setError(signUpError.message || "Unable to create your account.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        <HeartHandshake size={27} />
      </div>

      <p className="mb-2 text-sm font-semibold tracking-wide text-emerald-700">
        JOIN OUR COMMUNITY
      </p>

      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Create an account
      </h1>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        Join local events, meet volunteers, and make a positive impact.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Full name
          </label>

          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            maxLength={100}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label
            htmlFor="register-email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email address
          </label>

          <input
            id="register-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label
            htmlFor="register-password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <input
            id="register-password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            maxLength={128}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Confirm password
          </label>

          <input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder="Enter your password again"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <LoaderCircle size={18} className="animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create account
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-emerald-700 hover:text-emerald-800"
        >
          Sign in
        </Link>
      </p>

      <p className="mt-5 text-center text-xs leading-5 text-gray-400">
        New accounts start with the Regular User role.
      </p>
    </div>
  );
}
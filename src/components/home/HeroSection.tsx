import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  Users,
  CalendarDays,
  HandHeart,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#f5faf6]">
      <div className="pointer-events-none absolute -left-32 -top-20 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-lime-200/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:py-28 lg:grid-cols-2 lg:px-8">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm">
            <Heart size={16} className="fill-emerald-600 text-emerald-600" />
            Small actions. Meaningful change.
          </div>

          <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
            Together, We Can Make a{" "}
            <span className="text-emerald-600">Difference.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
            Discover community events, meet people who care, and volunteer
            your time to create a better tomorrow.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              Explore Events
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-4 font-semibold text-gray-800 transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              Become a Volunteer
              <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <Users size={17} className="text-emerald-600" />
              Community driven
            </span>
            <span className="flex items-center gap-2">
              <HandHeart size={17} className="text-emerald-600" />
              Make an impact
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute inset-5 rounded-[2rem] bg-emerald-200/60 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-5 shadow-2xl shadow-emerald-900/10 sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Your next opportunity
                </p>
                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  Make today count
                </h2>
              </div>

              <span className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                <CalendarDays size={24} />
              </span>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-lime-500 p-6 text-white">
              <div className="flex h-40 items-center justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/30 bg-white/15">
                  <HandHeart size={64} strokeWidth={1.4} />
                </div>
              </div>

              <p className="text-sm font-medium text-emerald-50">
                FIND YOUR PURPOSE
              </p>
              <h3 className="mt-2 text-2xl font-bold">
                Your community needs you.
              </h3>
              <p className="mt-2 text-sm leading-6 text-emerald-50">
                Every hour you give can make a difference in someone&apos;s life.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gray-50 p-4">
                <Users className="mb-3 text-emerald-600" size={22} />
                <p className="font-bold text-gray-900">Join a team</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Meet people who share your passion.
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <Heart className="mb-3 text-rose-500" size={22} />
                <p className="font-bold text-gray-900">Create impact</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Turn your time into positive change.
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -right-2 top-24 hidden items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:flex">
            <span className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
              <Heart size={21} />
            </span>
            <div>
              <p className="text-sm font-bold text-gray-900">Be the change</p>
              <p className="text-xs text-gray-500">Start with one small step</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
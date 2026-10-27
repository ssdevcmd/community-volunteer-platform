import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-[#f8faf9] px-5 py-16 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-emerald-600 px-6 py-14 text-center text-white sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border-[35px] border-white/10" />
        <div className="pointer-events-none absolute -bottom-28 -left-12 h-64 w-64 rounded-full border-[35px] border-white/10" />

        <div className="relative mx-auto max-w-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <HeartHandshake size={30} />
          </div>

          <h2 className="mt-6 text-3xl font-black sm:text-4xl">
            Your community. Your chance to make a difference.
          </h2>

          <p className="mt-5 leading-7 text-emerald-50">
            Join people who believe that small acts of kindness can build a
            stronger, more caring world.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-emerald-800 transition hover:bg-emerald-50"
            >
              Join Our Community
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/events"
              className="rounded-xl border border-white/40 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
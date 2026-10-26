import Link from "next/link";
import { Search, ClipboardCheck, HeartHandshake, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover Events",
    description:
      "Browse community events and find causes that match your interests.",
    icon: Search,
  },
  {
    number: "02",
    title: "Register to Help",
    description:
      "Choose an event, register, and get ready to contribute your time.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "Make an Impact",
    description:
      "Meet your community, support a meaningful cause, and create change.",
    icon: HeartHandshake,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
            Simple and meaningful
          </span>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
            Three steps to make an impact
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            You don&apos;t need to change the whole world in one day. Start by
            helping your community.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative text-center">
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700">
                  <Icon size={35} strokeWidth={1.6} />

                  <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 font-semibold text-emerald-700 hover:text-emerald-900"
          >
            Find your first event
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
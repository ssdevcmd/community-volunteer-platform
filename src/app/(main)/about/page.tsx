import Link from "next/link";
import {
  HeartHandshake,
  Users,
  Target,
  Leaf,
  BookOpen,
  HeartPulse,
  HandHeart,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Globe2,
  CalendarDays,
} from "lucide-react";

const values = [
  {
    icon: HeartHandshake,
    title: "Community First",
    description:
      "We believe meaningful change starts when people come together to support the needs of their communities.",
  },
  {
    icon: Users,
    title: "Stronger Together",
    description:
      "We connect organizers, volunteers, and community members to turn shared ideas into collective action.",
  },
  {
    icon: Target,
    title: "Purposeful Action",
    description:
      "We help people discover opportunities where their time, energy, and skills can make a real difference.",
  },
];

const categories = [
  {
    icon: Leaf,
    title: "Environment",
    description:
      "Take part in clean-up drives, tree planting, and environmental awareness initiatives.",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: BookOpen,
    title: "Education",
    description:
      "Support learning programs, educational workshops, and opportunities for young people.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: HeartPulse,
    title: "Health",
    description:
      "Help organize health awareness campaigns and community wellness initiatives.",
    color: "bg-rose-100 text-rose-700",
  },
  {
    icon: HandHeart,
    title: "Community Support",
    description:
      "Join local initiatives that support families and strengthen neighborhood connections.",
    color: "bg-amber-100 text-amber-700",
  },
];

const steps = [
  {
    number: "01",
    title: "Discover opportunities",
    description:
      "Explore community events and find causes that match your interests.",
  },
  {
    number: "02",
    title: "Get involved",
    description:
      "Register for an event, volunteer your time, or organize an initiative of your own.",
  },
  {
    number: "03",
    title: "Make a difference",
    description:
      "Work alongside others and contribute to positive change in your community.",
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-[#f3faf5]">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-lime-200/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800">
              <Sparkles size={16} />
              About CommunityConnect
            </span>

            <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Small actions.
              <span className="block text-emerald-600">
                Meaningful change.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
              We bring people together through community events and
              volunteering opportunities. Our goal is to make it easier for
              everyone to find a cause they care about and turn good intentions
              into positive action.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-700"
              >
                Explore events
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-800 transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                Join our community
              </Link>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-6 rounded-[2rem] bg-emerald-200/50 blur-2xl" />

            <div className="relative rounded-[2rem] border border-emerald-100 bg-white p-5 shadow-xl shadow-emerald-900/5 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Our shared purpose
                  </p>
                  <h2 className="mt-1 text-xl font-bold">Better, together.</h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <Globe2 size={25} />
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-emerald-50 p-5">
                  <Users size={26} className="text-emerald-700" />
                  <p className="mt-4 font-bold">Volunteers</p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    People ready to help
                  </p>
                </div>

                <div className="rounded-2xl bg-amber-50 p-5">
                  <CalendarDays size={26} className="text-amber-700" />
                  <p className="mt-4 font-bold">Events</p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Opportunities to act
                  </p>
                </div>

                <div className="col-span-2 rounded-2xl bg-gray-900 p-5 text-white sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-300">
                      <HeartHandshake size={24} />
                    </div>

                    <div>
                      <h3 className="font-bold">Every contribution matters</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-300">
                        A little time, a helping hand, or a shared idea can
                        create a lasting impact when we work together.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-3 top-1/3 hidden items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-lg sm:flex">
              <CheckCircle2 size={19} className="text-emerald-600" />
              <span className="text-sm font-semibold">Purpose in action</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            Our mission
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Making community involvement accessible to everyone
          </h2>

          <p className="mt-6 text-base leading-8 text-gray-600 sm:text-lg">
            CommunityConnect is designed to bring event organizers,
            volunteers, and community members into one place. We want to
            simplify the process of discovering events, coordinating
            participation, and finding meaningful ways to help.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article
                key={value.title}
                className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon size={25} />
                </div>

                <h3 className="mt-5 text-xl font-bold">{value.title}</h3>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {value.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-[#f7faf8] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
                What we support
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Find a cause close to your heart
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Discover different ways to contribute your time, skills, and
                energy to your community.
              </p>
            </div>

            <Link
              href="/events"
              className="inline-flex w-fit items-center gap-2 font-semibold text-emerald-700 transition hover:text-emerald-800"
            >
              Browse all events
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <article
                  key={category.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${category.color}`}
                  >
                    <Icon size={25} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {category.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            How it works
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Turn your good intentions into action
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.number} className="relative">
              <span className="text-5xl font-extrabold tracking-tight text-emerald-100">
                {step.number}
              </span>

              <h3 className="mt-4 text-xl font-bold">{step.title}</h3>

              <p className="mt-3 max-w-sm text-sm leading-7 text-gray-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-5 pb-20 sm:px-8 lg:pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-emerald-700 px-6 py-14 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-lime-300/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
              <HeartHandshake size={30} />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Your community needs people like you.
            </h2>

            <p className="mt-5 leading-8 text-emerald-50">
              Discover an event, share your skills, or help organize
              something meaningful. Your next opportunity to make a
              difference is waiting.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-emerald-800 transition hover:bg-emerald-50"
              >
                Get started
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/events"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Explore events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import {
  ArrowUpRight,
  Leaf,
  BookOpen,
  HeartPulse,
  HandHeart,
} from "lucide-react";

const categories = [
  {
    title: "Environment",
    description: "Protect nature and create a greener future.",
    icon: Leaf,
    color: "bg-emerald-50 text-emerald-700",
    href: "/events?category=Environment",
  },
  {
    title: "Education",
    description: "Help others learn, grow, and succeed.",
    icon: BookOpen,
    color: "bg-orange-50 text-orange-700",
    href: "/events?category=Education",
  },
  {
    title: "Health",
    description: "Support healthier and happier communities.",
    icon: HeartPulse,
    color: "bg-sky-50 text-sky-700",
    href: "/events?category=Health",
  },
  {
    title: "Community Service",
    description: "Bring people together to make a difference.",
    icon: HandHeart,
    color: "bg-purple-50 text-purple-700",
    href: "/events?category=Community",
  },
];

export default function CategoriesSection() {
  return (
    <section className="bg-[#f8faf9] py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
            Explore your interests
          </span>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
            Find a cause you care about
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Choose what matters to you and find meaningful ways to contribute.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href={category.href}
                className="group rounded-2xl border border-gray-100 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <span
                  className={`inline-flex rounded-2xl p-4 ${category.color}`}
                >
                  <Icon size={28} strokeWidth={1.7} />
                </span>

                <h3 className="mt-5 flex items-center justify-between gap-2 font-bold text-gray-900">
                  {category.title}
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-gray-400 transition group-hover:text-emerald-700"
                  />
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
import { CalendarDays, Users, HandHeart, MapPinned } from "lucide-react";

const stats = [
  {
    label: "Events Organized",
    value: "120+",
    icon: CalendarDays,
  },
  {
    label: "Active Volunteers",
    value: "850+",
    icon: Users,
  },
  {
    label: "Volunteer Hours",
    value: "2,400+",
    icon: HandHeart,
  },
  {
    label: "Communities Reached",
    value: "35+",
    icon: MapPinned,
  },
];

export default function ImpactStats() {
  return (
    <section className="bg-emerald-800 py-16 text-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-200">
            The difference we can make
          </p>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            Every contribution matters
          </h2>

          <p className="mt-4 leading-7 text-emerald-100">
            A stronger community begins when people come together to help.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div key={stat.label} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-emerald-100">
                  <Icon size={27} />
                </div>

                <p className="mt-5 text-3xl font-black sm:text-4xl">
                  {stat.value}
                </p>

                <p className="mt-2 text-sm text-emerald-100">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-emerald-200">
          Illustrative demo statistics — replace with verified database metrics
          before presenting them as actual achievements.
        </p>
      </div>
    </section>
  );
}
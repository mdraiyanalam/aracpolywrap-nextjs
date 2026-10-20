import { Globe, Ship, Users, type LucideIcon } from "lucide-react";
import Image from "next/image";
import factory from "@/assets/images/hero/factory.jpg";
import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { sectionCopy } from "@/content/sections";
import { stats } from "@/content/stats";
import type { Stat } from "@/content/types";

const icons: Record<Stat["icon"], LucideIcon> = {
  clients: Users,
  countries: Globe,
  shipments: Ship,
};

export function StatsSection() {
  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="relative isolate overflow-hidden bg-brand-900 py-16 text-white sm:py-20"
    >
      <Image src={factory} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-15" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-br from-brand-950/95 via-brand-900/90 to-brand-800/85"
      />
      <Container>
        <h2 id="achievements-heading" className="sr-only">
          {sectionCopy.achievements.title}
        </h2>
        <dl className="grid gap-12 sm:grid-cols-3">
          {stats.map((stat) => {
            const Icon = icons[stat.icon];
            return (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <span
                  aria-hidden="true"
                  className="grid size-16 place-items-center rounded-full bg-white/10 ring-1 ring-white/20"
                >
                  <Icon className="size-8 text-accent-400" />
                </span>
                <dt className="order-last mt-2 text-sm font-semibold tracking-[0.2em] text-brand-100 uppercase">
                  {stat.label}
                </dt>
                <dd className="mt-4 font-display text-5xl font-extrabold text-white sm:text-6xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}

import { BadgeCheck, Gauge, Leaf, Ruler, type LucideIcon } from "lucide-react";
import Image from "next/image";
import factory from "@/assets/images/hero/factory.jpg";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/content/about";
import { sectionCopy } from "@/content/sections";
import type { CompanyValue } from "@/content/types";

const icons: Record<CompanyValue["icon"], LucideIcon> = {
  quality: BadgeCheck,
  specification: Ruler,
  efficiency: Gauge,
  sustainability: Leaf,
};

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute -top-4 -left-4 h-2/3 w-2/3 rounded-3xl bg-accent-100"
          />
          <span
            aria-hidden="true"
            className="absolute -right-4 -bottom-4 h-2/3 w-2/3 rounded-3xl bg-brand-100"
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
            <Image
              src={factory}
              alt="The ARAC Polywrap factory building"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-6 rounded-2xl bg-brand-900 px-6 py-4 text-white shadow-xl">
            <p className="text-sm text-brand-200">{about.badge.label}</p>
            <p className="font-display text-lg font-bold">{about.badge.value}</p>
          </div>
        </div>

        <div>
          <SectionHeading id="about-heading" align="left" {...sectionCopy.about} />
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-5 text-lg leading-relaxed text-slate-700">
              {paragraph}
            </p>
          ))}
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {about.values.map((value) => {
              const Icon = icons[value.icon];
              return (
                <li key={value.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent-50 text-accent-600 ring-1 ring-accent-100"
                  >
                    <Icon className="size-6" />
                  </span>
                  <div>
                    <h3 className="font-bold">{value.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {value.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

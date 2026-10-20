import { Boxes, FlaskConical, Layers, Ruler, Settings2, Ship, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionCopy } from "@/content/sections";
import { services } from "@/content/services";
import type { Service } from "@/content/types";

const icons: Record<Service["icon"], LucideIcon> = {
  engineering: Settings2,
  coextrusion: Layers,
  downgauging: Ruler,
  treatment: FlaskConical,
  formats: Boxes,
  export: Ship,
};

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-20 sm:py-28">
      <Container>
        <SectionHeading id="services-heading" {...sectionCopy.services} />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <li
                key={service.title}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-linear-to-r from-accent-500 to-brand-700 transition-transform duration-300 group-hover:scale-x-100"
                />
                <span
                  aria-hidden="true"
                  className="grid size-14 place-items-center rounded-xl bg-brand-700 text-white shadow-md transition-colors group-hover:bg-accent-600"
                >
                  <Icon className="size-7" />
                </span>
                <h3 className="mt-6 text-xl font-bold">{service.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{service.description}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

import { Building2, ExternalLink, Mail, Phone, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { company } from "@/content/company";
import { sectionCopy } from "@/content/sections";

function ContactCard({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <span
        aria-hidden="true"
        className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700"
      >
        <Icon className="size-6" />
      </span>
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="mt-1 leading-relaxed text-slate-700">{children}</div>
      </div>
    </div>
  );
}

const linkClass =
  "font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4 hover:text-accent-600 hover:decoration-accent-600";

export function ContactSection() {
  const { phone, email } = company.contact;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-slate-50 py-20 sm:py-28">
      <Container>
        <SectionHeading id="contact-heading" {...sectionCopy.contact} />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            {company.addresses.map((address) => (
              <ContactCard key={address.label} icon={Building2} title={address.label}>
                <address className="not-italic">
                  {address.streetAddress}
                  <br />
                  {address.locality}-{address.postalCode}, {address.country}
                </address>
              </ContactCard>
            ))}
            <ContactCard icon={Phone} title="Phone">
              <a href={phone.href} className={linkClass}>
                {phone.display}
              </a>
            </ContactCard>
            <ContactCard icon={Mail} title="E-mail">
              <a href={`mailto:${email}`} className={linkClass}>
                {email}
              </a>
            </ContactCard>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-3">
            <div className="relative min-h-80 flex-1 overflow-hidden rounded-2xl bg-slate-200 shadow-lg ring-1 ring-slate-200">
              <iframe
                src={company.map.embedUrl}
                title={company.map.title}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 size-full border-0"
              />
            </div>
            <a
              href={company.map.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 self-start text-sm ${linkClass}`}
            >
              Open in Google Maps
              <ExternalLink aria-hidden="true" className="size-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

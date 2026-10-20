import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import logo from "@/assets/images/brand/logo.png";
import { FacebookIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/container";
import { company, formatAddress } from "@/content/company";
import { primaryNavigation, sectionHref } from "@/content/navigation";
import { products } from "@/content/products";
import { CopyrightYears } from "./copyright-year";

const socialIcons = { facebook: FacebookIcon } as const;

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold tracking-widest text-white uppercase">
        {title}
      </h3>
      <span aria-hidden="true" className="mt-3 block h-0.5 w-8 rounded-full bg-accent-500" />
      <div className="mt-5">{children}</div>
    </div>
  );
}

const linkClass = "text-brand-200 transition-colors hover:text-white";

export function SiteFooter() {
  const [headOffice] = company.addresses;

  return (
    <footer
      aria-labelledby="footer-heading"
      className="bg-brand-950 text-sm text-brand-200 print:hidden"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div className="space-y-6">
          <Link
            href="/"
            aria-label={`${company.name} — home`}
            className="inline-block rounded-lg bg-white px-3 py-2"
          >
            <Image src={logo} alt="" className="h-10 w-auto" />
          </Link>
          <p className="max-w-xs leading-relaxed">{company.description}</p>
          <ul className="flex gap-3" aria-label="Social media">
            {company.social.map((profile) => {
              const Icon = socialIcons[profile.network];
              return (
                <li key={profile.href}>
                  <a
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${profile.label} (opens in a new tab)`}
                    className="grid size-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:bg-accent-600"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <FooterColumn title="Quick links">
          <ul className="space-y-3">
            {primaryNavigation.map((item) => (
              <li key={item.id}>
                <Link href={sectionHref(item.id)} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterColumn>

        <FooterColumn title="Products">
          <ul className="space-y-3">
            {products.map((product) => (
              <li key={product.slug}>
                <Link href={sectionHref(product.slug)} className={linkClass}>
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </FooterColumn>

        <FooterColumn title="Contact">
          <ul className="space-y-4">
            {headOffice ? (
              <li className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-400" />
                <address className="not-italic">{formatAddress(headOffice)}</address>
              </li>
            ) : null}
            <li className="flex gap-3">
              <Phone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-400" />
              <a href={company.contact.phone.href} className={linkClass}>
                {company.contact.phone.display}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-400" />
              <a href={`mailto:${company.contact.email}`} className={linkClass}>
                {company.contact.email}
              </a>
            </li>
          </ul>
        </FooterColumn>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p>
            ©{" "}
            <CopyrightYears
              since={company.copyrightStartYear}
              renderedYear={new Date().getFullYear()}
            />{" "}
            {company.name}. All rights reserved.
          </p>
          <p>
            Designed by{" "}
            <a
              href={company.credit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline-offset-4 hover:underline"
            >
              {company.credit.name}
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}

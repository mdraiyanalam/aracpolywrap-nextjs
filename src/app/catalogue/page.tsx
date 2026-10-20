import { ArrowLeft, CircleCheck, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/brand/logo.png";
import { Container } from "@/components/ui/container";
import { PrintButton } from "@/components/ui/print-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { company, formatAddress } from "@/content/company";
import { products } from "@/content/products";
import { sectionCopy } from "@/content/sections";

const description = `Printable catalogue of ${company.name} polyethylene films: ${products
  .map((p) => p.name.toLowerCase())
  .join(", ")}.`;

export const metadata: Metadata = {
  title: "Product catalogue",
  description,
  alternates: { canonical: "/catalogue" },
  openGraph: { url: "/catalogue", title: `Product catalogue | ${company.name}`, description },
};

/** Print-optimised catalogue generated from the same product data as the home page. */
export default function CataloguePage() {
  return (
    <div className="bg-slate-50 py-12 sm:py-16 print:bg-white print:py-0">
      <Container className="max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-accent-600"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to home
          </Link>
          <PrintButton />
        </div>

        {/* Letterhead, shown on paper only (the site header is hidden when printing). */}
        <div className="hidden items-center justify-between border-b-2 border-brand-700 pb-4 print:flex">
          <Image src={logo} alt={company.name} className="h-12 w-auto" />
          <p className="text-right text-xs text-slate-600">{company.tagline}</p>
        </div>

        <div className="mt-10 print:mt-6">
          <SectionHeading
            id="catalogue-heading"
            level={1}
            align="left"
            {...sectionCopy.catalogue}
          />
        </div>

        <ol className="mt-12 space-y-10 print:mt-8 print:space-y-6">
          {products.map((product, index) => (
            <li
              key={product.slug}
              aria-labelledby={`catalogue-${product.slug}`}
              className="grid break-inside-avoid gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:grid-cols-[14rem_1fr] sm:p-8 print:grid-cols-[10rem_1fr] print:p-4 print:shadow-none"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  sizes="(min-width: 640px) 14rem, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] text-accent-600 uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 id={`catalogue-${product.slug}`} className="mt-1 text-2xl font-extrabold">
                  {product.name}
                </h2>
                <p className="mt-3 leading-relaxed text-slate-700">{product.summary}</p>
                {product.details?.map((paragraph) => (
                  <p key={paragraph} className="mt-2 leading-relaxed text-slate-700">
                    {paragraph}
                  </p>
                ))}
                {product.featuresHeading ? (
                  <h3 className="mt-4 text-base font-semibold">{product.featuresHeading}</h3>
                ) : (
                  <h3 className="sr-only">Features</h3>
                )}
                <ul className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <CircleCheck
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-accent-600"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <aside
          aria-labelledby="catalogue-contact"
          className="mt-12 break-inside-avoid rounded-2xl bg-brand-900 p-8 text-brand-100 print:mt-8 print:bg-white print:p-4 print:text-slate-800 print:ring-1 print:ring-slate-300"
        >
          <h2 id="catalogue-contact" className="text-xl font-bold text-white print:text-brand-900">
            Contact {company.name}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {company.addresses.map((address) => (
              <li key={address.label} className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-400" />
                <span>
                  <strong>{address.label}:</strong> {formatAddress(address)}
                </span>
              </li>
            ))}
            <li className="flex gap-3">
              <Phone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-400" />
              <a href={company.contact.phone.href} className="underline-offset-4 hover:underline">
                {company.contact.phone.display}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-400" />
              <a
                href={`mailto:${company.contact.email}`}
                className="underline-offset-4 hover:underline"
              >
                {company.contact.email}
              </a>
            </li>
          </ul>
        </aside>
      </Container>
    </div>
  );
}

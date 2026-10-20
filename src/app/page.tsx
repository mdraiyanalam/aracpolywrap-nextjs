import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { DownloadSection } from "@/components/sections/download-section";
import { HeroCarousel } from "@/components/sections/hero-carousel";
import { ProductsSection } from "@/components/sections/products-section";
import { ServicesSection } from "@/components/sections/services-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import type { Metadata } from "next";
import logo from "@/assets/images/brand/logo.png";
import { company } from "@/content/company";
import { heroSlides } from "@/content/hero";
import { pagePath } from "@/lib/site";
import { organizationJsonLd, serializeJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: pagePath("/") },
  openGraph: {
    url: pagePath("/"),
    title: `${company.name} — ${company.tagline}`,
    description: company.description,
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd(logo.src)) }}
      />
      <h1 className="sr-only">
        {company.name} — {company.tagline}
      </h1>
      <HeroCarousel slides={heroSlides} />
      <ProductsSection />
      <StatsSection />
      <ServicesSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <DownloadSection />
    </>
  );
}

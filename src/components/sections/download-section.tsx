import { Download, FileText, Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { company } from "@/content/company";
import { sectionCopy } from "@/content/sections";

const dataSheetMailto = `mailto:${company.contact.email}?subject=${encodeURIComponent(
  "Technical data sheet request",
)}`;

export function DownloadSection() {
  return (
    <section
      id="download"
      aria-labelledby="download-heading"
      className="relative isolate overflow-hidden bg-brand-900 py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-br from-brand-950 via-brand-900 to-brand-700"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 -z-10 size-96 rounded-full border-[3rem] border-accent-600/20"
      />
      <Container className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
          <span
            aria-hidden="true"
            className="grid size-20 shrink-0 place-items-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20"
          >
            <FileText className="size-10" />
          </span>
          <SectionHeading
            id="download-heading"
            align="left"
            tone="dark"
            {...sectionCopy.download}
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
          <ButtonLink href="/catalogue">
            <FileText aria-hidden="true" className="size-5" />
            View catalogue
          </ButtonLink>
          {company.brochureUrl ? (
            <ButtonLink href={company.brochureUrl} variant="outline-light" download>
              <Download aria-hidden="true" className="size-5" />
              Download PDF brochure
            </ButtonLink>
          ) : null}
          <ButtonLink href={dataSheetMailto} variant="outline-light">
            <Mail aria-hidden="true" className="size-5" />
            Request a data sheet
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

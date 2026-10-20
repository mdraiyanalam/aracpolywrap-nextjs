import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { sectionHref } from "@/content/navigation";

// Next.js adds `<meta name="robots" content="noindex">` to not-found responses automatically.
export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Container className="grid min-h-[60vh] place-items-center py-24 text-center">
      <div className="max-w-xl">
        <p className="font-display text-7xl font-extrabold text-accent-600">404</p>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Page not found</h1>
        <p className="mt-4 text-lg text-slate-600">
          The page you are looking for has moved or no longer exists.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/">Go to the home page</ButtonLink>
          <ButtonLink href={sectionHref("products")} variant="secondary">
            Browse products
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}

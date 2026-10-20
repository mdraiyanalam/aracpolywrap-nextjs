import { cn } from "@/lib/cn";
import { BrandRule } from "./brand-rule";

interface SectionHeadingProps {
  /** ID of the `<h2>`; pass it to the section's `aria-labelledby`. */
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  /** Use 1 when the heading is the page title (e.g. the catalogue page). */
  level?: 1 | 2;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  level = 2,
}: SectionHeadingProps) {
  const Heading = level === 1 ? "h1" : "h2";
  const centered = align === "center";
  const dark = tone === "dark";

  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
      <p
        className={cn(
          "inline-flex items-center gap-2 text-sm font-semibold tracking-[0.2em] uppercase",
          dark ? "text-accent-300" : "text-accent-600",
        )}
      >
        <span aria-hidden="true" className="h-0.5 w-6 bg-current" />
        {eyebrow}
      </p>
      <Heading
        id={id}
        className={cn(
          "mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl",
          dark && "text-white",
        )}
      >
        {title}
      </Heading>
      <BrandRule className={cn(centered && "mx-auto")} />
      {description ? (
        <p
          className={cn("mt-5 text-lg leading-relaxed", dark ? "text-brand-100" : "text-slate-600")}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

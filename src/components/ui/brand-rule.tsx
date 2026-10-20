import { cn } from "@/lib/cn";

/** Decorative red + navy double bar, echoing the two strokes of the logo mark. */
export function BrandRule({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("mt-4 flex w-fit gap-1.5", className)}>
      <span className="h-1 w-10 rounded-full bg-accent-500" />
      <span className="h-1 w-4 rounded-full bg-brand-700" />
    </span>
  );
}

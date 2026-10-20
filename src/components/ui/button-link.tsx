import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-accent-600 text-white shadow-sm hover:bg-accent-700",
  secondary: "bg-white text-brand-800 ring-1 ring-brand-200 ring-inset hover:bg-brand-50",
  "outline-light": "text-white ring-1 ring-white/70 ring-inset hover:bg-white/10",
} as const;

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
} as const;

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

/** A link styled as a button. Use a real `<button>` for actions that do not navigate. */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

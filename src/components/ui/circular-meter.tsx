"use client";

import { useInView } from "@/hooks/use-in-view";
import { useIsClient } from "@/hooks/use-is-client";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface CircularMeterProps {
  /** Percentage, 0–100. */
  value: number;
  label: string;
  description?: string;
}

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Circular progress ring exposed as an ARIA `meter` (a static measurement, not a task in
 * progress). The ring fills when it scrolls into view; server HTML shows the final state.
 */
export function CircularMeter({ value, label, description }: CircularMeterProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.5 });
  const isClient = useIsClient();
  const reducedMotion = usePrefersReducedMotion();

  const clamped = Math.min(Math.max(value, 0), 100);
  const waitingToAnimate = isClient && !reducedMotion && !inView;
  const offset = waitingToAnimate ? CIRCUMFERENCE : CIRCUMFERENCE * (1 - clamped / 100);

  return (
    <figure className="flex flex-col items-center text-center">
      <div
        ref={ref}
        role="meter"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${clamped}%`}
        aria-label={label}
        className="relative size-32 sm:size-36"
      >
        <svg viewBox="0 0 120 120" aria-hidden="true" className="size-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            strokeWidth="10"
            className="stroke-brand-100"
          />
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            data-testid="meter-ring"
            className="stroke-accent-500 transition-[stroke-dashoffset] duration-[1600ms] ease-out"
          />
        </svg>
        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center font-display text-3xl font-extrabold text-brand-900"
        >
          {clamped}%
        </span>
      </div>
      <figcaption className="mt-4">
        <span className="block font-display text-lg font-bold text-brand-950">{label}</span>
        {description ? (
          <span className="mt-1 block text-sm text-slate-600">{description}</span>
        ) : null}
      </figcaption>
    </figure>
  );
}

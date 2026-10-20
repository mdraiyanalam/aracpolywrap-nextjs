"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { useIsClient } from "@/hooks/use-is-client";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface CountUpProps {
  value: number;
  suffix?: string;
  durationMs?: number;
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/**
 * Counts from 0 to `value` the first time it scrolls into view.
 * - Server HTML contains the final value, so it works without JavaScript.
 * - Shows the final value immediately when reduced motion is preferred.
 * - Screen readers always get the final value; the animated digits are hidden from them.
 */
export function CountUp({ value, suffix = "", durationMs = 1600 }: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const isClient = useIsClient();
  const reducedMotion = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  const animate = isClient && !reducedMotion;

  useEffect(() => {
    if (!animate || !inView) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      setProgress(t);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animate, inView, durationMs]);

  const shown = animate ? Math.round(value * easeOutCubic(progress)) : value;

  return (
    <span ref={ref}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden="true" className="tabular-nums" data-testid="count-up-display">
        {shown}
        {suffix}
      </span>
    </span>
  );
}

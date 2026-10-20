"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Returns the ID of the section crossing a thin band just above the middle of the viewport
 * ("scroll spy"), or `null`. Only active on the home page, where the sections live.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const idsKey = ids.join(",");

  useEffect(() => {
    const sectionIds = idsKey.split(",");
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const intersecting = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) intersecting.set(entry.target.id, entry.isIntersecting);
        setActive(sectionIds.find((id) => intersecting.get(id)) ?? null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [idsKey, pathname]);

  return pathname === "/" ? active : null;
}

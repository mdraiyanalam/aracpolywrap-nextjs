"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/images/brand/logo.png";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { company } from "@/content/company";
import { primaryNavigation, sectionHref } from "@/content/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/cn";

const DESKTOP_QUERY = "(min-width: 1024px)";
const SECTION_IDS = primaryNavigation.map((item) => item.id);

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const activeSection = useActiveSection(SECTION_IDS);

  // Elevate the header once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape and return focus to the toggle.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Close the mobile menu if the viewport grows to desktop size.
  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white transition-shadow print:hidden",
        scrolled || menuOpen ? "border-slate-200 shadow-sm" : "border-transparent",
      )}
    >
      <Container className="flex h-header items-center justify-between gap-6">
        <Link href="/" aria-label={`${company.name} — home`} className="shrink-0 rounded-md">
          <Image src={logo} alt="" loading="eager" className="h-11 w-auto" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNavigation.map((item) => (
              <li key={item.id}>
                <Link
                  href={sectionHref(item.id)}
                  aria-current={activeSection === item.id ? "true" : undefined}
                  className="relative rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:scale-x-0 after:rounded-full after:bg-accent-500 after:transition-transform hover:bg-brand-50 hover:text-brand-700 aria-[current=true]:text-brand-700 aria-[current=true]:after:scale-x-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden xl:block">
          <ButtonLink href={sectionHref("contact")} size="sm">
            Request a quote
          </ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md text-brand-900 hover:bg-brand-50 lg:hidden"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X aria-hidden="true" className="size-6" />
          ) : (
            <Menu aria-hidden="true" className="size-6" />
          )}
        </button>
      </Container>

      <div id="mobile-menu" hidden={!menuOpen} className="border-t border-slate-200 lg:hidden">
        <Container className="pt-2 pb-6">
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {primaryNavigation.map((item) => (
                <li key={item.id}>
                  <Link
                    href={sectionHref(item.id)}
                    onClick={closeMenu}
                    aria-current={activeSection === item.id ? "true" : undefined}
                    className="block rounded-md border-l-4 border-transparent px-3 py-3 text-base font-semibold text-slate-800 hover:bg-brand-50 hover:text-brand-700 aria-[current=true]:border-accent-500 aria-[current=true]:bg-brand-50 aria-[current=true]:text-brand-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink href={sectionHref("contact")} onClick={closeMenu} className="mt-4 w-full">
            Request a quote
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}

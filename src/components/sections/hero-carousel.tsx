"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import {
  useEffect,
  useReducer,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { HeroSlide } from "@/content/types";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";

export const AUTOPLAY_INTERVAL_MS = 6000;
const SWIPE_THRESHOLD_PX = 50;

interface CarouselState {
  index: number;
  /** Slides whose image may be requested: those shown so far plus the next one. */
  loaded: number[];
}

function carouselReducer(state: CarouselState, action: { to: number; count: number }) {
  const index = ((action.to % action.count) + action.count) % action.count;
  const next = (index + 1) % action.count;
  return { index, loaded: Array.from(new Set([...state.loaded, index, next])) };
}

interface HeroCarouselProps {
  slides: HeroSlide[];
}

/**
 * Accessible, auto-rotating hero carousel following the WAI-ARIA APG carousel pattern:
 * - rotation pauses on hover and stops when keyboard focus enters, or via the pause button;
 * - no autoplay when the visitor prefers reduced motion;
 * - hidden slides are `inert`, so their links cannot be focused;
 * - swipe left/right on touch screens.
 */
export function HeroCarousel({ slides }: HeroCarouselProps) {
  const count = slides.length;
  const [{ index, loaded }, dispatch] = useReducer(carouselReducer, {
    index: 0,
    loaded: count > 1 ? [0, 1] : [0],
  });
  const [stoppedByUser, setStoppedByUser] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const pointerStartX = useRef<number | null>(null);

  /** The visitor's choice (pause button, keyboard focus) — drives the play/pause button. */
  const rotationEnabled = count > 1 && !stoppedByUser && !reducedMotion;
  /** Whether slides are advancing right now (rotation also pauses while hovered). */
  const playing = rotationEnabled && !hovered;
  const goTo = (to: number) => dispatch({ to, count });

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => dispatch({ to: index + 1, count }), AUTOPLAY_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [playing, index, count]);

  const onFocus = (event: FocusEvent<HTMLElement>) => {
    // Keyboard focus entering the carousel stops rotation (WCAG 2.2.2). Mouse clicks do not,
    // and moving focus between controls inside the carousel does not stop it again.
    const enteredFromOutside = !event.currentTarget.contains(event.relatedTarget);
    if (enteredFromOutside && event.target.matches(":focus-visible")) setStoppedByUser(true);
  };

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") pointerStartX.current = event.clientX;
  };

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    const start = pointerStartX.current;
    pointerStartX.current = null;
    if (start === null) return;
    const delta = event.clientX - start;
    if (Math.abs(delta) >= SWIPE_THRESHOLD_PX) goTo(index + (delta < 0 ? 1 : -1));
  };

  return (
    <section
      id="home"
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative isolate touch-pan-y overflow-hidden bg-brand-950"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={onFocus}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div
        aria-live={playing ? "off" : "polite"}
        className="relative h-[calc(100svh-var(--spacing-header))] max-h-[46rem] min-h-[34rem]"
      >
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!active}
              inert={!active}
              data-active={active}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-out",
                active ? "opacity-100" : "opacity-0",
              )}
            >
              {loaded.includes(i) ? (
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  sizes="100vw"
                  preload={i === 0}
                  className="object-cover"
                />
              ) : null}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-brand-950/95 via-brand-950/70 to-brand-950/30 md:bg-linear-to-r md:from-brand-950/90 md:via-brand-950/60 md:to-brand-950/10"
              />
              <Container className="relative flex h-full items-end pb-28 md:items-center md:pb-0">
                <div className="max-w-2xl text-white">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.2em] text-accent-300 uppercase">
                    <span aria-hidden="true" className="h-0.5 w-8 bg-accent-500" />
                    {slide.eyebrow}
                  </p>
                  <h2 className="mt-4 text-4xl leading-tight font-extrabold text-white sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h2>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
                    {slide.description}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <ButtonLink href={slide.primaryAction.href}>
                      {slide.primaryAction.label}
                    </ButtonLink>
                    {slide.secondaryAction ? (
                      <ButtonLink href={slide.secondaryAction.href} variant="outline-light">
                        {slide.secondaryAction.label}
                      </ButtonLink>
                    ) : null}
                  </div>
                </div>
              </Container>
            </div>
          );
        })}
      </div>

      {count > 1 ? (
        <div className="absolute inset-x-0 bottom-0 z-10 pb-8">
          <Container className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Show slide ${i + 1}: ${slide.eyebrow}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => goTo(i)}
                  className="group grid h-8 place-items-center"
                >
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-all",
                      i === index ? "w-10 bg-accent-500" : "w-5 bg-white/50 group-hover:bg-white",
                    )}
                  />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {reducedMotion ? null : (
                <CarouselButton
                  label={
                    rotationEnabled ? "Pause automatic slide show" : "Start automatic slide show"
                  }
                  onClick={() => setStoppedByUser(rotationEnabled)}
                >
                  {rotationEnabled ? <Pause className="size-5" /> : <Play className="size-5" />}
                </CarouselButton>
              )}
              <CarouselButton label="Previous slide" onClick={() => goTo(index - 1)}>
                <ChevronLeft className="size-5" />
              </CarouselButton>
              <CarouselButton label="Next slide" onClick={() => goTo(index + 1)}>
                <ChevronRight className="size-5" />
              </CarouselButton>
            </div>
          </Container>
        </div>
      ) : null}
    </section>
  );
}

interface CarouselButtonProps {
  label: string;
  onClick: () => void;
  children: ReactNode;
}

function CarouselButton({ label, onClick, children }: CarouselButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full bg-brand-950/40 text-white ring-1 ring-white/30 transition hover:bg-white/20"
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}

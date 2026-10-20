import { act, fireEvent, render, screen } from "@testing-library/react";
import { heroSlides } from "@/content/hero";
import { setReducedMotion } from "@/test/match-media";
import { AUTOPLAY_INTERVAL_MS, HeroCarousel } from "./hero-carousel";

const slideGroups = () => screen.getAllByRole("group", { hidden: true });
const activeIndex = () => slideGroups().findIndex((el) => el.dataset.active === "true");

describe("HeroCarousel", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setReducedMotion(false);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders every slide as a labelled group, with only the first one active", () => {
    render(<HeroCarousel slides={heroSlides} />);

    expect(screen.getByRole("region", { name: "Highlights" })).toHaveAttribute(
      "aria-roledescription",
      "carousel",
    );
    expect(slideGroups()).toHaveLength(heroSlides.length);
    expect(slideGroups()[0]).toHaveAttribute("aria-label", `1 of ${heroSlides.length}`);
    expect(activeIndex()).toBe(0);
  });

  it("makes hidden slides inert so their links cannot be focused", () => {
    render(<HeroCarousel slides={heroSlides} />);
    const [first, second] = slideGroups();

    expect(first).not.toHaveAttribute("inert");
    expect(second).toHaveAttribute("inert");
    expect(second).toHaveAttribute("aria-hidden", "true");
  });

  it("moves with the next and previous buttons, wrapping around", () => {
    render(<HeroCarousel slides={heroSlides} />);

    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(activeIndex()).toBe(1);

    fireEvent.click(screen.getByRole("button", { name: "Previous slide" }));
    fireEvent.click(screen.getByRole("button", { name: "Previous slide" }));
    expect(activeIndex()).toBe(heroSlides.length - 1);
  });

  it("jumps to a slide from its indicator and marks it current", () => {
    render(<HeroCarousel slides={heroSlides} />);
    const indicator = screen.getByRole("button", { name: /Show slide 3/ });

    fireEvent.click(indicator);

    expect(activeIndex()).toBe(2);
    expect(indicator).toHaveAttribute("aria-current", "true");
  });

  it("advances automatically and stops when paused", () => {
    render(<HeroCarousel slides={heroSlides} />);

    act(() => vi.advanceTimersByTime(AUTOPLAY_INTERVAL_MS));
    expect(activeIndex()).toBe(1);

    fireEvent.click(screen.getByRole("button", { name: "Pause automatic slide show" }));
    act(() => vi.advanceTimersByTime(AUTOPLAY_INTERVAL_MS * 3));
    expect(activeIndex()).toBe(1);
    expect(screen.getByRole("button", { name: "Start automatic slide show" })).toBeInTheDocument();
  });

  it("pauses while hovered", () => {
    render(<HeroCarousel slides={heroSlides} />);
    const region = screen.getByRole("region", { name: "Highlights" });

    fireEvent.mouseEnter(region);
    act(() => vi.advanceTimersByTime(AUTOPLAY_INTERVAL_MS * 2));
    expect(activeIndex()).toBe(0);

    fireEvent.mouseLeave(region);
    act(() => vi.advanceTimersByTime(AUTOPLAY_INTERVAL_MS));
    expect(activeIndex()).toBe(1);
  });

  it("does not autoplay when the visitor prefers reduced motion", () => {
    setReducedMotion(true);
    render(<HeroCarousel slides={heroSlides} />);

    act(() => vi.advanceTimersByTime(AUTOPLAY_INTERVAL_MS * 3));
    expect(activeIndex()).toBe(0);
    expect(screen.queryByRole("button", { name: /automatic slide show/ })).not.toBeInTheDocument();
  });

  it("changes slide on a horizontal swipe", () => {
    render(<HeroCarousel slides={heroSlides} />);
    const region = screen.getByRole("region", { name: "Highlights" });

    fireEvent.pointerDown(region, { pointerType: "touch", clientX: 300 });
    fireEvent.pointerUp(region, { pointerType: "touch", clientX: 100 });
    expect(activeIndex()).toBe(1);

    fireEvent.pointerDown(region, { pointerType: "touch", clientX: 100 });
    fireEvent.pointerUp(region, { pointerType: "touch", clientX: 300 });
    expect(activeIndex()).toBe(0);
  });

  it("only requests images for the current and next slide", () => {
    render(<HeroCarousel slides={heroSlides} />);
    expect(screen.getAllByRole("img", { hidden: true })).toHaveLength(2);
  });
});

import { act, render, screen } from "@testing-library/react";
import { triggerIntersection } from "@/test/intersection-observer";
import { setReducedMotion } from "@/test/match-media";
import { CountUp } from "./count-up";

const display = () => screen.getByTestId("count-up-display");

describe("CountUp", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame", "performance"] });
    setReducedMotion(false);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("always exposes the final value to assistive technology", () => {
    render(<CountUp value={287} suffix="+" />);
    expect(screen.getByText("287+")).toHaveClass("sr-only");
    expect(display()).toHaveAttribute("aria-hidden", "true");
  });

  it("waits until it is in view, then counts up to the final value", () => {
    render(<CountUp value={100} suffix="+" durationMs={1000} />);
    expect(display()).toHaveTextContent("0+");

    act(() => triggerIntersection(display().parentElement!, true));
    act(() => vi.advanceTimersByTime(500));
    const midway = Number.parseInt(display().textContent ?? "", 10);
    expect(midway).toBeGreaterThan(0);
    expect(midway).toBeLessThan(100);

    act(() => vi.advanceTimersByTime(600));
    expect(display()).toHaveTextContent("100+");
  });

  it("shows the final value immediately when reduced motion is preferred", () => {
    setReducedMotion(true);
    render(<CountUp value={12} suffix="+" />);
    expect(display()).toHaveTextContent("12+");
  });
});

import { act, render, screen } from "@testing-library/react";
import { triggerIntersection } from "@/test/intersection-observer";
import { setReducedMotion } from "@/test/match-media";
import { CircularMeter } from "./circular-meter";

const CIRCUMFERENCE = 2 * Math.PI * 52;
const ringOffset = () => Number(screen.getByTestId("meter-ring").getAttribute("stroke-dashoffset"));

describe("CircularMeter", () => {
  beforeEach(() => setReducedMotion(false));

  it("exposes its value as an accessible meter", () => {
    render(<CircularMeter value={95} label="On-time delivery" />);
    const meter = screen.getByRole("meter", { name: "On-time delivery" });
    expect(meter).toHaveAttribute("aria-valuenow", "95");
    expect(meter).toHaveAttribute("aria-valuemin", "0");
    expect(meter).toHaveAttribute("aria-valuemax", "100");
    expect(meter).toHaveAttribute("aria-valuetext", "95%");
  });

  it("starts empty and fills to its value once in view", () => {
    render(<CircularMeter value={50} label="Half" />);
    expect(ringOffset()).toBeCloseTo(CIRCUMFERENCE);

    act(() => triggerIntersection(screen.getByRole("meter"), true));
    expect(ringOffset()).toBeCloseTo(CIRCUMFERENCE / 2);
  });

  it("shows the final state immediately with reduced motion", () => {
    setReducedMotion(true);
    render(<CircularMeter value={25} label="Quarter" />);
    expect(ringOffset()).toBeCloseTo(CIRCUMFERENCE * 0.75);
  });

  it("clamps values outside 0–100", () => {
    render(<CircularMeter value={140} label="Over" />);
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "100");
  });
});

import { act, fireEvent, render, screen } from "@testing-library/react";
import { setReducedMotion } from "@/test/match-media";
import { BackToTop } from "./back-to-top";

function scrollWindowTo(y: number) {
  Object.defineProperty(window, "scrollY", { configurable: true, value: y });
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

describe("BackToTop", () => {
  beforeEach(() => {
    setReducedMotion(false);
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 800 });
    scrollWindowTo(0);
  });

  it("stays hidden and unfocusable near the top of the page", () => {
    render(<BackToTop />);
    expect(screen.getByRole("button", { name: "Back to top", hidden: true })).toHaveAttribute(
      "inert",
    );
  });

  it("appears after scrolling past one screen height", () => {
    render(<BackToTop />);
    scrollWindowTo(1200);
    expect(screen.getByRole("button", { name: "Back to top" })).not.toHaveAttribute("inert");
  });

  it("scrolls smoothly to the top", () => {
    render(<BackToTop />);
    scrollWindowTo(1200);
    fireEvent.click(screen.getByRole("button", { name: "Back to top" }), { detail: 1 });
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("jumps instantly when reduced motion is preferred", () => {
    setReducedMotion(true);
    render(<BackToTop />);
    scrollWindowTo(1200);
    fireEvent.click(screen.getByRole("button", { name: "Back to top" }), { detail: 1 });
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
  });

  it("moves keyboard focus to the top of the page", () => {
    render(
      <>
        <a href="#main">Skip to main content</a>
        <BackToTop />
      </>,
    );
    scrollWindowTo(1200);
    fireEvent.click(screen.getByRole("button", { name: "Back to top" }), { detail: 0 });
    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveFocus();
  });
});

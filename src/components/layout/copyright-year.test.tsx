import { render } from "@testing-library/react";
import { CopyrightYears } from "./copyright-year";

describe("CopyrightYears", () => {
  afterEach(() => vi.useRealTimers());

  it("shows a range up to the visitor's current year", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2031-03-01"));
    const { container } = render(<CopyrightYears since={2024} renderedYear={2026} />);
    expect(container).toHaveTextContent("2024–2031");
  });

  it("shows a single year in the first year of publication", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2024-06-01"));
    const { container } = render(<CopyrightYears since={2024} renderedYear={2024} />);
    expect(container.textContent).toBe("2024");
  });
});

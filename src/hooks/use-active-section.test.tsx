import { act, render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { triggerIntersection } from "@/test/intersection-observer";
import { useActiveSection } from "./use-active-section";

const ids = ["home", "products", "contact"] as const;

function Probe() {
  const active = useActiveSection(ids);
  return (
    <>
      {ids.map((id) => (
        <section key={id} id={id} />
      ))}
      <output>{active ?? "none"}</output>
    </>
  );
}

const section = (id: string) => document.getElementById(id)!;

describe("useActiveSection", () => {
  it("reports the section crossing the middle of the viewport", () => {
    render(<Probe />);
    expect(screen.getByRole("status")).toHaveTextContent("none");

    act(() => triggerIntersection(section("products"), true));
    expect(screen.getByRole("status")).toHaveTextContent("products");

    act(() => {
      triggerIntersection(section("products"), false);
      triggerIntersection(section("contact"), true);
    });
    expect(screen.getByRole("status")).toHaveTextContent("contact");
  });

  it("prefers the earlier section when two overlap the band", () => {
    render(<Probe />);
    act(() => {
      triggerIntersection(section("contact"), true);
      triggerIntersection(section("home"), true);
    });
    expect(screen.getByRole("status")).toHaveTextContent("home");
  });

  it("returns null away from the home page", () => {
    vi.mocked(usePathname).mockReturnValue("/catalogue");
    render(<Probe />);
    act(() => triggerIntersection(section("products"), true));
    expect(screen.getByRole("status")).toHaveTextContent("none");
  });
});

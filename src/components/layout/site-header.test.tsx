import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { primaryNavigation } from "@/content/navigation";
import { triggerIntersection } from "@/test/intersection-observer";
import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  it("links every navigation item to its home-page section", () => {
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: "Primary" });

    for (const item of primaryNavigation) {
      expect(within(nav).getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        `/#${item.id}`,
      );
    }
  });

  it("links the logo to the home page", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: /ARAC Polywrap Limited — home/ })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("toggles the mobile menu and reflects the state in aria-expanded", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    const toggle = screen.getByRole("button", { name: "Menu" });
    const menu = document.getElementById("mobile-menu");

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "mobile-menu");
    expect(menu).not.toBeVisible();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(menu).toBeVisible();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the mobile menu with Escape and returns focus to the toggle", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    const toggle = screen.getByRole("button", { name: "Menu" });

    await user.click(toggle);
    const mobileNav = screen.getByRole("navigation", { name: "Mobile" });
    within(mobileNav).getAllByRole("link")[0]?.focus();

    await user.keyboard("{Escape}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });

  it("closes the mobile menu when a link is chosen", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    const toggle = screen.getByRole("button", { name: "Menu" });

    await user.click(toggle);
    const mobileNav = screen.getByRole("navigation", { name: "Mobile" });
    await user.click(within(mobileNav).getByRole("link", { name: "Products" }));

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("marks the link of the section in view as current (scroll spy)", () => {
    render(
      <>
        <SiteHeader />
        {primaryNavigation.map((item) => (
          <section key={item.id} id={item.id} />
        ))}
      </>,
    );
    const nav = screen.getByRole("navigation", { name: "Primary" });

    act(() => triggerIntersection(document.getElementById("services")!, true));

    expect(within(nav).getByRole("link", { name: "Services" })).toHaveAttribute(
      "aria-current",
      "true",
    );
    expect(within(nav).getByRole("link", { name: "Products" })).not.toHaveAttribute("aria-current");
  });
});

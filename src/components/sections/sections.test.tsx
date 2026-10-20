import { render, screen, within } from "@testing-library/react";
import { about } from "@/content/about";
import { services } from "@/content/services";
import { serviceLevels, testimonials } from "@/content/testimonials";
import { AboutSection } from "./about-section";
import { DownloadSection } from "./download-section";
import { ServicesSection } from "./services-section";
import { TestimonialsSection } from "./testimonials-section";

describe("ServicesSection", () => {
  it("is anchored at #services and lists every service", () => {
    render(<ServicesSection />);
    const section = screen.getByRole("region", { name: "Services" });
    expect(section).toHaveAttribute("id", "services");
    for (const service of services) {
      expect(within(section).getByRole("heading", { name: service.title })).toBeInTheDocument();
    }
  });
});

describe("TestimonialsSection", () => {
  it("is anchored at #testimonials", () => {
    render(<TestimonialsSection />);
    expect(screen.getByRole("region", { name: "Testimonials" })).toHaveAttribute(
      "id",
      "testimonials",
    );
  });

  it("shows a circular meter for every service level (legacy request)", () => {
    render(<TestimonialsSection />);
    const meters = screen.getAllByRole("meter");
    expect(meters).toHaveLength(serviceLevels.length);
    serviceLevels.forEach((level, i) => {
      expect(meters[i]).toHaveAccessibleName(level.label);
      expect(meters[i]).toHaveAttribute("aria-valuenow", String(level.value));
    });
  });

  it("shows every quote with its attribution", () => {
    render(<TestimonialsSection />);
    for (const testimonial of testimonials) {
      expect(screen.getByText(testimonial.quote, { exact: false })).toBeInTheDocument();
    }
  });

  it("labels illustrative content visibly so it cannot be mistaken for real quotes", () => {
    render(<TestimonialsSection />);
    const samples = testimonials.filter((t) => t.sample).length;
    expect(screen.queryAllByText("Sample testimonial")).toHaveLength(samples);
  });
});

describe("AboutSection", () => {
  it("is anchored at #about and lists the company values", () => {
    render(<AboutSection />);
    const section = screen.getByRole("region", { name: "About ARAC Polywrap" });
    expect(section).toHaveAttribute("id", "about");
    for (const value of about.values) {
      expect(within(section).getByRole("heading", { name: value.title })).toBeInTheDocument();
    }
  });
});

describe("DownloadSection", () => {
  it("is anchored at #download and links to the printable catalogue", () => {
    render(<DownloadSection />);
    const section = screen.getByRole("region", { name: "Product catalogue" });
    expect(section).toHaveAttribute("id", "download");
    expect(within(section).getByRole("link", { name: "View catalogue" })).toHaveAttribute(
      "href",
      "/catalogue",
    );
  });

  it("offers a pre-filled e-mail to request a data sheet", () => {
    render(<DownloadSection />);
    expect(screen.getByRole("link", { name: "Request a data sheet" })).toHaveAttribute(
      "href",
      expect.stringMatching(/^mailto:.+\?subject=Technical%20data%20sheet%20request$/),
    );
  });
});

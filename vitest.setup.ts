import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import { installIntersectionObserverMock } from "@/test/intersection-observer";
import { installMatchMediaMock } from "@/test/match-media";

installIntersectionObserverMock();
installMatchMediaMock();

// jsdom does not implement scrolling APIs.
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
Element.prototype.scrollIntoView = vi.fn();

// Render next/image as a plain <img> so tests focus on our markup, not the image optimiser.
vi.mock("next/image", async () => {
  const { createElement } = await import("react");
  return {
    default: ({
      src,
      alt,
      fill: _fill,
      preload: _preload,
      placeholder: _placeholder,
      blurDataURL: _blurDataURL,
      quality: _quality,
      ...rest
    }: Record<string, unknown> & { src: string | { src: string }; alt: string }) =>
      createElement("img", { src: typeof src === "string" ? src : src.src, alt, ...rest }),
  };
});

// Unit tests render outside the App Router; default to the home route.
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

afterEach(async () => {
  cleanup();
  vi.clearAllMocks();
  const { usePathname } = await import("next/navigation");
  vi.mocked(usePathname).mockImplementation(() => "/");
});

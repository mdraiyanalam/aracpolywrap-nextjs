/** matchMedia mock for jsdom. Use `setReducedMotion(true)` to emulate `prefers-reduced-motion`. */
let reducedMotion = false;

export function setReducedMotion(value: boolean) {
  reducedMotion = value;
}

export function installMatchMediaMock() {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query: string): MediaQueryList => ({
      media: query,
      matches: query.includes("prefers-reduced-motion: reduce") ? reducedMotion : false,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
}

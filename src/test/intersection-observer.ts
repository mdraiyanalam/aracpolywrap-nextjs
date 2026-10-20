/**
 * Minimal IntersectionObserver mock for jsdom.
 * Tests call `triggerIntersection(element, true)` to simulate an element scrolling into view.
 */
type Entry = { callback: IntersectionObserverCallback; observer: IntersectionObserver };

const observed = new Map<Element, Set<Entry>>();

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly thresholds = [0];
  readonly scrollMargin = "0px";
  private readonly entry: Entry;

  constructor(callback: IntersectionObserverCallback) {
    this.entry = { callback, observer: this };
  }

  observe(target: Element) {
    if (!observed.has(target)) observed.set(target, new Set());
    observed.get(target)!.add(this.entry);
  }

  unobserve(target: Element) {
    observed.get(target)?.delete(this.entry);
  }

  disconnect() {
    for (const entries of observed.values()) entries.delete(this.entry);
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

export function installIntersectionObserverMock() {
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
}

export function triggerIntersection(target: Element, isIntersecting: boolean) {
  for (const { callback, observer } of observed.get(target) ?? []) {
    const rect = target.getBoundingClientRect();
    callback(
      [
        {
          target,
          isIntersecting,
          intersectionRatio: isIntersecting ? 1 : 0,
          boundingClientRect: rect,
          intersectionRect: rect,
          rootBounds: null,
          time: Date.now(),
        },
      ],
      observer,
    );
  }
}

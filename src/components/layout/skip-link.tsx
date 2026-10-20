/** First focusable element on every page; lets keyboard users jump past the header. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-brand-900 focus:shadow-lg"
    >
      Skip to main content
    </a>
  );
}

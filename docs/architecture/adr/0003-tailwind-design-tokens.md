# 0003. Tailwind CSS with brand design tokens instead of Bootstrap

- **Status:** Accepted
- **Date:** 2026-10-19
- **Story:** APW-010

## Context

The legacy app loaded Bootstrap 4 from a CDN, a vendored Bootstrap 5 copy and react-bootstrap at
the same time, referenced a template's `gtco-*` classes without its stylesheet, and had no colour
scheme (a `work_left.txt` item).

## Decision

Use **Tailwind CSS 4** (the `create-next-app` default) with brand tokens defined once in
`src/app/globals.css` under `@theme`:

- `brand-50…950`: a navy scale built around the logo navy `#2E3192` (`brand-700`).
- `accent-50…950`: a red scale built around the logo red `#ED1C24` (`accent-500`).
- `--spacing-header`: the sticky header height, shared by layout and scroll offsets.

White text uses `accent-600` (5.5:1 contrast) rather than the logo red (4.4:1, which fails WCAG AA
for body text).

## Consequences

- One styling system, no unused CSS shipped, no CDN dependency.
- Colours are referenced by meaning (`text-brand-700`), so a rebrand is a token change.
- Utility classes can conflict (`hidden` vs `inline-flex`); see the Sprint 1 retrospective and the
  convention in CONTRIBUTING.md.

## Alternatives considered

| Option                       | Why not                                                           |
| ---------------------------- | ----------------------------------------------------------------- |
| Keep Bootstrap 5             | Heavy, generic look, fights custom design; jQuery-era patterns    |
| CSS Modules only             | More bespoke CSS to maintain; no shared scale for spacing/colour  |
| Component library (MUI etc.) | Large runtime, opinionated look, unnecessary for a marketing site |

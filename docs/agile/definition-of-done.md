# Definition of Done (DoD)

A story is **Done** only when every item below holds. The pull-request template repeats this
checklist so it is checked on every change.

## Code

- [ ] All acceptance criteria are met and demonstrated
- [ ] Code follows the conventions in [CONTRIBUTING.md](../../CONTRIBUTING.md)
- [ ] `npm run lint`, `npm run typecheck` and `npm run format:check` pass with zero errors
- [ ] No `console.log`, commented-out code or unexplained `TODO`s

## Tests

- [ ] Unit tests cover the new logic and components (`npm test`)
- [ ] User-visible behaviour is covered by a Playwright test (`npm run test:e2e`)
- [ ] The axe accessibility scan reports no violations for affected pages
- [ ] CI is green on the pull request

## Quality

- [ ] Checked at 360 px, 768 px, 1024 px and 1440 px viewport widths
- [ ] Fully usable with the keyboard alone; visible focus indicator throughout
- [ ] Respects `prefers-reduced-motion` for any animation
- [ ] Images use `next/image` with meaningful `alt` text (or `alt=""` when decorative)

## Documentation and release

- [ ] README and `docs/` updated where behaviour, configuration or architecture changed
- [ ] `CHANGELOG.md` has an entry under **[Unreleased]**
- [ ] Commit messages follow Conventional Commits and reference the story (`Refs: APW-###`)
- [ ] Reviewed and approved by at least one other person (or the PO for content changes)
- [ ] The Product Owner has accepted the story in the sprint review

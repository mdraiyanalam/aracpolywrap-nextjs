# Sprint 4 — Free hosting on GitHub Pages (in progress)

| Field            | Value                                                                               |
| ---------------- | ----------------------------------------------------------------------------------- |
| Sprint goal      | The site can be hosted for free on GitHub Pages, deployed and tested automatically. |
| Duration         | 1 week                                                                              |
| Release tag      | `v1.1.0` (planned)                                                                  |
| Committed        | 1 story / 5 points                                                                  |
| Completed so far | 2 stories / 6 points (1 bug found and fixed mid-sprint)                             |

## Sprint backlog

| ID      | Story                                                         | Pts | Status |
| ------- | ------------------------------------------------------------- | --: | ------ |
| APW-047 | Host the site on GitHub Pages with automatic deployment       |   5 | Done   |
| APW-048 | Fix: catalogue page lost the share image _(found mid-sprint)_ |   1 | Done   |

## Progress notes

- Next.js 16.4 cannot export metadata routes while Cache Components is on. Decision recorded in
  [ADR 0009](../../architecture/adr/0009-static-export-for-github-pages.md): Cache Components off,
  two build targets from one code base.
- Testing the export under a GitHub-Pages-style server found that menu links stopped scrolling at
  `/<repo>/` (trailing slash). Fixed with `trailingSlash: true` for the static build; covered by
  the static E2E run.
- Verified locally: 68 unit tests; E2E 59 passed (server) and 55 passed (static export); all 30
  internal URLs resolve under `/aracpolywrap/`; no console errors or CSP violations.
- **Remaining:** first real deployment on GitHub (needs the repository pushed and Pages enabled),
  then the sprint review and the `v1.1.0` release.

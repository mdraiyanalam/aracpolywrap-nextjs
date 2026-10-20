# 0001. Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-10-19
- **Story:** APW-006

## Context

The legacy prototype carried no record of why things were built the way they were (three CSS
systems, jQuery loaded but unused). New contributors need the reasoning, not just the code.

## Decision

Record significant decisions as lightweight ADRs in `docs/architecture/adr/`, following
[Michael Nygard's format](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).

## Consequences

- Decisions are reviewable in pull requests like code.
- A small overhead per significant decision; trivial choices are not recorded.

# Contributing

Thank you for helping improve the ARAC Polywrap website. This guide explains how work flows from
the backlog to production. Everyone taking part agrees to the [Code of Conduct](CODE_OF_CONDUCT.md).

## Contents

1. [Ground rules](#ground-rules)
2. [Workflow](#workflow)
3. [Branches](#branches)
4. [Commit messages](#commit-messages)
5. [Pull requests and reviews](#pull-requests-and-reviews)
6. [Coding conventions](#coding-conventions)
7. [Testing expectations](#testing-expectations)
8. [Documentation expectations](#documentation-expectations)
9. [Reporting bugs and proposing features](#reporting-bugs-and-proposing-features)

## Ground rules

- `master` is always releasable. Never push to it directly; every change arrives by pull request
  with green CI.
- Work comes from the [product backlog](docs/agile/product-backlog.md). If something is not there,
  open a user-story issue first so the Product Owner can prioritise it.
- Business content (copy, figures, contact details) changes need Product Owner approval.

## Workflow

1. **Pick** a story in the _Ready_ column (it meets the [Definition of Ready](docs/agile/definition-of-ready.md)).
2. **Branch** from an up-to-date `master` (see [naming](#branches)).
3. **Build** in small commits. Run `npm run dev` while you work.
4. **Verify** locally:

   ```bash
   npm run validate     # lint, typecheck, format check, unit tests
   npm run test:e2e     # production build + Playwright (user-facing changes)
   ```

5. **Open a pull request** using the template. Tick the [Definition of Done](docs/agile/definition-of-done.md) checklist honestly.
6. **Review**: at least one approval, plus the Product Owner for content changes.
7. **Merge** with _Squash and merge_ (title = Conventional Commit summary), then delete the branch.

## Branches

```text
<type>/<story-id>-<short-description>
```

| Type     | Use for                            | Example                       |
| -------- | ---------------------------------- | ----------------------------- |
| `feat/`  | New user-facing behaviour          | `feat/APW-050-enquiry-form`   |
| `fix/`   | Bug fixes                          | `fix/APW-061-menu-focus-trap` |
| `docs/`  | Documentation only                 | `docs/deployment-guide-cdn`   |
| `chore/` | Tooling, dependencies, refactoring | `chore/upgrade-next-16-5`     |

## Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). commitlint enforces
the format in a git hook.

```text
<type>(<optional scope>): <imperative summary, lower case, no full stop>

<optional body: what and why, wrapped at 100 characters>

Refs: APW-011
```

- **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- **Scopes** used so far: `nav`, `hero`, `products`, `stats`, `services`, `testimonials`, `about`,
  `contact`, `catalogue`, `footer`, `layout`, `brand`, `seo`, `a11y`, `security`, `docker`,
  `assets`, `tooling`, `release`, `agile`.
- **Story reference:** add `Refs: APW-###` in the footer so `git log --grep APW-###` finds the work.
- **Breaking changes:** add `!` after the type and a `BREAKING CHANGE:` footer.

## Pull requests and reviews

- Keep PRs small: one story, or part of one. Over about 400 changed lines, consider splitting.
- Include screenshots (desktop and mobile) for visual changes.
- Reviewers check correctness, accessibility, test coverage, naming and documentation, and that
  no business copy is hard-coded in components.
- Resolve every conversation before merging. Prefer suggestions over vague comments.

## Coding conventions

**General**

- TypeScript `strict` everywhere; avoid `any` and non-null assertions (`!`) outside tests.
- File names are `kebab-case`; React components are `PascalCase` named exports.
- Prefer **Server Components**. Add `"use client"` only for state, effects or browser APIs, and keep
  client components small (see the [architecture overview](docs/architecture/overview.md#server-and-client-components)).
- Import with the `@/` alias (`@/components/ui/container`), not long relative paths.

**Content**

- Business copy, figures and links live in `src/content/` as typed data. Components only read them.
- Mark any value that is not yet approved with a trailing `// @placeholder` comment and add a row
  to the [content inventory](docs/content/content-inventory.md).

**Styling**

- Tailwind utility classes; brand colours via tokens (`brand-*`, `accent-*`), never raw hex codes.
- Use `accent-600` or darker behind white text (contrast).
- Do not override a component's `display` utility from outside (`hidden` + `inline-flex` conflict);
  wrap it in an element that controls visibility instead.
- Every animation must respect `prefers-reduced-motion`.

**Accessibility**

- Semantic HTML first; ARIA only where HTML cannot express the meaning.
- Every interactive element is reachable and operable by keyboard with a visible focus style.
- Images: meaningful `alt`, or `alt=""` for decoration. Icons next to text are `aria-hidden`.

**Images**

- Optimise and register new images as described in the [asset register](docs/content/asset-register.md).
- Use `next/image` with a static import so dimensions and blur placeholders are automatic.

## Testing expectations

| Change                         | Required tests                                                            |
| ------------------------------ | ------------------------------------------------------------------------- |
| New or changed component logic | Vitest + Testing Library test next to the component (`*.test.tsx`)        |
| New user-visible behaviour     | Playwright test in `e2e/`                                                 |
| New page                       | Add it to the axe scan in `e2e/accessibility.spec.ts` and to `sitemap.ts` |
| Content model change           | Update `src/content/content.test.ts` invariants                           |

See the [testing guide](docs/guides/testing.md) for patterns and helpers.

## Documentation expectations

- Add an entry under **[Unreleased]** in [CHANGELOG.md](CHANGELOG.md).
- Update the README or `docs/` when behaviour, configuration or architecture changes.
- Record significant technical decisions as an [ADR](docs/architecture/adr/README.md).

## Reporting bugs and proposing features

Use the GitHub issue templates: **Bug report** or **User story**. For security issues follow
[SECURITY.md](SECURITY.md) instead.

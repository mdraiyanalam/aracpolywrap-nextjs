# Development guide

## Prerequisites

| Tool    | Version         | Notes                                    |
| ------- | --------------- | ---------------------------------------- |
| Node.js | 22 LTS (≥ 20.9) | `nvm use` reads `.nvmrc`                 |
| npm     | 10+             | Use `npm ci` for reproducible installs   |
| Git     | 2.40+           | Hooks are installed by husky on `npm ci` |
| Docker  | 24+ (optional)  | Only for container builds                |

Recommended VS Code extensions are listed in `.vscode/extensions.json` (ESLint, Prettier,
Tailwind CSS IntelliSense, Playwright, Vitest). Format-on-save is configured in
`.vscode/settings.json`.

## First run

```bash
npm ci
cp .env.example .env.local    # optional
npm run dev                   # http://localhost:3000
```

## Everyday commands

```bash
npm run dev             # develop with hot reload
npm run validate        # before pushing: lint + typecheck + format + unit tests
npm run test:watch      # unit tests in watch mode while coding
npm run test:e2e        # production build + Playwright
```

## Git hooks

Installed automatically by `npm ci` (`prepare` script):

| Hook         | Runs                                                       |
| ------------ | ---------------------------------------------------------- |
| `pre-commit` | `lint-staged`: ESLint `--fix` and Prettier on staged files |
| `commit-msg` | `commitlint`: enforces Conventional Commits                |

## Common tasks

### Add a home-page section

1. Add the section ID to `SectionId` in `src/content/types.ts`.
2. Add its heading and intro to `src/content/sections.ts`, and any data to a new content module.
3. Create `src/components/sections/<name>-section.tsx` as a Server Component:

   ```tsx
   <section id="<id>" aria-labelledby="<id>-heading" className="py-20 sm:py-28">
     <Container>
       <SectionHeading id="<id>-heading" {...sectionCopy.<id>} />
       …
     </Container>
   </section>
   ```

4. Render it in `src/app/page.tsx` in page order.
5. To show it in the menu, add it to `primaryNavigation` in `src/content/navigation.ts`.
6. Add the ID to `sectionIds` in `src/content/content.test.ts`, write a unit test, and extend the
   E2E tests.

### Add a page

1. Create `src/app/<route>/page.tsx` exporting `metadata` (title, description,
   `alternates.canonical`).
2. Add it to `src/app/sitemap.ts`.
3. Add it to the axe loop in `e2e/accessibility.spec.ts`.

### Add an image

Follow the checklist in the [asset register](../content/asset-register.md#adding-a-new-image).

### Use a new Next.js API

Next.js 16.4 differs from older versions. Read the matching page in
`node_modules/next/dist/docs/` first (see `AGENTS.md`).

## Debugging tips

| Symptom                                           | Likely cause / fix                                                                                              |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Static export: page has no styles on GitHub Pages | Wrong base path; build with `npm run build:static -- --base-path /<repository>` or deploy via the workflow      |
| Static export fails on a new route or API         | Static hosts cannot run server code (no headers, rewrites, Server Actions, per-request rendering); see ADR 0009 |
| An element shows on mobile despite `hidden`       | Utility conflict with the component's own `display` class; wrap it instead                                      |
| Section scrolls under the header                  | The section must be a direct target of `/#id`; `scroll-padding-top` handles the offset                          |
| `next start` warns about standalone               | Use `npm start` (runs `.next/standalone/server.js`)                                                             |
| Fonts fail to download during build               | The build needs internet access to Google Fonts once; behind a proxy set `HTTPS_PROXY`                          |

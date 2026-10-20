# Release checklist

Use this list for every production release. Copy it into the release pull request or issue and
tick each item. A release is a tagged commit on `master` (`vMAJOR.MINOR.PATCH`).

## 1. Readiness

- [ ] All stories in the release meet the [Definition of Done](../agile/definition-of-done.md) and
      were accepted in the sprint review
- [ ] CI is green on `master` (quality, e2e, docker jobs)
- [ ] `npm audit --omit=dev` reports no vulnerabilities in production dependencies
- [ ] **`npm run content:check` passes** (no `@placeholder` content), required for production
- [ ] Image licences confirmed in the [asset register](../content/asset-register.md)

## 2. Manual quality pass (about 20 minutes)

Run against a production build (`npm run build && npm start`) or the preview deployment.

- [ ] Widths 360 px, 768 px, 1024 px and 1440 px: no overflow, menu fits, images sharp
- [ ] Keyboard only: skip link → menu → every control; visible focus; Esc closes the menu
- [ ] Screen reader spot check (VoiceOver or NVDA): headings list, carousel controls, meters
- [ ] 200% browser zoom: content reflows without loss
- [ ] OS "reduce motion" on: no autoplay, counters and rings show final values
- [ ] Print preview of `/catalogue`: letterhead, no site chrome, products not split across pages
- [ ] Lighthouse (mobile) on `/`: Performance ≥ 90, Accessibility, Best Practices and SEO = 100

## 3. Prepare the release

- [ ] Move **[Unreleased]** entries in `CHANGELOG.md` under the new version with today's date and
      update the compare links
- [ ] Bump `version` in `package.json` (`npm version <major|minor|patch> --no-git-tag-version`)
- [ ] Update the backlog statuses, the [release plan](../agile/release-plan.md) and the sprint report
- [ ] Merge the release PR (`chore(release): x.y.z`)
- [ ] Tag the merge commit: `git tag -a vX.Y.Z -m "<sprint name>" && git push origin vX.Y.Z`

## 4. Deploy

- [ ] Build with the production `NEXT_PUBLIC_SITE_URL`
- [ ] Deploy (see the [deployment guide](../guides/deployment.md)) and keep the previous version
      available for rollback
- [ ] Run the post-deployment smoke test from the deployment guide
- [ ] Submit `sitemap.xml` in Google Search Console (first release, or when pages change)
- [ ] Check the share preview (for example, Facebook Sharing Debugger) after copy or image changes

## 5. After the release

- [ ] Announce the release with a link to the changelog
- [ ] Watch error logs and uptime for 24 hours
- [ ] If anything is wrong, roll back to the previous tag, then fix forward

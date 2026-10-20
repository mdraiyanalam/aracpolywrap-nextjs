# GitHub: push the code and host the website

This guide covers two things, step by step:

1. [Putting the project on GitHub](#part-1--put-the-project-on-github), starting from `git init`.
2. [Hosting the website for free on GitHub Pages](#part-2--host-the-website-on-github-pages),
   with automatic deployment on every push.

It ends with [an alternative host](#part-3--alternative-vercel-connected-to-github) for when
you need features GitHub Pages cannot provide, and [troubleshooting](#troubleshooting).

---

## Part 1 — Put the project on GitHub

### 1.1 One-time setup on your computer

1. **Install Git**: <https://git-scm.com/downloads>. Check with `git --version`.
2. **Install Node.js 22**: <https://nodejs.org> (needed to run the site locally). Check with
   `node --version`.
3. **Tell Git who you are** (once per computer):

   ```bash
   git config --global user.name "Md Raiyan Alam"
   git config --global user.email "you@example.com"   # the e-mail on your GitHub account
   git config --global init.defaultBranch main
   ```

4. **Let Git log in to GitHub.** GitHub does not accept your account password for `git push`.
   Pick one option:

   | Option                   | How                                                                                                                                                                                          |
   | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | **GitHub CLI** (easiest) | Install from <https://cli.github.com>, run `gh auth login`, choose _GitHub.com → HTTPS → Login with a web browser_.                                                                          |
   | Personal access token    | GitHub → Settings → Developer settings → Personal access tokens → _Fine-grained_ → access to the repository with **Contents: Read and write**. Paste the token when Git asks for a password. |
   | SSH key                  | `ssh-keygen -t ed25519 -C "you@example.com"`, then add `~/.ssh/id_ed25519.pub` under GitHub → Settings → SSH and GPG keys. Use the `git@github.com:…` remote URL.                            |

   On Windows, Git Credential Manager (bundled with Git for Windows) opens a browser login the
   first time you push, so no extra setup is usually needed.

### 1.2 Create an empty repository on GitHub

**In the browser:**

1. Go to <https://github.com/new>.
2. **Repository name**: e.g. `aracpolywrap-website`.
3. **Visibility**: _Public_ (GitHub Pages is free for public repositories; private repositories
   need a paid plan for Pages).
4. **Do not** tick _Add a README_, _.gitignore_ or _license_. The project already has them, and
   an empty repository avoids a merge conflict on the first push.
5. Click **Create repository** and copy its URL, e.g.
   `https://github.com/mdraiyanalam/aracpolywrap-website.git`.

**Or with the GitHub CLI** (creates the repository and pushes in one go; see step 1.3 first):

```bash
gh repo create aracpolywrap-website --public --source=. --remote=origin --push
```

### 1.3 Push the code

Unzip the project and open a terminal **inside the `aracpolywrap` folder**. Then choose A or B.

> The delivered project **already is a Git repository**. It contains the original Create React
> App commits, the four sprint histories and tags `v0.1.0` … `v1.0.0`. Option A keeps that
> history (recommended); option B starts again from `git init` as if the project were brand new.

#### Option A — keep the full history (recommended)

```bash
# 1. See where you are
git status                 # should say: On branch nextjs-rewrite, nothing to commit
git remote -v              # shows the old origin (github.com/mdraiyanalam/aracpolywrap)

# 2. Make the Next.js branch your main branch
git branch -M main

# 3. Point "origin" at the new, empty repository
git remote set-url origin https://github.com/mdraiyanalam/aracpolywrap-website.git

# 4. Push the branch and all release tags
git push -u origin main
git push origin --tags
```

#### Option B — start fresh from `git init`

macOS / Linux / Git Bash:

```bash
rm -rf .git                # removes the existing history (irreversible for this copy)
```

Windows PowerShell:

```powershell
Remove-Item -Recurse -Force .git
```

Then, on any system:

```bash
git init -b main                                   # 1. create a new repository on branch "main"
git add .                                          # 2. stage every file (.gitignore skips node_modules, .next, out …)
git status                                         #    check: no node_modules/ or .env.local listed
git commit -m "feat: initial Next.js website"      # 3. first commit
git remote add origin https://github.com/mdraiyanalam/aracpolywrap-website.git   # 4. link GitHub
git push -u origin main                            # 5. upload
```

> **Commit messages must follow Conventional Commits** (`feat: …`, `fix: …`, `docs: …`). After
> `npm ci` installs the Git hooks, a message like `Initial commit` is rejected by commitlint. See
> [CONTRIBUTING.md](../../CONTRIBUTING.md#commit-messages).

#### Option C — update the existing `mdraiyanalam/aracpolywrap` repository instead

Keep the old repository and propose the rewrite as a pull request:

```bash
git push -u origin nextjs-rewrite      # origin already points at mdraiyanalam/aracpolywrap
git push origin --tags
```

Then on GitHub: **Pull requests → New pull request → base: `master` ← compare: `nextjs-rewrite`
→ Create pull request**. Review it, and merge when CI is green. The site deploys from `master`
once Part 2 is set up.

### 1.4 Check the result

1. Refresh the repository page. You should see the README with the logo and badges.
2. Open the **Actions** tab. The **CI** workflow starts automatically (lint, tests, E2E,
   static-export and Docker jobs). A green tick means the code is healthy.
3. Day-to-day after that:

   ```bash
   git checkout -b feat/APW-050-enquiry-form   # work on a branch
   # …edit files…
   git add .
   git commit -m "feat(contact): add enquiry form"
   git push -u origin feat/APW-050-enquiry-form
   # open a pull request on GitHub, merge when CI is green
   ```

---

## Part 2 — Host the website on GitHub Pages

**Yes, GitHub can host this site for free.** GitHub Pages serves static files (HTML, CSS,
JavaScript, images). The project has a static-export mode for exactly this
([ADR 0009](../architecture/adr/0009-static-export-for-github-pages.md)), and the workflow
[`.github/workflows/deploy-pages.yml`](../../.github/workflows/deploy-pages.yml) builds, tests and
publishes it automatically.

### 2.1 What you get, and the trade-offs

| Feature                                         | GitHub Pages (static export)                                    | Node server / Docker / Vercel |
| ----------------------------------------------- | --------------------------------------------------------------- | ----------------------------- |
| Cost                                            | Free (public repository)                                        | Varies (Vercel hobby is free) |
| HTTPS, global CDN                               | ✅                                                              | ✅                            |
| All pages, catalogue, 404, SEO tags             | ✅                                                              | ✅                            |
| Content Security Policy                         | ⚠️ As a `<meta>` tag (no `frame-ancestors`)                     | ✅ HTTP header                |
| Other security headers (HSTS, X-Frame-Options…) | ❌ GitHub Pages cannot set custom headers                       | ✅                            |
| Image optimisation (AVIF/WebP, resizing)        | ❌ Original JPEGs (pre-optimised, ~1 MB total)                  | ✅                            |
| `robots.txt` honoured by crawlers               | Only with a custom domain (crawlers read it at the domain root) | ✅                            |
| Address                                         | `https://<user>.github.io/<repository>/` or your own domain     | Your own domain               |

For a company brochure site these trade-offs are usually acceptable. If you need the full
security headers, use [Part 3](#part-3--alternative-vercel-connected-to-github) or the Docker
image instead. GitHub's terms say Pages should not be used mainly to run e-commerce or other
commercial transactions; an informational company website is fine.

### 2.2 Try the static build on your computer first (optional)

```bash
npm ci
npm run build:static -- --base-path /aracpolywrap-website   # use your repository name
npm run preview:static -- --base-path /aracpolywrap-website
# open http://localhost:4173/aracpolywrap-website/
```

`preview:static` serves the `out/` folder the same way GitHub Pages does (folder redirects,
`404.html`), so what you see is what will be published.

### 2.3 Turn on GitHub Pages (one time)

1. Open your repository on GitHub → **Settings** → **Pages** (left sidebar, under _Code and
   automation_).
2. Under **Build and deployment → Source**, choose **GitHub Actions**. (Not _Deploy from a
   branch_: the workflow builds the site itself.)
3. Nothing else is needed on this page for now.

### 2.4 Deploy

Deployment runs automatically on every push to `main` (or `master`). To start the first one:

- **Push any commit to `main`**, or
- go to **Actions → Deploy to GitHub Pages → Run workflow → Run workflow**.

Then watch it in the **Actions** tab:

| Step                          | What happens                                                       | Time   |
| ----------------------------- | ------------------------------------------------------------------ | ------ |
| Test the static export        | Builds the site and runs the Playwright + accessibility suite      | ~3 min |
| Read GitHub Pages settings    | Gets your site address and sub-path (e.g. `/aracpolywrap-website`) | 5 s    |
| Build for GitHub Pages        | Rebuilds with that sub-path into `out/`                            | ~1 min |
| Upload site artefact → Deploy | Publishes `out/` to GitHub Pages                                   | ~30 s  |

If any test fails, nothing is deployed; the live site stays on the previous version.

### 2.5 Open the live site

When the run is green, the **deploy** job shows the URL, also listed under **Settings → Pages**:

```text
https://mdraiyanalam.github.io/aracpolywrap-website/
```

Check: the menu scrolls to each section, `/catalogue/` opens, and an unknown address shows the
branded 404 page.

### 2.6 Optional — use your own domain (e.g. `www.aracpolywrap.com`)

1. **Settings → Pages → Custom domain**: enter `www.aracpolywrap.com` → **Save**. (Recommended:
   also verify the domain under your account's _Settings → Pages_ to stop others claiming it.)
2. At your domain registrar's DNS settings, add:

   | Type    | Host / name | Value                                                                                      |
   | ------- | ----------- | ------------------------------------------------------------------------------------------ |
   | `CNAME` | `www`       | `mdraiyanalam.github.io`                                                                   |
   | `A`     | `@` (apex)  | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`                 |
   | `AAAA`  | `@` (apex)  | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |

3. Wait for DNS to update (minutes to a few hours). When the DNS check in Settings → Pages is
   green, tick **Enforce HTTPS**.
4. **Re-run the deploy workflow** (Actions → Deploy to GitHub Pages → Run workflow). With a
   custom domain the sub-path becomes empty and all canonical/sitemap URLs switch to your domain
   automatically.

### 2.7 Updating and rolling back

- **Update:** merge or push to `main`. The site redeploys in about 5 minutes.
- **Roll back:** `git revert <bad-commit>` and push, or re-run an older successful run from
  the Actions tab (**Re-run all jobs**).
- **Pause publishing:** Actions → Deploy to GitHub Pages → **···** → **Disable workflow**.

### 2.8 How it works (for maintainers)

- `npm run build:static` sets `STATIC_EXPORT=true`, which switches `next.config.ts` to
  `output: "export"`, `trailingSlash: true`, unoptimised images and the `basePath` from
  `NEXT_PUBLIC_BASE_PATH`. The HTTP security headers are replaced by a `<meta>` CSP.
- `actions/configure-pages` provides `base_path` and `base_url`, so the same workflow works for
  `user.github.io/repo` and for a custom domain.
- `npm run test:e2e:static` runs the full Playwright suite against `out/` (header tests are
  skipped; a meta-CSP test runs instead).

---

## Part 3 — Alternative: Vercel connected to GitHub

GitHub stores the code; Vercel (the company behind Next.js) hosts it with all server features:
security headers, image optimisation and per-pull-request preview sites. The hobby plan is free
for non-commercial use; a company site should use the Pro plan.

1. Sign in at <https://vercel.com> with your GitHub account.
2. **Add New… → Project → Import** your repository.
3. Framework preset: **Next.js** (detected). Leave build settings as they are.
4. **Environment variables:** `NEXT_PUBLIC_SITE_URL` = your production URL.
5. **Deploy.** Every push to `main` then goes live, and every pull request gets a preview link.
6. Custom domain: Project → Settings → Domains → add the domain and follow the DNS instructions.

If you use Vercel, disable the GitHub Pages workflow (Part 2.7) so only one host publishes.

Other server options (a VPS or container platform using the Docker image) are in the
[deployment guide](./deployment.md).

---

## Troubleshooting

| Problem                                                                                                                         | Fix                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The site shows the **README as a plain document** (repository name as the title, raw `![badge](…)` text) instead of the website | GitHub Pages is set to _Deploy from a branch_, so it renders `README.md` with Jekyll. Set Settings → Pages → Source to **GitHub Actions**, check that `.github/workflows/deploy-pages.yml` is in the repository, then run the _Deploy to GitHub Pages_ workflow. |
| `remote: Support for password authentication was removed`                                                                       | Use the GitHub CLI login, a personal access token or SSH (step 1.1.4).                                                                                                                                                                                           |
| `! [rejected] main -> main (fetch first)` on the first push                                                                     | The GitHub repository was created with a README. Either recreate it empty, or run `git pull --rebase origin main` then push again.                                                                                                                               |
| `subject may not be empty` / `type may not be empty` on commit                                                                  | Use a Conventional Commit message, e.g. `git commit -m "docs: update contact details"`.                                                                                                                                                                          |
| Deploy workflow fails at **Read GitHub Pages settings** (`Not Found`)                                                           | Pages is not enabled yet: do step 2.3, then re-run the workflow.                                                                                                                                                                                                 |
| Deploy job fails: _branch is not allowed to deploy to github-pages_                                                             | Settings → Environments → **github-pages** → Deployment branches: allow `main` (or `master`).                                                                                                                                                                    |
| The site loads without styles or images                                                                                         | The base path is wrong. Make sure deployment uses the workflow (not "Deploy from a branch"), and re-run it after renaming the repository or adding a custom domain.                                                                                              |
| `404` for the whole site right after the first deploy                                                                           | Wait 1–2 minutes and hard-refresh; the first publish can take a moment to propagate.                                                                                                                                                                             |
| The map in the contact section is blank                                                                                         | A browser extension or network is blocking `google.com`; the rest of the site is unaffected.                                                                                                                                                                     |

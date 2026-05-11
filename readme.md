# Andy Gobin's Portfolio

## Description

A personal portfolio website showcasing essays, poems, satire, and photography. Built with React Router 7 (framework mode), TypeScript, and MDX, prerendered to static HTML and deployed via GitHub Pages.

## Live Demo

[https://asc-nd.github.io/Portfolio](https://asc-nd.github.io/Portfolio)

## Features

- Homepage list of essays, poems, and satire pieces (auto-generated from MDX frontmatter)
- Per-essay color themes loaded on demand
- Photography gallery with digital and film sections, lazy-loaded images, and click-to-zoom lightbox
- About page with embedded Instagram and LinkedIn profile
- Clean URLs (`/eva`, `/about`) with `.html` legacy redirects
- Full static prerendering — no server required, no hydration jank
- Responsive design for mobile and desktop

## Tech Stack

- **React Router 7** (framework mode, `ssr: false` + `prerender`)
- **TypeScript** (strict mode)
- **MDX** for essay/poem/satire content with YAML frontmatter
- **Vite** for the build pipeline
- **GitHub Actions** (`actions/deploy-pages`) for CI/CD
- **GitHub Pages** for hosting

## Project Structure

```
app/
  root.tsx                  HTML shell + Navbar + Footer
  routes.ts                 Route table (/, /about, /photography, /:slug)
  routes/                   Route components
  components/               Navbar, Footer, Lightbox, LazyPhotoGrid
  content/                  MDX content
    essays/  poems/  satire/
  styles/                   Global + per-essay scoped themes
    essays/  poems/  satire/
  lib/                      Content glob loader, asset helper
  data/                     digital.json + film.json (photo manifests)
public/                     Static assets (fonts, images, favicon)
docs/adding-an-essay.mdx    Runbook for adding new content
scripts/postbuild.mjs       Writes 404.html + .nojekyll for GH Pages
```

## Development

```sh
npm install
npm run dev          # http://localhost:5173
npm run build        # outputs static site to build/client/
npm run lint
npm run typecheck
```

## Adding Content

See [docs/adding-an-essay.mdx](docs/adding-an-essay.mdx) for the full step-by-step. TL;DR: drop a new `.mdx` file under `app/content/<kind>/<slug>.mdx` with frontmatter, and it shows up on the homepage and at `/<slug>` automatically.

## Deployment

Pushes to `main` trigger [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which runs `npm ci`, `npm run build` (with `BASE_PATH=/Portfolio/`), and publishes `build/client/` to GitHub Pages via `actions/deploy-pages`.

GitHub Pages source must be set to "GitHub Actions" in repo Settings → Pages.

## Contact

Email: andy.gobin115@gmail.com
GitHub: [Asc-nd](https://github.com/Asc-nd)

[![Deploy to GitHub Pages](https://github.com/Asc-nd/Portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Asc-nd/Portfolio/actions/workflows/deploy.yml)

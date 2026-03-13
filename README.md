# Eduardo Aparicio Cardenes Interactive CV

This repository powers [eduardo-aparicio-cardenes.website](https://eduardo-aparicio-cardenes.website/), Eduardo Aparicio Cardenes' personal website and interactive CV. It brings together profile content, long-form writing, project storytelling, career history, and performance-aware frontend engineering in one maintainable Next.js application.

## Repository At A Glance

| Area | Detail |
| --- | --- |
| Live site | [eduardo-aparicio-cardenes.website](https://eduardo-aparicio-cardenes.website/) |
| Runtime | Node.js `24.12.0`, Next.js `16`, React `19`, TypeScript |
| Content source | Markdown posts in `content/posts/` |
| Build output | Static export in `dist/` |
| Deployment | Cloudflare Pages, plus a Cloudflare Worker for newsletter subscriptions |

## Live Site

Production URL: [https://eduardo-aparicio-cardenes.website/](https://eduardo-aparicio-cardenes.website/)

## Why This Project Exists

This site is not meant to be a flat portfolio brochure. It is a working personal platform that combines professional profile, technical writing, project context, and career narrative in one place.

The goal is twofold:

- Give recruiters, collaborators, and clients a clearer view of Eduardo as an engineer, mentor, writer, and builder.
- Keep the site maintainable as a product, with reusable routes, structured content, static delivery, and explicit quality checks around build output.

## Core Areas Of The Site

- **Profile and interactive CV**: the homepage, about page, role-specific profile routes, and mentor profile present Eduardo's background from multiple angles.
- **Blog**: statically generated articles, archive pagination, topic archives, and a newsletter sign-up surface technical writing and engineering thinking.
- **Projects**: `/my-projects` groups projects, hackathons, and ideas into a browsable archive.
- **Experience**: `/my-experience` turns career history into a timeline rather than a short CV summary.
- **Contact and discoverability**: the contact page, sitemap, robots rules, metadata, manifest, and internal linking help people find the right route quickly.

## Tech Stack

| Area | Implementation |
| --- | --- |
| Framework | Next.js App Router with static export |
| Language | TypeScript |
| UI styling | Sass, CSS Modules, shared `styles/snap-components` styles |
| Content pipeline | Markdown posts with `gray-matter`, `marked`, and `PrismJS` |
| Image pipeline | `sharp` generates responsive blog image variants in WebP |
| Analytics and monitoring | Google Analytics, Sentry |
| Quality tooling | ESLint, TypeScript type generation, Lost Pixel, Playwright |
| Deployment | Cloudflare Pages for the static site, Cloudflare Worker plus Wrangler for newsletter subscriptions |
| Email integration | Resend, behind the subscription worker |

## Local Development

### Prerequisites

- Node.js `24.12.0`, as defined in [`.nvmrc`](./.nvmrc)
- `npm`

### Install And Run

```bash
nvm use 24.12.0
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`npm run dev` automatically regenerates the blog manifest and rendered article artefacts before the Next.js dev server starts.

### Useful Local Commands

```bash
# Static export and verification
npm run build
npm run serve

# Quality checks
npm run lint
npm run typecheck
npm run blog:validate
```

### Optional Environment Variables

- `NEXT_PUBLIC_BASE_URL`: overrides the canonical host used for metadata, sitemap, and robots output. If omitted, the production domain is used.
- `NEXT_PUBLIC_SUBSCRIPTION_ENDPOINT`: preferred browser-side endpoint for the newsletter form.
- `NEXT_PUBLIC_EMAIL_WORKER_URL`: legacy fallback still supported by the frontend.

If you plan to run visual regression tests on a new machine, install Playwright browsers first:

```bash
npx playwright install
```

## Project Structure

| Path | Purpose |
| --- | --- |
| `app/` | App Router pages, route metadata, sitemap, robots, manifest, and route-specific page logic |
| `components/` | Shared UI, blog rendering, layout, navigation, profile sections, and reusable content blocks |
| `content/posts/` | Markdown source for blog articles |
| `generated/` | Build-time blog manifest and rendered article artefacts used by the site |
| `lib/` | Shared blog, SEO, theme, and profile data utilities |
| `public/` | Static assets, legacy redirects, icons, and generated blog image variants |
| `scripts/` | Blog generation, validation, export verification, service worker generation, CSP helpers, and reporting utilities |
| `workers/subscription-handler/` | Cloudflare Worker used by the newsletter subscription flow |
| `docs/` | Deeper notes on performance, rollout, and blog architecture |

## Content, SEO, And Performance

- Blog posts live in `content/posts/*.md`; the file name becomes the route slug.
- `predev` and `prebuild` run `scripts/generate-blog-manifest.js`, which produces `generated/blog-manifest.json`, `generated/blog-posts.json`, and responsive blog images under `public/generated/blog-images/`.
- Articles are rendered to HTML at build time, not parsed in the browser for primary content. The client enhancer only adds progressive behaviour such as TOC highlighting and gist embeds.
- Archive and tag routes are generated from shared logic in `lib/blog/archive.ts`. The current rules are `8` posts per archive page and a minimum of `2` posts before a tag gets its own archive.
- Blog pages emit canonical URLs, Open Graph and Twitter metadata, JSON-LD, reading time, table of contents data, and related post links.
- `app/sitemap.ts`, `app/robots.ts`, and `app/manifest.ts` keep discoverability assets inside the application build.
- `postbuild` generates `dist/service-worker.js` and verifies the exported blog output against route coverage, canonical links, hero image metadata, and lightweight size budgets.
- Sentry and Google Analytics are already wired into the application shell.

## Deployment

The site is built as a static export. [`next.config.js`](./next.config.js) sets `output: 'export'` and writes the production artefact to `dist/`.

GitHub Actions in [`.github/workflows/deploy-cloudflare.yml`](./.github/workflows/deploy-cloudflare.yml) currently handles deployment:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run worker:typecheck`
5. `npm run build`
6. `npm run generate-csp-hashes`
7. `wrangler pages deploy ./dist ...`
8. `wrangler deploy` for the subscription worker

Environment details that matter:

- `NEXT_PUBLIC_BASE_URL` should match the deployed host so canonical URLs, Open Graph URLs, and `sitemap.xml` stay correct.
- The frontend newsletter flow prefers `NEXT_PUBLIC_SUBSCRIPTION_ENDPOINT`, with `NEXT_PUBLIC_EMAIL_WORKER_URL` still supported as fallback.
- The subscription worker expects `RESEND_API_KEY`, `FROM_EMAIL`, `TO_EMAIL`, `ALLOWED_ORIGIN`, `EMAIL_KV`, and `AUDIENCE_ID`.

Because production is a static export, caching is mainly a Cloudflare concern rather than a Next.js server concern. Hashed assets under `/_next/static/` and generated blog images are suitable for aggressive caching, while HTML routes, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, and `service-worker.js` need normal revalidation.

## Scripts Reference

| Script | Purpose |
| --- | --- |
| `npm run dev` | Starts the Next.js dev server after regenerating blog artefacts |
| `npm run build` | Runs blog validation, builds the site, generates the service worker, and verifies the exported blog output |
| `npm run serve` | Serves the static `dist/` export locally |
| `npm run lint` | Runs ESLint across the app, shared components, libraries, and Sentry instrumentation files |
| `npm run typecheck` | Generates Next.js route types and runs `tsc --noEmit` |
| `npm run blog:validate` | Regenerates blog artefacts and validates markdown, images, and manifest integrity |
| `npm run blog:verify` | Verifies the built blog output in `dist/` |
| `npm run blog:report` | Prints benchmark and size information for the blog export |
| `npm run analyze` | Builds with bundle analysis enabled |
| `npm run lighthouse` | Runs a Lighthouse JSON report against `http://localhost:3000` |
| `npm run lighthouse:html` | Runs a Lighthouse HTML report against `http://localhost:3000` |
| `npm run lost-pixel` | Runs visual regression tests against a local preview |
| `npm run lost-pixel:update` | Updates Lost Pixel baselines |
| `npm run worker:typecheck` | Type checks the Cloudflare subscription worker |
| `npm run worker:deploy` | Deploys the subscription worker with Wrangler |
| `npm run generate-csp-hashes` | Generates suggested CSP hashes for deployment |

## Maintenance Notes

- Treat blog file names as public URLs. Renaming a file in `content/posts/` changes the route.
- Do not hand edit `generated/` or `public/generated/blog-images/`. Regenerate them through the scripts.
- `npm run build` is the safest pre-merge or pre-deploy check because it exercises the blog pipeline end to end.
- Keep [`public/_redirects`](./public/_redirects) in sync when route names change or legacy URLs need preserving.
- The contact page exists, but the current newsletter integration is the part that is wired to the Cloudflare worker. Keep that distinction clear in future docs and product copy.
- Visual regression expects a local site on port `3000` and Playwright browsers to be installed.

## Roadmap

- Publish the full build journal behind `/projects/how-do-i-build-it`
- Launch the brainstorming forum at `/forum`
- Continue tightening blog asset budgets where the export verification still raises warnings

## Licence

MIT. See [LICENSE](./LICENSE).

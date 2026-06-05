# Eduardo Aparicio Cardenes Interactive CV

Hi readers, my name is Eduardo Aparicio Cardenes.

This repository powers [eduardoac.dev](https://eduardoac.dev/), my personal website and interactive CV. I originally built it because a normal CV never felt like enough space to explain how I work, what I build, and why certain projects mattered. Over time it became something broader: a place where profile, projects, writing, experience, and mentoring can live together in one maintainable frontend application.

Today the site is built with Next.js, TypeScript, and a static deployment pipeline, but it still serves the same purpose it had at the beginning: to present the work behind the job titles, not only the job titles themselves.

## Live Site

Production URL: [https://eduardoac.dev/](https://eduardoac.dev/)

## Why This Project Exists

I built this project to go beyond a standard CV.

I wanted one place where I could show my professional profile, explain the thinking behind my work, document projects properly, publish technical writing, and make it easier for people to understand the wider story behind my career. That is why this repository is not just a portfolio site and not just a blog either. It is a personal platform that brings together profile, writing, project storytelling, experience, and discoverability in one product.

The technical side matters as much as the content. I also use the site as a real piece of frontend engineering: something that should stay maintainable, perform well, scale with more content, and reflect the standards I care about in production work.

## How This Project Evolved

The history below comes from the repository itself, not from reconstructed memory.

1. **1 August 2015**: the repository starts, followed immediately by the commit titled `Installation of Yii2 framework for frontend website`. This is the beginning of the PHP and Yii2 version captured in this repo.
2. **August to October 2015**: the site was built section by section. The homepage, profile areas, projects, blog and forum entry points, jobs timeline, footer, menu, metadata, about page, and contact experience all arrived incrementally rather than as one finished launch.
3. **January 2016**: the next wave added the projects page, the first `how do I build it` page, role-specific profile pages, work experience, Google Analytics, sitemap support, and coming soon placeholders for the blog and forum.
4. **29 June 2025**: the major migration commit moved the project from the old PHP and Yii2 implementation into Next.js and reframed it as a modern frontend application, with static export, styling cleanup, performance work, maintainability improvements, and visual regression tooling.
5. **July 2025 onward**: the project kept evolving. Blog implementation, sitemap work, theming, service worker versioning, Medium article import, the mentor profile, and ongoing clean-up turned the site into the richer platform it is now.

One detail is worth stating carefully. A later migration label refers to `PHP/Yii2 (2014) -> Next.js 14 (2024)`, which reflects the broader story behind the platform. The current repository history itself starts on **1 August 2015**, so that is the stricter date used throughout this README.

## Core Areas Of The Site

- **Profile and interactive CV**: the homepage, about page, and role-specific profile routes present my background from different angles.
- **Blog**: the site includes a statically generated blog with archive pagination, topic archives, related posts, and newsletter subscription.
- **Projects**: `/projects` curates flagship work, developer tooling, hackathons, and earlier ventures into a browsable archive.
- **Experience**: `/my-experience` turns work history into a timeline rather than a short bullet list.
- **Mentoring and discoverability**: `/mentor-profile`, contact routes, metadata, sitemap, robots rules, and internal linking make it easier for people to find the right part of the site.

## Tech Stack

| Area | Implementation |
| --- | --- |
| Runtime | Node.js `24.12.0` |
| Framework | Next.js `16` with the App Router |
| UI | React `19` |
| Language | TypeScript |
| Styling | Sass, CSS Modules, and shared `styles/snap-components` styles |
| Content | Markdown posts parsed with `gray-matter` and `marked`, with syntax highlighting via `PrismJS` |
| Blog image pipeline | `sharp` generates build-time responsive WebP variants for local blog images |
| Monitoring | Sentry and Google Analytics |
| Quality tooling | ESLint, Next.js type generation, Lost Pixel, Playwright |
| Deployment | Cloudflare Pages for the static site, plus a Cloudflare Worker for newsletter subscriptions |
| Email integration | Resend, through the subscription worker |

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

`npm run dev` regenerates the blog manifest and rendered article artefacts before the dev server starts.

### Useful Commands

```bash
# Build and preview the static export
npm run build
npm run serve

# Quality checks
npm run lint
npm run typecheck
npm run blog:validate
```

If you want to run visual regression tests on a new machine, install Playwright browsers first:

```bash
npx playwright install
```

### Optional Environment Variables

- `NEXT_PUBLIC_BASE_URL`: overrides the canonical host used for metadata, sitemap, and robots output. If omitted, the production domain is used.
- `NEXT_PUBLIC_SUBSCRIPTION_ENDPOINT`: preferred browser-side endpoint for the newsletter form.
- `NEXT_PUBLIC_EMAIL_WORKER_URL`: legacy fallback still supported by the frontend.

## Project Structure

| Path | Purpose |
| --- | --- |
| `app/` | App Router pages, metadata, sitemap, robots, manifest, and route-specific page logic |
| `components/` | Shared UI, blog rendering, layout, profile sections, navigation, and content blocks |
| `content/posts/` | Markdown source for blog articles |
| `generated/` | Build-time blog manifest and rendered article artefacts |
| `lib/` | Shared blog, SEO, theme, and profile data utilities |
| `public/` | Static assets, legacy redirects, icons, and generated blog image variants |
| `scripts/` | Blog generation, validation, export verification, service worker generation, CSP helpers, and reporting utilities |
| `workers/subscription-handler/` | Cloudflare Worker used by the newsletter flow |
| `docs/` | Deeper notes on performance, rollout, and blog architecture |

## Content, SEO, And Performance

- Blog posts live in `content/posts/*.md`, and the file name becomes the route slug.
- `predev` and `prebuild` run `scripts/generate-blog-manifest.js`, which produces `generated/blog-manifest.json`, `generated/blog-posts.json`, and responsive local blog image variants under `public/generated/blog-images/`.
- Articles are rendered to HTML at build time rather than parsed in the browser for primary content. Client-side enhancement is limited to progressive behaviour such as table-of-contents highlighting, anchor scrolling, and gist embeds.
- Archive and tag routes are generated from shared logic in `lib/blog/archive.ts`. The current rules are `8` posts per archive page and a minimum of `2` posts before a tag gets its own archive.
- Blog pages emit canonical URLs, Open Graph and Twitter metadata, JSON-LD, reading time, table-of-contents data, and related post links.
- `app/sitemap.ts`, `app/robots.ts`, and `app/manifest.ts` keep discoverability assets inside the application build.
- `postbuild` generates `dist/service-worker.js` and verifies exported blog output against route coverage, canonical links, hero image metadata, and lightweight size budgets.
- Sentry and Google Analytics are already wired into the application shell.

## Deployment

The site is built as a static export. [`next.config.js`](./next.config.js) sets `output: 'export'` and writes the production artefact to `dist/`.

Deployment is currently handled through [`.github/workflows/deploy-cloudflare.yml`](./.github/workflows/deploy-cloudflare.yml). The workflow:

1. installs dependencies with `npm ci`
2. runs `npm run lint`
3. runs `npm run typecheck`
4. runs `npm run worker:typecheck`
5. runs `npm run build`
6. runs `npm run generate-csp-hashes`
7. deploys `./dist` to Cloudflare Pages
8. deploys the subscription worker with Wrangler

Environment details that matter:

- `NEXT_PUBLIC_BASE_URL` should match the deployed host so canonical URLs, Open Graph URLs, and `sitemap.xml` stay correct.
- The frontend newsletter flow prefers `NEXT_PUBLIC_SUBSCRIPTION_ENDPOINT`, with `NEXT_PUBLIC_EMAIL_WORKER_URL` still supported as a fallback.
- The subscription worker expects `RESEND_API_KEY`, `FROM_EMAIL`, `TO_EMAIL`, `ALLOWED_ORIGIN`, `EMAIL_KV`, and `AUDIENCE_ID`.

Because production is a static export, caching is mainly a Cloudflare concern rather than a Next.js server concern. Hashed assets under `/_next/static/` and generated blog images are suitable for aggressive caching, while HTML routes, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, and `service-worker.js` need normal revalidation.

## Scripts Reference

| Script | Purpose |
| --- | --- |
| `npm run dev` | Starts the Next.js dev server after regenerating blog artefacts |
| `npm run build` | Runs blog validation, builds the site, generates the service worker, and verifies the exported blog output |
| `npm run serve` | Serves the static `dist/` export locally |
| `npm run lint` | Runs ESLint across the app, shared components, libraries, and instrumentation files |
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
- The contact page exists, but the worker-backed integration currently applies to the newsletter flow. Future documentation should keep that distinction clear.
- Visual regression expects a local site on port `3000` and Playwright browsers to be installed.

## Roadmap

- Publish the full build journal behind `/projects/how-do-i-build-it`
- Launch the brainstorming forum at `/forum`
- Continue tightening blog asset budgets where export verification still raises warnings

## Licence

MIT. See [LICENSE](./LICENSE).

# AK Research Lab

The AK Research Lab marketing site, built on an internal Next.js 16 (App
Router) starter.

> **Next.js 16 has breaking changes from what you may know.** Before writing
> route code, see `node_modules/next/dist/docs/` (also linked from
> `AGENTS.md`).

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script            | Purpose                          |
| ----------------- | -------------------------------- |
| `pnpm dev`        | Start the dev server             |
| `pnpm build`      | Production build                 |
| `pnpm start`      | Start the production server      |
| `pnpm lint`       | ESLint                           |
| `pnpm format`     | Prettier, write mode             |
| `pnpm test`       | Run the test suite once (Vitest) |
| `pnpm test:watch` | Run tests in watch mode          |

A Husky `pre-commit` hook runs `lint-staged` (ESLint + Prettier on staged
files) automatically.

## Project structure

```
app/
├── page.tsx              # the landing page (composes components/*-section.tsx)
├── layout.tsx            # root layout: fonts, metadata, cookie banner, analytics
├── privacy/, terms/      # legal pages
├── thank-you/            # post-submit confirmation page
├── not-found.tsx         # custom 404
├── robots.ts, sitemap.ts # SEO file conventions
└── icon.tsx, apple-icon.tsx, opengraph-image.tsx, manifest.ts

components/                # one file per landing-page section, plus
                            # cookie-banner.tsx, mobile-sticky-cta.tsx, ui/
lib/
├── site-config.ts         # single source of truth for name/domain/contact info
└── utils.ts                # cn() class-merging helper
```

`lib/site-config.ts` is where the production domain, contact email/phone, and
business address live — update it there rather than hardcoding those values
in components.

## Testing

Vitest + React Testing Library are configured (`vitest.config.mts`,
`vitest-setup.ts`) but there are no tests yet — add `*.test.tsx` files next to
the component they cover.

## Linting & formatting

ESLint (`eslint-config-next` + `eslint-config-prettier` to avoid rule
conflicts) and Prettier (with `prettier-plugin-tailwindcss` for class
ordering) are both configured. Husky + lint-staged run them on staged files
before every commit.

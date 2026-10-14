# AK Research Lab

The AK Research Lab website: the parent company site for an AI research and
engineering lab and its flagship product, MeroIMS. Built with Next.js 16 (App
Router) and Tailwind CSS 4, and fully statically generated.

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

## Pages

| Route          | Content                                                        |
| -------------- | -------------------------------------------------------------- |
| `/`            | Hero and short highlights linking to each page                 |
| `/about`       | About the lab and why work with us                             |
| `/services`    | Services in full                                               |
| `/solutions`   | MeroIMS: features, restaurant and e-commerce suites, modules   |
| `/research`    | Research areas and research compute (the only GPU content)     |
| `/blog`        | Articles with search, category filters, and pagination         |
| `/blog/[slug]` | Article pages with table of contents, related posts, and SEO   |
| `/contact`     | Inquiry form (`?inquiry=meroims-demo` etc. preselects a topic) |

## Project structure

```
app/
├── (site)/                # pages that share the header and footer
│   ├── page.tsx           # homepage
│   ├── about/, services/, solutions/, research/, contact/
│   ├── blog/              # listing, [slug] article pages, per-post OG images
│   └── privacy/, terms/
├── layout.tsx             # root layout: fonts, metadata, cookie banner, analytics
├── thank-you/, not-found.tsx, loading.tsx
├── robots.ts, sitemap.ts  # sitemap includes every published post
└── icon.tsx, apple-icon.tsx, opengraph-image.tsx, manifest.ts

components/
├── layout/                # header, footer, logo, mobile sticky CTA
├── home/                  # homepage highlight sections
├── sections/              # full page sections (about, services, research, ...)
├── meroims/               # MeroIMS feature tabs and badge
├── blog/                  # cards, covers, listing explorer, share links
├── contact/               # inquiry form
└── ui/                    # shared primitives

content/blog/
├── posts/*.md             # one Markdown file per article
├── categories.ts          # blog categories
└── README.md              # how to write and publish a post

lib/
├── site-config.ts         # name, domain, contact details, MeroIMS links
├── meroims.ts             # MeroIMS product facts used across the site
├── navigation.ts          # header and mobile navigation
├── inquiry.ts             # inquiry topics, contact links, form validation
└── blog/                  # Markdown loading, rendering, filtering
```

Edit facts in one place: contact details and the domain in
`lib/site-config.ts`, product copy in `lib/meroims.ts`.

## Brand colours

The palette is defined once, as Tailwind tokens in `app/globals.css`:

| Token                    | Use                                               |
| ------------------------ | ------------------------------------------------- |
| `ink`, `ink-raised`      | Dark section backgrounds                          |
| `brand-50` … `brand-950` | Iris brand colour: buttons, links, focus rings    |
| `gold-200` … `gold-500`  | Highlights on dark backgrounds (labels, icons)    |
| Tailwind `emerald`       | Reserved for MeroIMS, so the product stands apart |

Use these tokens (`bg-brand-600`, `text-gold-300`) rather than raw colours, so
the palette can change in one place. Keep gold on dark surfaces only; it is
not readable on white.

## Blog

Articles are Markdown files in `content/blog/posts/`. Adding a file with
`status: published` publishes it on the next build, with no code changes.
Drafts are visible only in `pnpm dev`. See
[`content/blog/README.md`](content/blog/README.md) for the full guide.

## Contact form

The site is static, so form submissions go to a third-party endpoint. Set
`NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` (see `.env.example`) to a service that
accepts a JSON POST, such as Formspree. Without it, the form opens the
visitor's email app with the inquiry pre-filled, so no message is lost.

## Testing

Vitest + React Testing Library are configured (`vitest.config.mts`,
`vitest-setup.ts`). Tests live next to the code they cover (`lib/**/*.test.ts`)
and include a check that every blog post file is valid, so a broken post fails
`pnpm test` before it can fail a deploy.

## Linting & formatting

ESLint (`eslint-config-next` + `eslint-config-prettier` to avoid rule
conflicts) and Prettier (with `prettier-plugin-tailwindcss` for class
ordering) are both configured. Husky + lint-staged run them on staged files
before every commit.

# Writing blog posts

Blog posts are Markdown files in [`posts/`](./posts). Each file becomes a page
at `/blog/<file-name>`, appears on `/blog`, and is added to the sitemap. No
code changes are needed to publish.

## Add a post

1. Create `posts/my-post-title.md`. Use lowercase words joined by hyphens; the
   file name is the URL slug and must be unique.
2. Add frontmatter and the article body:

```markdown
---
title: "Your article title"
excerpt: "One or two sentences shown on cards and in search results."
category: model-training
tags: [training, gpu]
author: AK Research Lab Team
publishedAt: 2026-10-14
status: draft
---

Article body in Markdown. Use `##` and `###` headings; they build the table
of contents automatically.
```

3. Run `pnpm dev` and open `/blog`. Drafts are visible locally with a
   "Draft preview" badge.
4. When it's ready, change `status` to `published`, commit, and deploy.

## Frontmatter fields

| Field            | Required | Notes                                                   |
| ---------------- | -------- | ------------------------------------------------------- |
| `title`          | Yes      | Article headline.                                       |
| `excerpt`        | Yes      | Summary for cards, search, and social previews.         |
| `category`       | Yes      | A slug from [`categories.ts`](./categories.ts).         |
| `publishedAt`    | Yes      | `YYYY-MM-DD`. Posts are sorted newest first.            |
| `status`         | Yes      | `draft`, `published`, or `archived`.                    |
| `tags`           | No       | Inline list, e.g. `[gpu, training]`.                    |
| `author`         | No       | Defaults to "AK Research Lab Team".                     |
| `updatedAt`      | No       | `YYYY-MM-DD`, shown as "Updated" on the article.        |
| `featured`       | No       | `true` pins the post to the top of `/blog`.             |
| `coverImage`     | No       | Path under `public/`, e.g. `/blog/my-cover.jpg` (16:9). |
| `coverAlt`       | No       | Alt text for the cover image.                           |
| `seoTitle`       | No       | Overrides the title in search results.                  |
| `seoDescription` | No       | Overrides the excerpt in search results.                |

## Statuses

- **draft**: visible only in `pnpm dev`. Never built into production.
- **published**: public, listed, and in the sitemap.
- **archived**: removed from the site and the sitemap; the URL returns 404.

## Categories

Edit [`categories.ts`](./categories.ts) to add or rename categories. Only
categories with at least one published post show up as filters.

The build fails with a clear message if a post has a missing field, an
unknown category, or an invalid date, so mistakes are caught before deploy.

import fs from "node:fs";
import path from "node:path";
import { blogCategories } from "@/content/blog/categories";
import { parseFrontmatter, type FrontmatterValue } from "./frontmatter";
import { readingMinutes, renderMarkdown } from "./markdown";
import type { Post, PostStatus, PostSummary } from "./types";

// Blog posts are Markdown files in content/blog/posts. The file name is the
// URL slug: content/blog/posts/my-post.md -> /blog/my-post. Publishing a post
// is adding a file with `status: published`; no component changes needed.

const POSTS_DIR = path.join(process.cwd(), "content", "blog", "posts");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const STATUSES: PostStatus[] = ["draft", "published", "archived"];

// Drafts are visible in `next dev` so authors can preview them, and never in
// a production build. Archived posts are never public.
const showDrafts = process.env.NODE_ENV === "development";

function isVisible(status: PostStatus): boolean {
  return status === "published" || (showDrafts && status === "draft");
}

function requireString(
  data: Record<string, FrontmatterValue>,
  key: string,
  file: string,
): string {
  const value = data[key];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${file}: frontmatter "${key}" is required.`);
  }
  return value.trim();
}

function optionalString(
  data: Record<string, FrontmatterValue>,
  key: string,
): string | undefined {
  const value = data[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function requireDate(value: string, key: string, file: string): string {
  if (!DATE_PATTERN.test(value) || Number.isNaN(Date.parse(value))) {
    throw new Error(`${file}: "${key}" must be a date like 2026-10-14.`);
  }
  return value;
}

function loadPost(fileName: string): Post {
  const slug = fileName.replace(/\.md$/, "");
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(
      `${fileName}: file names must be lowercase words joined by hyphens (e.g. my-first-post.md).`,
    );
  }

  const source = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const { data, body } = parseFrontmatter(source, fileName);

  const status = requireString(data, "status", fileName) as PostStatus;
  if (!STATUSES.includes(status)) {
    throw new Error(
      `${fileName}: "status" must be one of ${STATUSES.join(", ")}.`,
    );
  }

  const categorySlug = requireString(data, "category", fileName);
  const category = blogCategories.find((c) => c.slug === categorySlug);
  if (!category) {
    throw new Error(
      `${fileName}: unknown category "${categorySlug}". Add it to content/blog/categories.ts or use one of: ${blogCategories
        .map((c) => c.slug)
        .join(", ")}.`,
    );
  }

  const tags = data.tags ?? [];
  if (!Array.isArray(tags)) {
    throw new Error(
      `${fileName}: "tags" must be a list, e.g. [gpu, training].`,
    );
  }

  const updatedAt = optionalString(data, "updatedAt");
  const { html, headings } = renderMarkdown(body);

  return {
    slug,
    title: requireString(data, "title", fileName),
    excerpt: requireString(data, "excerpt", fileName),
    category: category.slug,
    categoryName: category.name,
    tags,
    author: optionalString(data, "author") ?? "AK Research Lab Team",
    publishedAt: requireDate(
      requireString(data, "publishedAt", fileName),
      "publishedAt",
      fileName,
    ),
    updatedAt: updatedAt
      ? requireDate(updatedAt, "updatedAt", fileName)
      : undefined,
    status,
    featured: data.featured === true,
    coverImage: optionalString(data, "coverImage"),
    coverAlt: optionalString(data, "coverAlt"),
    seoTitle: optionalString(data, "seoTitle"),
    seoDescription: optionalString(data, "seoDescription"),
    readingMinutes: readingMinutes(body),
    html,
    headings,
  };
}

let cache: Post[] | null = null;

function loadAllPosts(): Post[] {
  // Re-read on every call in development so new and edited posts show up
  // without restarting the dev server.
  if (cache && !showDrafts) return cache;

  const files = fs.existsSync(POSTS_DIR)
    ? fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith(".md"))
    : [];

  const posts = files
    .map(loadPost)
    .filter((post) => isVisible(post.status))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  cache = posts;
  return posts;
}

function toSummary(post: Post): PostSummary {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    categoryName: post.categoryName,
    tags: post.tags,
    author: post.author,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    status: post.status,
    featured: post.featured,
    coverImage: post.coverImage,
    coverAlt: post.coverAlt,
    readingMinutes: post.readingMinutes,
  };
}

/** Public posts, newest first (plus drafts while running `next dev`). */
export function getAllPosts(): PostSummary[] {
  return loadAllPosts().map(toSummary);
}

export function getPostBySlug(slug: string): Post | null {
  return loadAllPosts().find((post) => post.slug === slug) ?? null;
}

/** Posts in the same category first, then posts sharing a tag. */
export function getRelatedPosts(post: Post, limit = 3): PostSummary[] {
  const tagSet = new Set(post.tags);
  return loadAllPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      score:
        (candidate.category === post.category ? 2 : 0) +
        candidate.tags.filter((tag) => tagSet.has(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => toSummary(candidate));
}

/** Newer and older neighbours in publication order. */
export function getAdjacentPosts(slug: string): {
  newer: PostSummary | null;
  older: PostSummary | null;
} {
  const posts = loadAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { newer: null, older: null };
  return {
    newer: index > 0 ? toSummary(posts[index - 1]) : null,
    older: index < posts.length - 1 ? toSummary(posts[index + 1]) : null,
  };
}

import type { BlogCategorySlug } from "@/content/blog/categories";
import type { Heading } from "./markdown";

export type PostStatus = "draft" | "published" | "archived";

/** Everything needed to list a post. Safe to pass to client components. */
export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategorySlug;
  categoryName: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  status: PostStatus;
  featured: boolean;
  coverImage?: string;
  coverAlt?: string;
  readingMinutes: number;
};

export type Post = PostSummary & {
  seoTitle?: string;
  seoDescription?: string;
  html: string;
  headings: Heading[];
};

import type { PostSummary } from "./types";

export const POSTS_PER_PAGE = 9;

export type BlogQuery = { search: string; category: string; page: number };

export type FilteredPosts = {
  featured: PostSummary | null;
  posts: PostSummary[];
  total: number;
  page: number;
  pageCount: number;
};

function matchesSearch(post: PostSummary, search: string): boolean {
  const terms = search.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = [post.title, post.excerpt, post.categoryName, ...post.tags]
    .join(" ")
    .toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

/**
 * Applies search, category filter, and pagination to the post list. The
 * featured post is pulled out only on the unfiltered first page, so it is
 * never shown twice and never hides a search result.
 */
export function filterPosts(
  allPosts: PostSummary[],
  { search, category, page }: BlogQuery,
  perPage = POSTS_PER_PAGE,
): FilteredPosts {
  const isUnfiltered = !search.trim() && !category;

  let featured: PostSummary | null = null;
  let pool = allPosts;
  if (isUnfiltered && allPosts.length > 0) {
    featured = allPosts.find((post) => post.featured) ?? allPosts[0];
    pool = allPosts.filter((post) => post !== featured);
  }

  const matching = pool.filter(
    (post) =>
      (!category || post.category === category) && matchesSearch(post, search),
  );

  const pageCount = Math.max(1, Math.ceil(matching.length / perPage));
  const currentPage = Math.min(Math.max(1, Math.floor(page) || 1), pageCount);
  const start = (currentPage - 1) * perPage;

  return {
    featured: currentPage === 1 ? featured : null,
    posts: matching.slice(start, start + perPage),
    total: matching.length + (featured ? 1 : 0),
    page: currentPage,
    pageCount,
  };
}

/** URL for the blog listing with the given filters applied. */
export function blogHref(query: Partial<BlogQuery>): string {
  const params = new URLSearchParams();
  if (query.search?.trim()) params.set("q", query.search.trim());
  if (query.category) params.set("category", query.category);
  if (query.page && query.page > 1) params.set("page", String(query.page));
  const qs = params.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

export function formatPostDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

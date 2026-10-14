import { describe, expect, it } from "vitest";
import { blogHref, filterPosts, formatPostDate } from "./filter";
import type { PostSummary } from "./types";

function post(overrides: Partial<PostSummary> & { slug: string }): PostSummary {
  return {
    title: overrides.slug,
    excerpt: "",
    category: "ai-research",
    categoryName: "AI Research",
    tags: [],
    author: "AK Research Lab Team",
    publishedAt: "2026-10-01",
    status: "published",
    featured: false,
    readingMinutes: 1,
    ...overrides,
  };
}

const posts = [
  post({ slug: "newest", title: "Sizing GPU memory", tags: ["gpu"] }),
  post({
    slug: "featured",
    featured: true,
    category: "meroims",
    categoryName: "MeroIMS",
  }),
  post({ slug: "third", excerpt: "Fine-tuning checklist" }),
  post({ slug: "fourth" }),
];

describe("filterPosts", () => {
  it("pulls out the featured post on the unfiltered first page only", () => {
    const first = filterPosts(posts, { search: "", category: "", page: 1 }, 2);
    expect(first.featured?.slug).toBe("featured");
    expect(first.posts.map((p) => p.slug)).toEqual(["newest", "third"]);
    expect(first.pageCount).toBe(2);
    expect(first.total).toBe(4);

    const second = filterPosts(posts, { search: "", category: "", page: 2 }, 2);
    expect(second.featured).toBeNull();
    expect(second.posts.map((p) => p.slug)).toEqual(["fourth"]);
  });

  it("falls back to the newest post when none is marked featured", () => {
    const result = filterPosts(
      posts.filter((p) => !p.featured),
      { search: "", category: "", page: 1 },
    );
    expect(result.featured?.slug).toBe("newest");
  });

  it("searches title, excerpt, and tags, requiring every term", () => {
    const search = (term: string) =>
      filterPosts(posts, { search: term, category: "", page: 1 }).posts.map(
        (p) => p.slug,
      );
    expect(search("gpu")).toEqual(["newest"]);
    expect(search("FINE-TUNING")).toEqual(["third"]);
    expect(search("gpu checklist")).toEqual([]);
  });

  it("filters by category without hiding results behind the featured slot", () => {
    const result = filterPosts(posts, {
      search: "",
      category: "meroims",
      page: 1,
    });
    expect(result.featured).toBeNull();
    expect(result.posts.map((p) => p.slug)).toEqual(["featured"]);
  });

  it("clamps out-of-range pages", () => {
    expect(
      filterPosts(posts, { search: "", category: "", page: 99 }, 2).page,
    ).toBe(2);
    expect(
      filterPosts(posts, { search: "", category: "", page: -3 }, 2).page,
    ).toBe(1);
  });
});

describe("blogHref", () => {
  it("omits defaults and encodes values", () => {
    expect(blogHref({})).toBe("/blog");
    expect(blogHref({ page: 1 })).toBe("/blog");
    expect(
      blogHref({ search: " gpu memory ", category: "meroims", page: 2 }),
    ).toBe("/blog?q=gpu+memory&category=meroims&page=2");
  });
});

describe("formatPostDate", () => {
  it("formats ISO dates without time-zone drift", () => {
    expect(formatPostDate("2026-10-01")).toBe("October 1, 2026");
  });
});

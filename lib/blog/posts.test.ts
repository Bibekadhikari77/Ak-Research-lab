import { describe, expect, it } from "vitest";
import { blogCategories } from "@/content/blog/categories";
import { getAdjacentPosts, getAllPosts, getPostBySlug } from "./posts";

// Loads the real files in content/blog/posts, so an invalid post fails CI
// before it can fail a deploy.
describe("blog content", () => {
  const posts = getAllPosts();

  it("loads every post with valid frontmatter", () => {
    expect(posts.length).toBeGreaterThan(0);
    const slugs = new Set(posts.map((post) => post.slug));
    expect(slugs.size).toBe(posts.length);
    for (const post of posts) {
      expect(blogCategories.some((c) => c.slug === post.category)).toBe(true);
    }
  });

  it("lists posts newest first and exposes only public ones outside dev", () => {
    const dates = posts.map((post) => post.publishedAt);
    expect([...dates].sort().reverse()).toEqual(dates);
    expect(posts.every((post) => post.status === "published")).toBe(true);
  });

  it("renders each post body", () => {
    for (const { slug } of posts) {
      const post = getPostBySlug(slug);
      expect(post?.html.length).toBeGreaterThan(0);
    }
    expect(getPostBySlug("does-not-exist")).toBeNull();
  });

  it("links neighbours in publication order", () => {
    const { newer, older } = getAdjacentPosts(posts[0].slug);
    expect(newer).toBeNull();
    expect(older?.slug).toBe(posts[1]?.slug);
  });
});

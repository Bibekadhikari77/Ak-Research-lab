import { Suspense } from "react";
import type { Metadata } from "next";
import BlogExplorer, {
  BlogExplorerView,
  DEFAULT_BLOG_QUERY,
  type CategoryOption,
} from "@/components/blog/blog-explorer";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import { blogCategories } from "@/content/blog/categories";
import { getAllPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles from AK Research Lab on AI research, software engineering, engineering tutorials, and MeroIMS product updates.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  // Only show categories that have at least one article.
  const categories: CategoryOption[] = blogCategories
    .map((category) => ({
      slug: category.slug,
      name: category.name,
      count: posts.filter((post) => post.category === category.slug).length,
    }))
    .filter((category) => category.count > 0);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from the lab"
        description="Research notes, engineering tutorials, and product updates from the AK Research Lab team."
      />
      <section className="bg-surface-2 py-12 sm:py-16">
        <Container>
          <Suspense
            fallback={
              <BlogExplorerView
                posts={posts}
                categories={categories}
                query={DEFAULT_BLOG_QUERY}
              />
            }
          >
            <BlogExplorer posts={posts} categories={categories} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}

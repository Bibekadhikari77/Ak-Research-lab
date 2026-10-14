import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import PostCard, { PostMeta } from "@/components/blog/post-card";
import PostCover from "@/components/blog/post-cover";
import ShareLinks from "@/components/blog/share-links";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/ui/container";
import { blogHref, formatPostDate } from "@/lib/blog/filter";
import {
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog/posts";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/reveal";

// Only posts that exist at build time are valid; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    authors: [{ name: post.author }],
    keywords: post.tags,
    robots:
      post.status === "draft" ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title,
      description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
      section: post.categoryName,
      tags: post.tags,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const { newer, older } = getAdjacentPosts(post.slug);
  const url = `${siteConfig.url}/blog/${post.slug}`;
  const showToc = post.headings.length >= 3;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        author: { "@type": "Organization", name: post.author },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        mainEntityOfPage: url,
        articleSection: post.categoryName,
        keywords: post.tags.join(", "),
        image: `${url}/opengraph-image`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${siteConfig.url}/blog`,
          },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />

      <article>
        <header className="bg-ink relative isolate overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16">
          <div
            aria-hidden="true"
            className="bg-tech-grid absolute inset-0 -z-10"
          />
          <Container className="flex max-w-4xl flex-col gap-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-400">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-1.5">
                  <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li className="flex items-center gap-1.5">
                  <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
                  <Link
                    href={blogHref({ category: post.category })}
                    className="hover:text-white"
                  >
                    {post.categoryName}
                  </Link>
                </li>
              </ol>
            </nav>

            {post.status === "draft" ? (
              <p className="self-start rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold text-amber-300">
                Draft preview: visible only in development
              </p>
            ) : null}

            <h1 className="text-3xl leading-[1.15] font-semibold tracking-tight text-balance text-white sm:text-5xl">
              {post.title}
            </h1>
            <p className="text-lg leading-8 text-pretty text-slate-300">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <span className="font-medium text-white">{post.author}</span>
              <PostMeta post={post} className="text-sm text-slate-400" />
              {post.updatedAt ? (
                <span className="text-slate-400">
                  · Updated{" "}
                  <time dateTime={post.updatedAt}>
                    {formatPostDate(post.updatedAt)}
                  </time>
                </span>
              ) : null}
            </div>
          </Container>
        </header>

        <Container className="max-w-4xl">
          <div className="-mt-px overflow-hidden rounded-b-2xl border-x border-b border-slate-200 sm:mt-8 sm:rounded-2xl sm:border">
            <PostCover
              category={post.category}
              categoryName={post.categoryName}
              coverImage={post.coverImage}
              coverAlt={post.coverAlt}
              priority
              sizes="(min-width: 896px) 896px, 100vw"
            />
          </div>
        </Container>

        <Container className="grid max-w-6xl gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="mx-auto w-full max-w-3xl min-w-0">
            {showToc ? (
              <details className="mb-10 rounded-xl border border-slate-200 bg-slate-50 p-4 lg:hidden">
                <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                  On this page
                </summary>
                <TableOfContents headings={post.headings} />
              </details>
            ) : null}

            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            {post.tags.length > 0 ? (
              <ul aria-label="Tags" className="mt-12 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      href={blogHref({ search: tag })}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                    >
                      #{tag}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/blog"
                className="text-brand-700 hover:text-brand-900 inline-flex items-center gap-1.5 text-sm font-medium"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                Back to blog
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">Share</span>
                <ShareLinks url={url} title={post.title} />
              </div>
            </div>

            {newer || older ? (
              <nav
                aria-label="More articles"
                className="mt-10 grid gap-4 sm:grid-cols-2"
              >
                {older ? (
                  <AdjacentLink
                    direction="previous"
                    href={`/blog/${older.slug}`}
                    title={older.title}
                  />
                ) : (
                  <span className="hidden sm:block" />
                )}
                {newer ? (
                  <AdjacentLink
                    direction="next"
                    href={`/blog/${newer.slug}`}
                    title={newer.title}
                  />
                ) : null}
              </nav>
            ) : null}
          </div>

          {showToc ? (
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="text-sm font-semibold text-slate-900">
                  On this page
                </p>
                <TableOfContents headings={post.headings} />
              </div>
            </aside>
          ) : null}
        </Container>
      </article>

      {related.length > 0 ? (
        <section
          aria-labelledby="related-title"
          className="border-surface-line bg-surface-2 border-t py-16 sm:py-20"
        >
          <Container className="flex flex-col gap-10">
            <h2
              id="related-title"
              className="text-2xl font-semibold tracking-tight text-slate-950"
            >
              Related articles
            </h2>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedPost, index) => (
                <Reveal as="li" index={index} key={relatedPost.slug}>
                  <PostCard post={relatedPost} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}

function TableOfContents({
  headings,
}: {
  headings: { id: string; text: string; depth: 2 | 3 }[];
}) {
  return (
    <ol className="mt-3 flex flex-col gap-2 border-l border-slate-200 text-sm">
      {headings.map((heading) => (
        <li key={heading.id} className={heading.depth === 3 ? "pl-7" : "pl-4"}>
          <a
            href={`#${heading.id}`}
            className="-ml-px block border-l border-transparent text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-950"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

function AdjacentLink({
  direction,
  href,
  title,
}: {
  direction: "previous" | "next";
  href: string;
  title: string;
}) {
  const isNext = direction === "next";
  return (
    <Link
      href={href}
      className={`group flex flex-col gap-1 rounded-xl border border-slate-200 p-4 transition-colors hover:border-slate-300 hover:bg-slate-50 ${
        isNext ? "sm:items-end sm:text-right" : ""
      }`}
    >
      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
        {isNext ? null : (
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        )}
        {isNext ? "Next article" : "Previous article"}
        {isNext ? (
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
        ) : null}
      </span>
      <span className="group-hover:text-brand-800 text-sm font-semibold text-slate-900">
        {title}
      </span>
    </Link>
  );
}

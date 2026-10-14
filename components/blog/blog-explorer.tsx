"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { blogHref, filterPosts, type BlogQuery } from "@/lib/blog/filter";
import type { PostSummary } from "@/lib/blog/types";
import { cn } from "@/lib/utils";
import PostCard, { FeaturedPostCard } from "./post-card";

export type CategoryOption = { slug: string; name: string; count: number };

export const DEFAULT_BLOG_QUERY: BlogQuery = {
  search: "",
  category: "",
  page: 1,
};

type ViewProps = {
  posts: PostSummary[];
  categories: CategoryOption[];
  query: BlogQuery;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
};

/**
 * Stateless listing UI. Filters are plain links and the search box is a GET
 * form, so the page works before JavaScript loads; `BlogExplorer` layers
 * live search on top.
 */
export function BlogExplorerView({
  posts,
  categories,
  query,
  searchValue,
  onSearchChange,
}: ViewProps) {
  const result = useMemo(() => filterPosts(posts, query), [posts, query]);
  const hasFilters = Boolean(query.search.trim() || query.category);
  const activeCategory = categories.find((c) => c.slug === query.category);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <form
          action="/blog"
          method="get"
          role="search"
          onSubmit={
            onSearchChange ? (event) => event.preventDefault() : undefined
          }
          className="relative max-w-xl"
        >
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400"
          />
          {query.category ? (
            <input type="hidden" name="category" value={query.category} />
          ) : null}
          <input
            id="blog-search"
            name="q"
            type="search"
            placeholder="Search articles"
            autoComplete="off"
            {...(onSearchChange
              ? {
                  value: searchValue ?? "",
                  onChange: (event) => onSearchChange(event.target.value),
                }
              : { defaultValue: query.search })}
            className="focus-visible:border-brand-500 focus-visible:ring-brand-500/20 h-12 w-full rounded-full border border-slate-300 bg-white pr-4 pl-11 text-sm text-slate-900 shadow-xs outline-none placeholder:text-slate-400 focus-visible:ring-3 [&::-webkit-search-cancel-button]:hidden"
          />
        </form>

        <nav
          aria-label="Blog categories"
          className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
        >
          <ul className="flex gap-2 sm:flex-wrap">
            <li>
              <CategoryChip
                href={blogHref({ search: query.search })}
                active={!query.category}
                label="All"
                count={posts.length}
              />
            </li>
            {categories.map((category) => (
              <li key={category.slug}>
                <CategoryChip
                  href={blogHref({
                    search: query.search,
                    category: category.slug,
                  })}
                  active={query.category === category.slug}
                  label={category.name}
                  count={category.count}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p aria-live="polite" className="sr-only">
        {result.total} {result.total === 1 ? "article" : "articles"} found
      </p>

      {hasFilters ? (
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span>
            {result.total} {result.total === 1 ? "result" : "results"}
            {query.search.trim() ? (
              <> for &ldquo;{query.search.trim()}&rdquo;</>
            ) : null}
            {activeCategory ? <> in {activeCategory.name}</> : null}
          </span>
          <Link
            href="/blog"
            onClick={() => onSearchChange?.("")}
            className="text-brand-700 hover:text-brand-900 inline-flex items-center gap-1 font-medium"
          >
            <X aria-hidden="true" className="h-3.5 w-3.5" />
            Clear filters
          </Link>
        </div>
      ) : null}

      {result.featured ? <FeaturedPostCard post={result.featured} /> : null}

      {result.posts.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {result.posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      ) : !result.featured ? (
        <EmptyState
          hasPosts={posts.length > 0}
          onClear={() => onSearchChange?.("")}
        />
      ) : null}

      {result.pageCount > 1 ? (
        <Pagination
          query={query}
          page={result.page}
          pageCount={result.pageCount}
        />
      ) : null}
    </div>
  );
}

function CategoryChip({
  href,
  active,
  label,
  count,
}: {
  href: string;
  active: boolean;
  label: string;
  count: number;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
        active
          ? "border-slate-950 bg-slate-950 text-white"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950",
      )}
    >
      {label}
      <span
        className={cn("text-xs", active ? "text-slate-300" : "text-slate-400")}
      >
        {count}
      </span>
    </Link>
  );
}

function Pagination({
  query,
  page,
  pageCount,
}: {
  query: BlogQuery;
  page: number;
  pageCount: number;
}) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const linkClasses =
    "flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium transition-colors";

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1"
    >
      {page > 1 ? (
        <Link
          href={blogHref({ ...query, page: page - 1 })}
          className={cn(linkClasses, "text-slate-700 hover:bg-slate-100")}
        >
          <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Link>
      ) : null}
      {pages.map((number) => (
        <Link
          key={number}
          href={blogHref({ ...query, page: number })}
          aria-current={number === page ? "page" : undefined}
          className={cn(
            linkClasses,
            number === page
              ? "bg-slate-950 text-white"
              : "text-slate-700 hover:bg-slate-100",
          )}
        >
          <span className="sr-only">Page </span>
          {number}
        </Link>
      ))}
      {page < pageCount ? (
        <Link
          href={blogHref({ ...query, page: page + 1 })}
          className={cn(linkClasses, "text-slate-700 hover:bg-slate-100")}
        >
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Link>
      ) : null}
    </nav>
  );
}

function EmptyState({
  hasPosts,
  onClear,
}: {
  hasPosts: boolean;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center">
      <p className="text-lg font-semibold text-slate-950">
        {hasPosts ? "No articles match your search" : "Articles are on the way"}
      </p>
      <p className="max-w-sm text-sm leading-6 text-slate-600">
        {hasPosts
          ? "Try a different keyword or browse another category."
          : "We're preparing our first articles. Check back soon."}
      </p>
      {hasPosts ? (
        <Link
          href="/blog"
          onClick={onClear}
          className="text-brand-700 hover:text-brand-900 mt-2 text-sm font-medium"
        >
          Show all articles
        </Link>
      ) : null}
    </div>
  );
}

function readQuery(params: URLSearchParams): BlogQuery {
  return {
    search: params.get("q") ?? "",
    category: params.get("category") ?? "",
    page: Number(params.get("page")) || 1,
  };
}

/** Live listing: keeps search, category, and page in the URL. */
export default function BlogExplorer({
  posts,
  categories,
}: Omit<ViewProps, "query" | "searchValue" | "onSearchChange">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = useMemo(() => readQuery(searchParams), [searchParams]);
  const [searchValue, setSearchValue] = useState(query.search);
  const [syncedSearch, setSyncedSearch] = useState(query.search);
  const [pushedSearch, setPushedSearch] = useState<string | null>(null);

  // When the URL's search changes for a reason other than typing here (back
  // button, "Clear filters"), mirror it into the input.
  if (query.search !== syncedSearch) {
    setSyncedSearch(query.search);
    if (query.search !== pushedSearch) setSearchValue(query.search);
  }

  // Push typed searches into the URL after a short pause, resetting to page 1.
  useEffect(() => {
    const next = searchValue.trim();
    if (next === query.search.trim()) return;
    const timeout = setTimeout(() => {
      setPushedSearch(next);
      router.replace(blogHref({ search: next, category: query.category }), {
        scroll: false,
      });
    }, 250);
    return () => clearTimeout(timeout);
  }, [searchValue, query.search, query.category, router]);

  return (
    <BlogExplorerView
      posts={posts}
      categories={categories}
      query={query}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    />
  );
}

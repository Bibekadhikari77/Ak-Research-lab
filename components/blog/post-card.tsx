import Link from "next/link";
import { formatPostDate } from "@/lib/blog/filter";
import type { PostSummary } from "@/lib/blog/types";
import { cn } from "@/lib/utils";
import PostCover from "./post-cover";

export function PostMeta({
  post,
  className,
}: {
  post: PostSummary;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-2 text-xs text-slate-500",
        className,
      )}
    >
      <time dateTime={post.publishedAt}>
        {formatPostDate(post.publishedAt)}
      </time>
      <span aria-hidden="true">·</span>
      <span>{post.readingMinutes} min read</span>
    </p>
  );
}

function DraftBadge() {
  return (
    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
      Draft preview
    </span>
  );
}

export default function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_20px_40px_-24px_rgb(15_23_42/0.3)]">
      <PostCover
        category={post.category}
        categoryName={post.categoryName}
        coverImage={post.coverImage}
        coverAlt={post.coverAlt}
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-2">
          <span className="text-brand-700 text-xs font-semibold">
            {post.categoryName}
          </span>
          {post.status === "draft" ? <DraftBadge /> : null}
        </div>
        <h3 className="text-lg leading-snug font-semibold text-slate-950">
          <Link
            href={`/blog/${post.slug}`}
            className="group-focus-within:underline after:absolute after:inset-0 focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm leading-6 text-slate-600">
          {post.excerpt}
        </p>
        <div className="mt-auto flex flex-col gap-1 border-t border-slate-100 pt-4">
          <span className="text-xs font-medium text-slate-700">
            {post.author}
          </span>
          <PostMeta post={post} />
        </div>
      </div>
    </article>
  );
}

export function FeaturedPostCard({ post }: { post: PostSummary }) {
  return (
    <article className="group relative grid overflow-hidden rounded-3xl border border-slate-200 bg-white transition-shadow hover:shadow-[0_30px_60px_-30px_rgb(15_23_42/0.35)] md:grid-cols-2">
      <PostCover
        category={post.category}
        categoryName={post.categoryName}
        coverImage={post.coverImage}
        coverAlt={post.coverAlt}
        priority
        sizes="(min-width: 768px) 560px, 100vw"
        className="h-full md:aspect-auto md:min-h-[320px]"
      />
      <div className="flex flex-col justify-center gap-4 p-6 sm:p-10">
        <div className="flex items-center gap-2">
          <span className="bg-brand-50 text-brand-700 rounded-full px-2.5 py-1 text-xs font-semibold">
            Featured
          </span>
          <span className="text-xs font-semibold text-slate-500">
            {post.categoryName}
          </span>
          {post.status === "draft" ? <DraftBadge /> : null}
        </div>
        <h2 className="text-2xl leading-tight font-semibold tracking-tight text-slate-950 sm:text-3xl">
          <Link
            href={`/blog/${post.slug}`}
            className="group-focus-within:underline after:absolute after:inset-0 focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-base leading-7 text-slate-600">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-sm font-medium text-slate-800">
            {post.author}
          </span>
          <PostMeta post={post} className="text-sm" />
        </div>
      </div>
    </article>
  );
}

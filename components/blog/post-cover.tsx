import Image from "next/image";
import type { BlogCategorySlug } from "@/content/blog/categories";
import { cn } from "@/lib/utils";

// Posts without a `coverImage` get an abstract cover tinted by category, so
// listings stay consistent without stock imagery.
const categoryTints: Record<BlogCategorySlug, string> = {
  "ai-research": "from-brand-600/55 via-brand-800/25",
  "gpu-infrastructure": "from-gold-500/35 via-brand-700/25",
  "machine-learning": "from-brand-500/50 via-gold-500/10",
  "software-engineering": "from-slate-500/40 via-brand-800/25",
  "model-training": "from-brand-400/45 via-brand-900/30",
  "cloud-computing": "from-brand-300/35 via-brand-700/25",
  "engineering-tutorials": "from-gold-400/30 via-slate-600/20",
  meroims: "from-emerald-500/50 via-emerald-800/20",
  "business-automation": "from-emerald-600/35 via-brand-700/25",
  "company-news": "from-gold-300/30 via-brand-600/25",
};

export default function PostCover({
  category,
  categoryName,
  coverImage,
  coverAlt,
  priority = false,
  sizes,
  className,
}: {
  category: BlogCategorySlug;
  categoryName: string;
  coverImage?: string;
  coverAlt?: string;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  if (coverImage) {
    return (
      <Image
        src={coverImage}
        alt={coverAlt ?? ""}
        width={1600}
        height={900}
        priority={priority}
        sizes={sizes}
        className={cn("aspect-[16/9] w-full object-cover", className)}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-ink relative isolate aspect-[16/9] w-full overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 -z-10 bg-gradient-to-br to-transparent",
          categoryTints[category],
        )}
      />
      <div className="bg-tech-grid absolute inset-0 -z-10" />
      <span className="absolute bottom-4 left-4 font-mono text-[11px] tracking-[0.14em] text-white/70 uppercase">
        {categoryName}
      </span>
    </div>
  );
}

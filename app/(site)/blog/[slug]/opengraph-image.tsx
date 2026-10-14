import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/blog/posts";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AK Research Lab blog article";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "linear-gradient(135deg, #080a1c 0%, #171442 60%, #2a2160 100%)",
        padding: "72px 80px",
        fontFamily: "sans-serif",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 22,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "#f2cd7e",
        }}
      >
        {post?.categoryName ?? "Blog"}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 60,
          fontWeight: 700,
          lineHeight: 1.15,
          maxWidth: 1000,
        }}
      >
        {post?.title ?? siteConfig.name}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            display: "flex",
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "linear-gradient(135deg, #6f63f3, #3f31a4)",
            color: "#f8e2b0",
            fontSize: 18,
            fontWeight: 700,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          AK
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#cbd5e1" }}>
          {siteConfig.name} Blog
        </div>
      </div>
    </div>,
    { ...size },
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#F7F5F3] px-6 py-24 text-center">
      <div className="mb-6 flex items-center gap-2 font-mono text-xs tracking-wider text-[#8A8580]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#C4402A]" />
        AK RESEARCH LAB
      </div>
      <h1 className="font-sans text-5xl font-semibold tracking-tight text-[#37322F] sm:text-6xl">
        404
      </h1>
      <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-[#605A57] sm:text-base">
        This page doesn&apos;t exist, or it moved. Let&apos;s get you back to
        solid ground.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-[#37322F] px-8 text-sm font-medium text-white transition-colors hover:bg-[#2A2520]"
      >
        Back to Home
      </Link>
    </div>
  );
}

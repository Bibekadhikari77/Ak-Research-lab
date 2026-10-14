import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has moved.",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#F7F5F3] px-6 py-24 text-center">
      <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-[#8A8580] mb-6">
        <span className="h-1.5 w-1.5 rounded-full bg-[#C4402A]" />
        AK RESEARCH LAB
      </div>
      <h1 className="text-[#37322F] text-5xl sm:text-6xl font-semibold font-sans tracking-tight">404</h1>
      <p className="mt-4 max-w-sm text-[#605A57] text-sm sm:text-base font-sans leading-relaxed">
        This page doesn&apos;t exist, or it moved. Let&apos;s get you back to solid ground.
      </p>
      <Link
        href="/"
        className="mt-8 h-11 px-8 inline-flex items-center justify-center rounded-full bg-[#37322F] text-white text-sm font-medium hover:bg-[#2A2520] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}

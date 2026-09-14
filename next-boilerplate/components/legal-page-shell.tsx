import Link from "next/link"
import type { ReactNode } from "react"

export function LegalPageShell({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <div className="w-full min-h-screen bg-[#F7F5F3]">
      <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
        <Link
          href="/"
          className="text-sm font-medium text-[#605A57] hover:text-[#37322F] transition-colors"
        >
          ← Back to Home
        </Link>
        <h1 className="mt-6 text-[#37322F] text-3xl sm:text-4xl font-semibold font-sans tracking-tight">
          {title}
        </h1>
        <p className="mt-2 text-sm text-[#8A8580] font-sans">Last updated: {updated}</p>
        <div className="mt-10 prose-legal text-[#605A57] font-sans text-sm sm:text-base leading-7 [&_h2]:text-[#37322F] [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_li]:mb-1 [&_a]:underline [&_a]:text-[#37322F]">
          {children}
        </div>
      </div>
    </div>
  )
}

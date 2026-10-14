import type { ReactNode } from "react"
import SiteNav from "./site-nav"
import FooterSection from "./footer-section"

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
    <div className="w-full min-h-screen bg-[#F7F5F3] flex flex-col items-center">
      <SiteNav />
      <div className="mx-auto w-full max-w-3xl px-6 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <h1 className="text-[#37322F] text-3xl sm:text-4xl font-semibold font-sans tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-[#8A8580] font-sans">Last updated: {updated}</p>
        <div className="mt-10 prose-legal text-[#605A57] font-sans text-sm sm:text-base leading-7 [&_h2]:text-[#37322F] [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_li]:mb-1 [&_a]:underline [&_a]:text-[#37322F]">
          {children}
        </div>
      </div>
      <FooterSection />
    </div>
  )
}

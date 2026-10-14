import type { ReactNode } from "react";
import SiteNav from "./site-nav";
import FooterSection from "./footer-section";

export function LegalPageShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#F7F5F3]">
      <SiteNav />
      <div className="mx-auto w-full max-w-3xl px-6 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <h1 className="font-sans text-3xl font-semibold tracking-tight text-[#37322F] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 font-sans text-sm text-[#8A8580]">
          Last updated: {updated}
        </p>
        <div className="prose-legal mt-10 font-sans text-sm leading-7 text-[#605A57] sm:text-base [&_a]:text-[#37322F] [&_a]:underline [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[#37322F] [&_li]:mb-1 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </div>
      <FooterSection />
    </div>
  );
}

import type { ReactNode } from "react";
import { PageHero } from "./page-hero";

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
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        description={`Last updated: ${updated}`}
      />
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="[&_a]:text-brand-700 text-sm leading-7 text-slate-600 sm:text-base [&_a]:underline [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-slate-950 [&_li]:mb-1 [&_p]:mb-4 [&_strong]:text-slate-900 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </>
  );
}

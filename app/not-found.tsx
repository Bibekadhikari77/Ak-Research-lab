import type { Metadata } from "next";
import { LogoMark } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="bg-ink relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div aria-hidden="true" className="bg-tech-grid absolute inset-0 -z-10" />
      <LogoMark className="mb-8" />
      <p className="text-gold-300 font-mono text-sm tracking-[0.2em]">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300 sm:text-base">
        This page doesn&apos;t exist, or it has moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">
          Back to Home
        </ButtonLink>
        <ButtonLink href="/blog" size="lg" variant="outline-dark">
          Read the blog
        </ButtonLink>
      </div>
    </div>
  );
}

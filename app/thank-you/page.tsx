import type { Metadata } from "next";
import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Thank You",
  description: "We've received your request and will be in touch shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="bg-ink relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div aria-hidden="true" className="bg-tech-grid absolute inset-0 -z-10" />
      <div className="from-brand-500 to-brand-800 text-gold-200 mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br">
        <Check aria-hidden="true" className="h-6 w-6" strokeWidth={2.5} />
      </div>
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Thanks, we&apos;ve received your inquiry
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
        A member of the AK Research Lab team will reply by email. In the
        meantime, explore our research or read the latest from the lab.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
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

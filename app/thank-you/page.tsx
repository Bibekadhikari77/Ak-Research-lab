import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You",
  description: "We've received your request and will be in touch shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#F7F5F3] px-6 py-24 text-center">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#37322F]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 13l4 4L19 7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h1 className="font-sans text-3xl font-semibold tracking-tight text-[#37322F] sm:text-4xl">
        Thanks — we&apos;ve got your request
      </h1>
      <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-[#605A57] sm:text-base">
        A member of the AK Research Lab team will reach out shortly. In the
        meantime, feel free to explore our research or head back to the
        homepage.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-full bg-[#37322F] px-8 text-sm font-medium text-white transition-colors hover:bg-[#2A2520]"
        >
          Back to Home
        </Link>
        <Link
          href="/#research"
          className="inline-flex h-11 items-center justify-center rounded-full border border-[rgba(55,50,47,0.16)] bg-white px-8 text-sm font-medium text-[#37322F] transition-colors hover:bg-[rgba(55,50,47,0.03)]"
        >
          Explore Our Research
        </Link>
      </div>
    </div>
  );
}

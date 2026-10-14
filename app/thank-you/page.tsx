import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Thank You",
  description: "We've received your request and will be in touch shortly.",
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#F7F5F3] px-6 py-24 text-center">
      <div className="w-14 h-14 rounded-full bg-[#37322F] flex items-center justify-center mb-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 13l4 4L19 7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h1 className="text-[#37322F] text-3xl sm:text-4xl font-semibold font-sans tracking-tight">
        Thanks — we&apos;ve got your request
      </h1>
      <p className="mt-4 max-w-md text-[#605A57] text-sm sm:text-base font-sans leading-relaxed">
        A member of the AK Research Lab team will reach out shortly. In the meantime, feel free to explore our
        research or head back to the homepage.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="h-11 px-8 inline-flex items-center justify-center rounded-full bg-[#37322F] text-white text-sm font-medium hover:bg-[#2A2520] transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/#research"
          className="h-11 px-8 inline-flex items-center justify-center rounded-full bg-white border border-[rgba(55,50,47,0.16)] text-[#37322F] text-sm font-medium hover:bg-[rgba(55,50,47,0.03)] transition-colors"
        >
          Explore Our Research
        </Link>
      </div>
    </div>
  )
}

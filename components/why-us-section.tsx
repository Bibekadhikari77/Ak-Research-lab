"use client"

import type React from "react"

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="px-[14px] py-[6px] bg-white shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-[rgba(2,6,23,0.08)] shadow-xs">
      <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">{icon}</div>
      <div className="text-center flex justify-center flex-col text-[#37322F] text-xs font-medium leading-3 font-sans">
        {text}
      </div>
    </div>
  )
}

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M10 3L4.5 8.5L2 6" stroke="#37322F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const differentiators = [
  "End-to-end expertise: compute, training, and software engineering",
  "Research-backed approach, not just implementation",
  "We build on our own infrastructure and prove it with our own product",
  // TODO: add real team credentials / years active / notable clients here once available.
]

export default function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center scroll-mt-24"
    >
      <div className="self-stretch px-6 md:px-24 py-8 md:py-10 flex justify-center items-center gap-6">
        <div className="w-full max-w-[586px] flex flex-col justify-start items-center gap-4">
          <Badge
            icon={
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 1L1 3.5V6C1 8.5 3 10.3 6 11C9 10.3 11 8.5 11 6V3.5L6 1Z" stroke="#37322F" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            }
            text="Why AK Research Lab"
          />
          <h2 className="self-stretch text-center text-[#49423D] text-3xl md:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            Full-Stack AI Expertise, Under One Roof
          </h2>
          <p className="self-stretch text-center text-[#605A57] text-base font-normal leading-7 font-sans">
            Most companies specialize in a single layer of the AI stack. We operate across all of them, with fewer
            handoffs, faster iteration, and infrastructure that&apos;s actually informed by research.
          </p>
        </div>
      </div>

      <div className="self-stretch px-6 md:px-24 pb-8 md:pb-10 flex justify-center items-center">
        <ul className="w-full max-w-[760px] grid grid-cols-1 sm:grid-cols-3 gap-4">
          {differentiators.map((item) => (
            <li
              key={item}
              className="bg-white border border-[rgba(2,6,23,0.08)] rounded-lg p-5 flex flex-col items-start gap-3"
            >
              <span className="w-6 h-6 shrink-0 rounded-full bg-[rgba(55,50,47,0.06)] flex items-center justify-center">
                <Check />
              </span>
              <span className="text-[rgba(55,50,47,0.85)] text-sm font-normal leading-5 font-sans">{item}</span>
            </li>
          ))}
        </ul>
        {/* TODO: optional logo strip / stats / testimonials. Only add once real, verified proof exists. Never fabricate. */}
      </div>
    </section>
  )
}

"use client";

import type React from "react";

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center justify-start gap-[8px] overflow-hidden rounded-[90px] border border-[rgba(2,6,23,0.08)] bg-white px-[14px] py-[6px] shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] shadow-xs">
      <div className="relative flex h-[14px] w-[14px] items-center justify-center overflow-hidden">
        {icon}
      </div>
      <div className="flex flex-col justify-center text-center font-sans text-xs leading-3 font-medium text-[#37322F]">
        {text}
      </div>
    </div>
  );
}

function Check() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 3L4.5 8.5L2 6"
        stroke="#37322F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const differentiators = [
  "End-to-end expertise: compute, training, and software engineering",
  "Research-backed approach, not just implementation",
  "We build on our own infrastructure and prove it with our own product",
  // TODO: add real team credentials / years active / notable clients here once available.
];

export default function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="flex w-full scroll-mt-24 flex-col items-center justify-center border-b border-[rgba(55,50,47,0.12)]"
    >
      <div className="flex items-center justify-center gap-6 self-stretch px-6 py-8 md:px-24 md:py-10">
        <div className="flex w-full max-w-[586px] flex-col items-center justify-start gap-4">
          <Badge
            icon={
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 1L1 3.5V6C1 8.5 3 10.3 6 11C9 10.3 11 8.5 11 6V3.5L6 1Z"
                  stroke="#37322F"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              </svg>
            }
            text="Why AK Research Lab"
          />
          <h2 className="self-stretch text-center font-sans text-3xl leading-tight font-semibold tracking-tight text-[#49423D] md:text-5xl md:leading-[60px]">
            Full-Stack AI Expertise, Under One Roof
          </h2>
          <p className="self-stretch text-center font-sans text-base leading-7 font-normal text-[#605A57]">
            Most companies specialize in a single layer of the AI stack. We
            operate across all of them, with fewer handoffs, faster iteration,
            and infrastructure that&apos;s actually informed by research.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center self-stretch px-6 pb-8 md:px-24 md:pb-10">
        <ul className="grid w-full max-w-[760px] grid-cols-1 gap-4 sm:grid-cols-3">
          {differentiators.map((item) => (
            <li
              key={item}
              className="flex flex-col items-start gap-3 rounded-lg border border-[rgba(2,6,23,0.08)] bg-white p-5"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(55,50,47,0.06)]">
                <Check />
              </span>
              <span className="font-sans text-sm leading-5 font-normal text-[rgba(55,50,47,0.85)]">
                {item}
              </span>
            </li>
          ))}
        </ul>
        {/* TODO: optional logo strip / stats / testimonials. Only add once real, verified proof exists. Never fabricate. */}
      </div>
    </section>
  );
}

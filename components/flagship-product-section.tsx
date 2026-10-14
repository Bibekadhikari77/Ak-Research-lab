"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"

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

const PRODUCT_NAME = "MeroIMS"

const features = [
  "Automated bookkeeping & reconciliation",
  "AI-driven financial insights & reporting",
  "Built and trained end-to-end on our own infrastructure",
  // TODO: insert real product-specific features here (client to provide).
]

export default function FlagshipProductSection() {
  return (
    <section
      id="product"
      className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center scroll-mt-24"
    >
      <div className="self-stretch px-6 md:px-24 py-8 md:py-10 flex justify-center items-center gap-6">
        <div className="w-full max-w-[960px] flex flex-col gap-4">
          <div className="flex flex-col items-start gap-4 max-w-[640px]">
            <Badge
              icon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 1L7.5 4.5L11 6L7.5 7.5L6 11L4.5 7.5L1 6L4.5 4.5L6 1Z"
                    stroke="#37322F"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              text="Flagship Product"
            />
            <h2 className="text-[#49423D] text-3xl md:text-4xl font-semibold leading-tight font-sans tracking-tight">
              {PRODUCT_NAME}: AI-Powered Accounting, Built In-House
            </h2>
            <p className="text-[#605A57] text-base font-normal leading-7 font-sans">
              We don&apos;t just build infrastructure. We use it. {PRODUCT_NAME} is our own AI-powered accounting
              platform, trained and run on our GPU infrastructure, built to automate and simplify financial
              workflows for modern teams.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 flex flex-col gap-6">
              <ul className="flex flex-col justify-start items-start gap-3">
                {features.map((feature) => (
                  <li key={feature} className="self-stretch flex justify-start items-center gap-3">
                    <span className="w-5 h-5 shrink-0 rounded-full bg-[rgba(55,50,47,0.06)] flex items-center justify-center">
                      <Check />
                    </span>
                    <span className="flex-1 text-[rgba(55,50,47,0.85)] text-sm font-normal leading-5 font-sans">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/#compute-request"
                className="self-start px-6 py-[10px] bg-[#37322F] shadow-[0px_2px_4px_rgba(55,50,47,0.12)] overflow-hidden rounded-[99px] flex justify-center items-center relative hover:bg-[#2A2520] transition-colors"
              >
                <div className="w-full h-[41px] absolute left-0 top-[-0.5px] bg-gradient-to-b from-[rgba(255,255,255,0.20)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
                <div className="text-[#FBFAF9] text-[13px] font-medium leading-5 font-sans relative">
                  Explore {PRODUCT_NAME}
                </div>
              </Link>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <Image
                src="/meroims1.png"
                alt={`${PRODUCT_NAME} product screenshot`}
                width={640}
                height={640}
                className="w-full max-w-[240px] md:max-w-[280px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";

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

const PRODUCT_NAME = "MeroIMS";

const features = [
  "Automated bookkeeping & reconciliation",
  "AI-driven financial insights & reporting",
  "Built and trained end-to-end on our own infrastructure",
  // TODO: insert real product-specific features here (client to provide).
];

export default function FlagshipProductSection() {
  return (
    <section
      id="product"
      className="flex w-full scroll-mt-24 flex-col items-center justify-center border-b border-[rgba(55,50,47,0.12)]"
    >
      <div className="flex items-center justify-center gap-6 self-stretch px-6 py-8 md:px-24 md:py-10">
        <div className="flex w-full max-w-[960px] flex-col gap-4">
          <div className="flex max-w-[640px] flex-col items-start gap-4">
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
                    d="M6 1L7.5 4.5L11 6L7.5 7.5L6 11L4.5 7.5L1 6L4.5 4.5L6 1Z"
                    stroke="#37322F"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              text="Flagship Product"
            />
            <h2 className="font-sans text-3xl leading-tight font-semibold tracking-tight text-[#49423D] md:text-4xl">
              {PRODUCT_NAME}: AI-Powered Accounting, Built In-House
            </h2>
            <p className="font-sans text-base leading-7 font-normal text-[#605A57]">
              We don&apos;t just build infrastructure. We use it. {PRODUCT_NAME}{" "}
              is our own AI-powered accounting platform, trained and run on our
              GPU infrastructure, built to automate and simplify financial
              workflows for modern teams.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
            <div className="flex flex-1 flex-col gap-6">
              <ul className="flex flex-col items-start justify-start gap-3">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center justify-start gap-3 self-stretch"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(55,50,47,0.06)]">
                      <Check />
                    </span>
                    <span className="flex-1 font-sans text-sm leading-5 font-normal text-[rgba(55,50,47,0.85)]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/#compute-request"
                className="relative flex items-center justify-center self-start overflow-hidden rounded-[99px] bg-[#37322F] px-6 py-[10px] shadow-[0px_2px_4px_rgba(55,50,47,0.12)] transition-colors hover:bg-[#2A2520]"
              >
                <div className="absolute top-[-0.5px] left-0 h-[41px] w-full bg-gradient-to-b from-[rgba(255,255,255,0.20)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
                <div className="relative font-sans text-[13px] leading-5 font-medium text-[#FBFAF9]">
                  Explore {PRODUCT_NAME}
                </div>
              </Link>
            </div>

            <div className="flex flex-1 items-center justify-center">
              <Image
                src="/meroims1.png"
                alt={`${PRODUCT_NAME} product screenshot`}
                width={640}
                height={640}
                className="w-full max-w-[240px] object-contain md:max-w-[280px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

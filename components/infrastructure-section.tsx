"use client";

import type React from "react";
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

const features = [
  "On-demand GPU provisioning",
  "Compute usage monitoring & management dashboard",
  "Support for major frameworks (PyTorch, TensorFlow, JAX)",
  "Scales from single-GPU experiments to distributed training clusters",
];

export default function InfrastructureSection() {
  return (
    <section
      id="infrastructure"
      className="flex w-full scroll-mt-24 flex-col items-center justify-center border-b border-[rgba(55,50,47,0.12)]"
    >
      <div className="flex items-center justify-center gap-6 self-stretch px-6 py-8 md:px-24 md:py-10">
        <div className="flex w-full max-w-[720px] flex-col items-center justify-center gap-8 md:flex-row md:items-start md:gap-16">
          <div className="flex flex-1 flex-col items-start justify-start gap-4">
            <Badge
              icon={
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="3"
                    width="4"
                    height="6"
                    stroke="#37322F"
                    strokeWidth="1"
                    fill="none"
                  />
                  <rect
                    x="7"
                    y="1"
                    width="4"
                    height="8"
                    stroke="#37322F"
                    strokeWidth="1"
                    fill="none"
                  />
                </svg>
              }
              text="Infrastructure"
            />
            <h2 className="font-sans text-3xl leading-tight font-semibold tracking-tight text-[#49423D] md:text-4xl">
              Enterprise-Grade GPU Infrastructure, On Demand
            </h2>
            <p className="font-sans text-base leading-7 font-normal text-[#605A57]">
              Access scalable GPU compute without managing your own hardware.
              Our infrastructure is built and maintained by the same team that
              trains on it, optimized for real AI workloads, not just
              benchmarks.
            </p>

            <Link
              href="/#compute-request"
              className="relative mt-2 flex items-center justify-center overflow-hidden rounded-[99px] bg-[#37322F] px-6 py-[10px] shadow-[0px_2px_4px_rgba(55,50,47,0.12)] transition-colors hover:bg-[#2A2520]"
            >
              <div className="absolute top-[-0.5px] left-0 h-[41px] w-full bg-gradient-to-b from-[rgba(255,255,255,0.20)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
              <div className="relative font-sans text-[13px] leading-5 font-medium text-[#FBFAF9]">
                Request Compute Access
              </div>
            </Link>
          </div>

          <div className="w-full flex-1">
            <ul className="flex flex-col items-start justify-start gap-3">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center justify-start gap-3 self-stretch rounded-lg border border-[rgba(2,6,23,0.08)] bg-white px-4 py-3"
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
            {/* TODO: add a real stats strip once verified numbers exist, e.g. "[X]+ GPUs deployed · [XX]% uptime · [XX]ms avg latency". Do not display invented figures. */}
          </div>
        </div>
      </div>
    </section>
  );
}

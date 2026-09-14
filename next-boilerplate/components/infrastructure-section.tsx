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

const features = [
  "On-demand GPU provisioning",
  "Compute usage monitoring & management dashboard",
  "Support for major frameworks (PyTorch, TensorFlow, JAX)",
  "Scales from single-GPU experiments to distributed training clusters",
]

export default function InfrastructureSection() {
  return (
    <section
      id="infrastructure"
      className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center scroll-mt-24"
    >
      <div className="self-stretch px-6 md:px-24 py-8 md:py-10 flex justify-center items-center gap-6">
        <div className="w-full max-w-[720px] flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-16">
          <div className="flex-1 flex flex-col justify-start items-start gap-4">
            <Badge
              icon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="3" width="4" height="6" stroke="#37322F" strokeWidth="1" fill="none" />
                  <rect x="7" y="1" width="4" height="8" stroke="#37322F" strokeWidth="1" fill="none" />
                </svg>
              }
              text="Infrastructure"
            />
            <h2 className="text-[#49423D] text-3xl md:text-4xl font-semibold leading-tight font-sans tracking-tight">
              Enterprise-Grade GPU Infrastructure, On Demand
            </h2>
            <p className="text-[#605A57] text-base font-normal leading-7 font-sans">
              Access scalable GPU compute without managing your own hardware. Our infrastructure is built and
              maintained by the same team that trains on it, optimized for real AI workloads, not just benchmarks.
            </p>

            <a
              href="#compute-request"
              className="mt-2 px-6 py-[10px] bg-[#37322F] shadow-[0px_2px_4px_rgba(55,50,47,0.12)] overflow-hidden rounded-[99px] flex justify-center items-center relative hover:bg-[#2A2520] transition-colors"
            >
              <div className="w-full h-[41px] absolute left-0 top-[-0.5px] bg-gradient-to-b from-[rgba(255,255,255,0.20)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
              <div className="text-[#FBFAF9] text-[13px] font-medium leading-5 font-sans relative">
                Request Compute Access
              </div>
            </a>
          </div>

          <div className="flex-1 w-full">
            <ul className="flex flex-col justify-start items-start gap-3">
              {features.map((feature) => (
                <li key={feature} className="self-stretch flex justify-start items-center gap-3 bg-white border border-[rgba(2,6,23,0.08)] rounded-lg px-4 py-3">
                  <span className="w-5 h-5 shrink-0 rounded-full bg-[rgba(55,50,47,0.06)] flex items-center justify-center">
                    <Check />
                  </span>
                  <span className="flex-1 text-[rgba(55,50,47,0.85)] text-sm font-normal leading-5 font-sans">
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
  )
}

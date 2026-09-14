"use client"

import type React from "react"
import { motion } from "motion/react"

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

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

const focusAreas = [
  "Model training & fine-tuning",
  "Distributed training systems",
  "Model evaluation & benchmarking",
  "Applied AI research for production use cases",
]

export default function ResearchSection() {
  return (
    <section
      id="research"
      className="relative overflow-hidden w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center scroll-mt-24"
    >
      {/* Rectangular grid-box pattern behind the research content, fading out toward the edges */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: EASE_OUT }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(55,50,47,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(55,50,47,0.14) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 65% 60% at 50% 45%, black 35%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 60% at 50% 45%, black 35%, transparent 85%)",
        }}
      />

      <div className="relative z-10 self-stretch px-6 md:px-24 py-8 md:py-10 flex justify-center items-center gap-6">
        <div className="w-full max-w-[720px] flex flex-col md:flex-row-reverse justify-center items-center md:items-start gap-8 md:gap-16">
          <div className="flex-1 flex flex-col justify-start items-start gap-4">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeIn}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <Badge
                icon={
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6" cy="6" r="1" fill="#37322F" />
                    <ellipse cx="6" cy="6" rx="5" ry="2" stroke="#37322F" strokeWidth="0.8" />
                    <ellipse cx="6" cy="6" rx="5" ry="2" stroke="#37322F" strokeWidth="0.8" transform="rotate(60 6 6)" />
                    <ellipse cx="6" cy="6" rx="5" ry="2" stroke="#37322F" strokeWidth="0.8" transform="rotate(120 6 6)" />
                  </svg>
                }
                text="Research"
              />
            </motion.div>

            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
              className="text-[#49423D] text-3xl md:text-4xl font-semibold leading-tight font-sans tracking-tight"
            >
              Applied Research. Real-World Models.
            </motion.h2>

            <p className="text-[#605A57] text-base font-normal leading-7 font-sans">
              We&apos;re a research lab first. Our engineers and researchers work hands-on with model architecture,
              training pipelines, fine-tuning, and evaluation. That expertise directly shapes the infrastructure we
              build and the products we ship.
            </p>

            <motion.a
              href="#compute-request"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeIn}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
              className="mt-2 px-6 py-[10px] bg-white border border-[rgba(55,50,47,0.16)] overflow-hidden rounded-[99px] flex justify-center items-center hover:bg-[rgba(55,50,47,0.03)] transition-colors"
            >
              <div className="text-[#37322F] text-[13px] font-medium leading-5 font-sans">Partner With Our Lab</div>
            </motion.a>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeIn}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
            className="flex-1 w-full"
          >
            <ul className="flex flex-col justify-start items-start gap-3">
              {focusAreas.map((area) => (
                <li
                  key={area}
                  className="self-stretch flex justify-start items-center gap-3 bg-[#F7F5F3] border border-[rgba(2,6,23,0.08)] rounded-lg px-4 py-3"
                >
                  <span className="w-5 h-5 shrink-0 rounded-full bg-white flex items-center justify-center">
                    <Check />
                  </span>
                  <span className="flex-1 text-[rgba(55,50,47,0.85)] text-sm font-normal leading-5 font-sans">
                    {area}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

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

const paragraphs = [
  "AK Research Lab is an AI research lab built on deep technical expertise in software engineering and AI model training. We operate at the intersection of research and infrastructure, running our own GPU compute, training models hands-on, and using that same infrastructure to ship real products, including our own AI-powered accounting software.",
  "We don't treat research and engineering as separate functions. Our expertise spans the full stack: GPU infrastructure and compute management, applied AI model training, and production-grade software engineering research. That combination is what lets us provide reliable compute access to other teams, contribute meaningful research to the software engineering field, and build AI-powered products of our own.",
  "In short: we're a lab that builds what it researches, and gives other teams the infrastructure and expertise to do the same.",
]

export default function AboutSection() {
  return (
    <section id="about" className="w-full flex flex-col justify-center items-center scroll-mt-24">
      <div className="self-stretch px-6 md:px-24 py-8 md:py-10 flex justify-center items-center">
        <div className="w-full flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4">
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
                    <circle cx="6" cy="6" r="4.5" stroke="#37322F" strokeWidth="1" />
                    <path d="M6 4V6.3L7.3 7.3" stroke="#37322F" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
                text="About Us"
              />
            </motion.div>
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
              className="self-stretch text-center text-[#49423D] text-3xl md:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight"
            >
              About Us
            </motion.h2>
          </div>

          <div className="w-full flex flex-col gap-5">
            {paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: EASE_OUT }}
                className="text-[#605A57] text-sm md:text-base font-normal leading-7 font-sans text-left"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

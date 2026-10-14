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

const services = [
  {
    title: "Technical Expertise & Consulting",
    description:
      "Deep technical expertise across AI and software engineering, applied to real implementation problems rather than advisory work alone.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 7H14M4 12H20M4 17H10" stroke="#37322F" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="17" cy="7" r="2" stroke="#37322F" strokeWidth="1.5" />
        <circle cx="14" cy="17" r="2" stroke="#37322F" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "AI & Software Engineering Research",
    description:
      "Applied research in the software engineering field, alongside research support for partners who need answers tested in production, not just in theory.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9.5 3H14.5M10 3V8.5L4.8 17.2A2 2 0 006.5 20H17.5A2 2 0 0019.2 17.2L14 8.5V3"
          stroke="#37322F"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8 15H16" stroke="#37322F" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "AI Model Training",
    description:
      "End-to-end model training (architecture, fine-tuning, and evaluation) run on our own GPU infrastructure to move faster from experiment to production.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="1.6" fill="#37322F" />
        <circle cx="18" cy="6" r="1.6" fill="#37322F" />
        <circle cx="12" cy="18" r="1.6" fill="#37322F" />
        <path d="M6 6L18 6M6 6L12 18M18 6L12 18" stroke="#37322F" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    title: "GPU Infrastructure & Provisioning",
    description:
      "GPU infrastructure that we provide and manage ourselves, backed by our own technical expertise in GPU systems rather than resold hardware.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="5" rx="1" stroke="#37322F" strokeWidth="1.5" />
        <rect x="3" y="15" width="18" height="5" rx="1" stroke="#37322F" strokeWidth="1.5" />
        <circle cx="7" cy="6.5" r="0.75" fill="#37322F" />
        <circle cx="7" cy="17.5" r="0.75" fill="#37322F" />
      </svg>
    ),
  },
  {
    title: "Compute Access & Management",
    description:
      "On-demand compute access with the tooling to monitor, scale, and manage usage, so teams can focus on building instead of infrastructure overhead.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="13" r="7.5" stroke="#37322F" strokeWidth="1.4" />
        <path d="M12 13L15.5 9.5" stroke="#37322F" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M9 3.5H15" stroke="#37322F" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "AI-Powered Accounting Software",
    description:
      "Our flagship product: AI-driven accounting software, trained and run on our own infrastructure, proof of our research and engineering at work in a real, everyday tool.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="6" y="3" width="12" height="18" rx="1.5" stroke="#37322F" strokeWidth="1.4" />
        <path d="M9 8H15M9 12H15M9 16H12.5" stroke="#37322F" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center scroll-mt-24"
    >
      {/* Header */}
      <div className="self-stretch px-6 md:px-24 py-8 md:py-10 border-b border-[rgba(55,50,47,0.12)] flex justify-center items-center gap-6">
        <div className="w-full max-w-[586px] px-6 py-5 overflow-hidden rounded-lg flex flex-col justify-start items-center gap-4">
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
                  <path d="M6 1L1 3.5V6C1 8.5 3 10.3 6 11C9 10.3 11 8.5 11 6V3.5L6 1Z" stroke="#37322F" strokeWidth="1" strokeLinejoin="round" />
                </svg>
              }
              text="Our Services"
            />
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
            className="self-stretch text-center flex justify-center flex-col text-[#49423D] text-3xl md:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight"
          >
            What We Offer
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeIn}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
            className="self-stretch text-center text-[#605A57] text-base font-normal leading-7 font-sans"
          >
            From hands-on research to the infrastructure that runs it, and the products built on top.
          </motion.p>
        </div>
      </div>

      {/* Services grid */}
      <div className="self-stretch flex justify-center items-start">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-0 border-l border-r border-[rgba(55,50,47,0.12)]">
          {services.map((service, index) => {
            const isRightColumn = index % 2 === 1
            const isBottomRow = index >= services.length - (services.length % 2 === 0 ? 2 : 1)
            return (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
                transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: EASE_OUT }}
                className={`p-6 sm:p-8 md:p-10 flex flex-col justify-start items-start gap-4 ${
                  isRightColumn ? "" : "sm:border-r border-[rgba(55,50,47,0.12)]"
                } ${isBottomRow ? "" : "border-b border-[rgba(55,50,47,0.12)]"}`}
              >
                <div className="w-11 h-11 rounded-[10px] bg-[rgba(55,50,47,0.04)] border border-[rgba(55,50,47,0.10)] flex items-center justify-center">
                  {service.icon}
                </div>
                <h3 className="text-[#37322F] text-lg sm:text-xl font-semibold leading-tight font-sans">
                  {service.title}
                </h3>
                <p className="text-[#605A57] text-sm md:text-base font-normal leading-relaxed font-sans">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

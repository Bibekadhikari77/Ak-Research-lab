"use client"

import type React from "react"
import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "motion/react"

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

// Tilts the GPU visual in 3D space as it scrolls up into view, then settles flat.
function GpuVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 40%"],
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [32, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1])
  const y = useTransform(scrollYProgress, [0, 1], [80, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1])

  return (
    <div ref={ref} style={{ perspective: "1600px" }} className="w-full max-w-[960px] lg:w-[960px]">
      <motion.div
        style={{ rotateX, scale, y, opacity, transformStyle: "preserve-3d" }}
        className="relative w-full max-w-[960px] lg:w-[960px] h-[200px] sm:h-[280px] md:h-[450px] lg:h-[520px] bg-white shadow-[0px_10px_40px_rgba(55,50,47,0.18)] overflow-hidden rounded-[6px] sm:rounded-[8px] lg:rounded-[9.06px]"
      >
        <Image
          src="/Gpu.jpeg"
          alt="GPU compute cluster hardware powering AK Research Lab's infrastructure"
          fill
          priority
          sizes="(min-width: 1024px) 960px, 100vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  )
}

// Badge component (local copy matching the pattern already used in every section file)
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

// Trailing forward-arrow used on the primary CTA pattern
function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.33334 8H12.6667M12.6667 8L8.66667 4M12.6667 8L8.66667 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function HeroAISection() {
  return (
    <div className="relative overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-[216px] pb-8 sm:pb-12 md:pb-16 flex flex-col justify-start items-center px-2 sm:px-4 md:px-8 lg:px-0 w-full sm:pl-0 sm:pr-0 pl-0 pr-0">
      <div className="w-full max-w-[937px] lg:w-[937px] flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        <div className="self-stretch rounded-[3px] flex flex-col justify-center items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeIn}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <Badge
              icon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="6" height="6" rx="1" stroke="#37322F" strokeWidth="1" fill="none" />
                  <path d="M6 1V3M6 9V11M1 6H3M9 6H11" stroke="#37322F" strokeWidth="1" strokeLinecap="round" />
                </svg>
              }
              text="AI Research Lab"
            />
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE_OUT }}
            className="w-full max-w-[820px] lg:w-[820px] text-center flex justify-center flex-col text-[#37322F] text-[28px] xs:text-[32px] sm:text-[42px] md:text-[58px] lg:text-[76px] font-normal leading-[1.1] sm:leading-[1.15] md:leading-[1.2] lg:leading-[1.05] font-serif px-2 sm:px-4 md:px-0"
          >
            Powering AI, From Compute to Code
          </motion.h1>

          <div className="w-full max-w-[640px] text-center flex justify-center flex-col text-[rgba(55,50,47,0.80)] sm:text-lg md:text-xl leading-[1.4] sm:leading-[1.45] md:leading-[1.5] lg:leading-7 font-sans px-2 sm:px-4 md:px-0 lg:text-lg font-medium text-sm">
            We&apos;re an AI research lab providing GPU infrastructure, compute access, and deep technical expertise in
            software engineering and model training, building research-driven solutions like our own AI-powered
            accounting software.
          </div>
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT }}
        className="w-full max-w-[560px] flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 relative z-10 mt-6 sm:mt-8 md:mt-10 lg:mt-12"
      >
        <div className="backdrop-blur-[8.25px] flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
          <motion.a
            href="#compute-request"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="h-10 sm:h-11 md:h-12 px-6 sm:px-8 md:px-10 lg:px-12 py-2 sm:py-[6px] relative bg-[#37322F] shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] overflow-hidden rounded-full flex justify-center items-center gap-2 hover:bg-[#2A2520] transition-colors"
          >
            <div className="w-20 sm:w-24 md:w-28 lg:w-44 h-[41px] absolute left-0 top-[-0.5px] bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
            <div className="flex flex-col justify-center text-white text-sm sm:text-base md:text-[15px] font-medium leading-5 font-sans relative">
              Get Started
            </div>
            <span className="text-white relative">
              <ArrowIcon />
            </span>
          </motion.a>

          <motion.a
            href="#research"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="h-10 sm:h-11 md:h-12 px-6 sm:px-8 md:px-10 lg:px-12 py-2 sm:py-[6px] bg-white border border-[rgba(55,50,47,0.16)] shadow-[0px_1px_2px_rgba(55,50,47,0.08)] overflow-hidden rounded-full flex justify-center items-center hover:bg-[rgba(55,50,47,0.03)] transition-colors"
          >
            <div className="flex flex-col justify-center text-[#37322F] text-sm sm:text-base md:text-[15px] font-medium leading-5 font-sans">
              Explore Our Research
            </div>
          </motion.a>
        </div>
      </motion.div>

      {/* Rectangular grid-box pattern behind the hero content, fading out toward the edges */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: EASE_OUT }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(55,50,47,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(55,50,47,0.14) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 65% 55% at 50% 32%, black 35%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 32%, black 35%, transparent 85%)",
        }}
      />

      <div className="w-full max-w-[960px] lg:w-[960px] pt-2 sm:pt-4 pb-6 sm:pb-8 md:pb-10 lg:pb-0 px-2 sm:px-4 md:px-6 lg:px-11 flex flex-col justify-center items-center gap-2 relative z-5 mt-8 sm:mt-12 md:mt-16 lg:mt-16">
        <GpuVisual />
      </div>
    </div>
  )
}

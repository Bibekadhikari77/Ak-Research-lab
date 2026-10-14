"use client";

import type React from "react";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

// Tilts the GPU visual in 3D space as it scrolls up into view, then settles flat.
function GpuVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 40%"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <div
      ref={ref}
      style={{ perspective: "1600px" }}
      className="w-full max-w-[960px] lg:w-[960px]"
    >
      <motion.div
        style={{ rotateX, scale, y, opacity, transformStyle: "preserve-3d" }}
        className="relative h-[200px] w-full max-w-[960px] overflow-hidden rounded-[6px] bg-white shadow-[0px_10px_40px_rgba(55,50,47,0.18)] sm:h-[280px] sm:rounded-[8px] md:h-[450px] lg:h-[520px] lg:w-[960px] lg:rounded-[9.06px]"
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
  );
}

// Badge component (local copy matching the pattern already used in every section file)
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

// Slow-drifting, slowly-spinning rectangle outlines scattered behind the hero content.
const FLOATING_BOXES = [
  {
    top: "8%",
    left: "6%",
    size: 120,
    spinDuration: 22,
    spinReverse: false,
    floatDuration: 9,
    delay: 0,
  },
  {
    top: "62%",
    left: "10%",
    size: 70,
    spinDuration: 16,
    spinReverse: true,
    floatDuration: 7.5,
    delay: 0.6,
  },
  {
    top: "14%",
    left: "84%",
    size: 90,
    spinDuration: 19,
    spinReverse: false,
    floatDuration: 8.5,
    delay: 0.3,
  },
  {
    top: "68%",
    left: "88%",
    size: 140,
    spinDuration: 26,
    spinReverse: true,
    floatDuration: 10,
    delay: 0.9,
  },
  {
    top: "40%",
    left: "50%",
    size: 60,
    spinDuration: 13,
    spinReverse: false,
    floatDuration: 6.5,
    delay: 1.2,
  },
] as const;

function FloatingBoxes() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {FLOATING_BOXES.map((box, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: box.top,
            left: box.left,
            width: box.size,
            height: box.size,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, -22, 0] }}
          transition={{
            opacity: { duration: 1, delay: box.delay, ease: EASE_OUT },
            y: {
              duration: box.floatDuration,
              delay: box.delay,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
        >
          <motion.div
            className="h-full w-full rounded-2xl border border-[rgba(55,50,47,0.14)] bg-[rgba(55,50,47,0.02)]"
            animate={{ rotate: box.spinReverse ? -360 : 360 }}
            transition={{
              duration: box.spinDuration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// Trailing forward-arrow used on the primary CTA pattern
function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.33334 8H12.6667M12.6667 8L8.66667 4M12.6667 8L8.66667 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HeroAISection() {
  return (
    <div className="relative flex w-full flex-col items-center justify-start overflow-hidden px-2 pt-16 pr-0 pb-8 pl-0 sm:px-4 sm:pt-20 sm:pr-0 sm:pb-12 sm:pl-0 md:px-8 md:pt-24 md:pb-16 lg:px-0 lg:pt-[216px]">
      <div className="flex w-full max-w-[937px] flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:w-[937px] lg:gap-6">
        <div className="flex flex-col items-center justify-center gap-4 self-stretch rounded-[3px] sm:gap-5 md:gap-6 lg:gap-8">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeIn}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
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
                    x="3"
                    y="3"
                    width="6"
                    height="6"
                    rx="1"
                    stroke="#37322F"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M6 1V3M6 9V11M1 6H3M9 6H11"
                    stroke="#37322F"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
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
            className="xs:text-[32px] flex w-full max-w-[820px] flex-col justify-center px-2 text-center font-serif text-[28px] leading-[1.1] font-normal text-[#37322F] sm:px-4 sm:text-[42px] sm:leading-[1.15] md:px-0 md:text-[58px] md:leading-[1.2] lg:w-[820px] lg:text-[76px] lg:leading-[1.05]"
          >
            Powering AI, From Compute to Code
          </motion.h1>

          <div className="flex w-full max-w-[640px] flex-col justify-center px-2 text-center font-sans text-sm leading-[1.4] font-medium text-[rgba(55,50,47,0.80)] sm:px-4 sm:text-lg sm:leading-[1.45] md:px-0 md:text-xl md:leading-[1.5] lg:text-lg lg:leading-7">
            We&apos;re an AI research lab providing GPU infrastructure, compute
            access, and deep technical expertise in software engineering and
            model training, building research-driven solutions like our own
            AI-powered accounting software.
          </div>
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT }}
        className="relative z-10 mt-6 flex w-full max-w-[560px] flex-col items-center justify-center gap-6 sm:mt-8 sm:gap-8 md:mt-10 md:gap-10 lg:mt-12 lg:gap-12"
      >
        <div className="flex flex-col items-center justify-center gap-3 backdrop-blur-[8.25px] sm:flex-row sm:gap-4">
          <motion.a
            href="/#compute-request"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="relative flex h-10 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#37322F] px-6 py-2 shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] transition-colors hover:bg-[#2A2520] sm:h-11 sm:px-8 sm:py-[6px] md:h-12 md:px-10 lg:px-12"
          >
            <div className="absolute top-[-0.5px] left-0 h-[41px] w-20 bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply sm:w-24 md:w-28 lg:w-44"></div>
            <div className="relative flex flex-col justify-center font-sans text-sm leading-5 font-medium text-white sm:text-base md:text-[15px]">
              Get Started
            </div>
            <span className="relative text-white">
              <ArrowIcon />
            </span>
          </motion.a>

          <motion.a
            href="/#research"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="flex h-10 items-center justify-center overflow-hidden rounded-full border border-[rgba(55,50,47,0.16)] bg-white px-6 py-2 shadow-[0px_1px_2px_rgba(55,50,47,0.08)] transition-colors hover:bg-[rgba(55,50,47,0.03)] sm:h-11 sm:px-8 sm:py-[6px] md:h-12 md:px-10 lg:px-12"
          >
            <div className="flex flex-col justify-center font-sans text-sm leading-5 font-medium text-[#37322F] sm:text-base md:text-[15px]">
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
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(55,50,47,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(55,50,47,0.14) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 65% 55% at 50% 32%, black 35%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 55% at 50% 32%, black 35%, transparent 85%)",
        }}
      />

      <FloatingBoxes />

      <div className="relative z-5 mt-8 flex w-full max-w-[960px] flex-col items-center justify-center gap-2 px-2 pt-2 pb-6 sm:mt-12 sm:px-4 sm:pt-4 sm:pb-8 md:mt-16 md:px-6 md:pb-10 lg:mt-16 lg:w-[960px] lg:px-11 lg:pb-0">
        <GpuVisual />
      </div>
    </div>
  );
}

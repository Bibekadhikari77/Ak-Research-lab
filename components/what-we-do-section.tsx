"use client";

import type React from "react";
import { motion } from "motion/react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

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

const pillars = [
  {
    title: "GPU Infrastructure & Compute Access",
    description:
      "On-demand GPU power and compute management built for AI workloads at any scale.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="5"
          rx="1"
          stroke="#37322F"
          strokeWidth="1.5"
        />
        <rect
          x="3"
          y="15"
          width="18"
          height="5"
          rx="1"
          stroke="#37322F"
          strokeWidth="1.5"
        />
        <circle cx="7" cy="6.5" r="0.75" fill="#37322F" />
        <circle cx="7" cy="17.5" r="0.75" fill="#37322F" />
      </svg>
    ),
  },
  {
    title: "AI Model Training & Research",
    description:
      "Applied research and hands-on expertise across the model development lifecycle.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="1.75" fill="#37322F" />
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="3.75"
          stroke="#37322F"
          strokeWidth="1.3"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="3.75"
          stroke="#37322F"
          strokeWidth="1.3"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="3.75"
          stroke="#37322F"
          strokeWidth="1.3"
          transform="rotate(120 12 12)"
        />
      </svg>
    ),
  },
  {
    title: "Software Engineering R&D",
    description:
      "Research-driven engineering that turns experimental ideas into production-grade systems.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 6L3 12L8 18M16 6L21 12L16 18"
          stroke="#37322F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "AI-Powered Products",
    description:
      "Real-world applications built on our own infrastructure, starting with AI accounting software.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 3L13.8 9.2L20 11L13.8 12.8L12 19L10.2 12.8L4 11L10.2 9.2L12 3Z"
          stroke="#37322F"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function WhatWeDoSection() {
  return (
    <section
      id="what-we-do"
      className="flex w-full scroll-mt-24 flex-col items-center justify-center border-b border-[rgba(55,50,47,0.12)]"
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-6 self-stretch border-b border-[rgba(55,50,47,0.12)] px-6 py-8 md:px-24 md:py-10">
        <div className="flex w-full max-w-[586px] flex-col items-center justify-start gap-4 overflow-hidden rounded-lg px-6 py-5">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
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
                    x="1"
                    y="1"
                    width="4"
                    height="4"
                    stroke="#37322F"
                    strokeWidth="1"
                    fill="none"
                  />
                  <rect
                    x="7"
                    y="1"
                    width="4"
                    height="4"
                    stroke="#37322F"
                    strokeWidth="1"
                    fill="none"
                  />
                  <rect
                    x="1"
                    y="7"
                    width="4"
                    height="4"
                    stroke="#37322F"
                    strokeWidth="1"
                    fill="none"
                  />
                  <rect
                    x="7"
                    y="7"
                    width="4"
                    height="4"
                    stroke="#37322F"
                    strokeWidth="1"
                    fill="none"
                  />
                </svg>
              }
              text="What We Do"
            />
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
            className="flex flex-col justify-center self-stretch text-center font-sans text-3xl leading-tight font-semibold tracking-tight text-[#49423D] md:text-5xl md:leading-[60px]"
          >
            One Lab, Four Capabilities
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeIn}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
            className="self-stretch text-center font-sans text-base leading-7 font-normal text-[#605A57]"
          >
            We operate across the full AI stack, from raw compute to a finished
            product.
          </motion.p>
        </div>
      </div>

      {/* Pillar grid */}
      <div className="flex items-start justify-center self-stretch">
        <div className="grid flex-1 grid-cols-1 gap-0 border-r border-l border-[rgba(55,50,47,0.12)] sm:grid-cols-2">
          {pillars.map((pillar, index) => {
            const isRightColumn = index % 2 === 1;
            const isBottomRow = index >= 2;
            return (
              <motion.div
                key={pillar.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
                transition={{
                  duration: 0.7,
                  delay: (index % 2) * 0.1,
                  ease: EASE_OUT,
                }}
                className={`flex flex-col items-start justify-start gap-4 p-6 sm:p-8 md:p-10 ${
                  isRightColumn
                    ? ""
                    : "border-[rgba(55,50,47,0.12)] sm:border-r"
                } ${isBottomRow ? "" : "border-b border-[rgba(55,50,47,0.12)]"}`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[rgba(55,50,47,0.10)] bg-[rgba(55,50,47,0.04)]">
                  {pillar.icon}
                </div>
                <h3 className="font-sans text-lg leading-tight font-semibold text-[#37322F] sm:text-xl">
                  {pillar.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed font-normal text-[#605A57] md:text-base">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

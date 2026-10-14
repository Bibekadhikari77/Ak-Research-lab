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

const focusAreas = [
  "Model training & fine-tuning",
  "Distributed training systems",
  "Model evaluation & benchmarking",
  "Applied AI research for production use cases",
];

export default function ResearchSection() {
  return (
    <section
      id="research"
      className="relative flex w-full scroll-mt-24 flex-col items-center justify-center overflow-hidden border-b border-[rgba(55,50,47,0.12)]"
    >
      {/* Rectangular grid-box pattern behind the research content, fading out toward the edges */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: EASE_OUT }}
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(55,50,47,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(55,50,47,0.14) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 65% 60% at 50% 45%, black 35%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 60% at 50% 45%, black 35%, transparent 85%)",
        }}
      />

      <div className="relative z-10 flex items-center justify-center gap-6 self-stretch px-6 py-8 md:px-24 md:py-10">
        <div className="flex w-full max-w-[720px] flex-col items-center justify-center gap-8 md:flex-row-reverse md:items-start md:gap-16">
          <div className="flex flex-1 flex-col items-start justify-start gap-4">
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
                    <circle cx="6" cy="6" r="1" fill="#37322F" />
                    <ellipse
                      cx="6"
                      cy="6"
                      rx="5"
                      ry="2"
                      stroke="#37322F"
                      strokeWidth="0.8"
                    />
                    <ellipse
                      cx="6"
                      cy="6"
                      rx="5"
                      ry="2"
                      stroke="#37322F"
                      strokeWidth="0.8"
                      transform="rotate(60 6 6)"
                    />
                    <ellipse
                      cx="6"
                      cy="6"
                      rx="5"
                      ry="2"
                      stroke="#37322F"
                      strokeWidth="0.8"
                      transform="rotate(120 6 6)"
                    />
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
              className="font-sans text-3xl leading-tight font-semibold tracking-tight text-[#49423D] md:text-4xl"
            >
              Applied Research. Real-World Models.
            </motion.h2>

            <p className="font-sans text-base leading-7 font-normal text-[#605A57]">
              We&apos;re a research lab first. Our engineers and researchers
              work hands-on with model architecture, training pipelines,
              fine-tuning, and evaluation. That expertise directly shapes the
              infrastructure we build and the products we ship.
            </p>

            <motion.a
              href="/#compute-request"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeIn}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
              className="mt-2 flex items-center justify-center overflow-hidden rounded-[99px] border border-[rgba(55,50,47,0.16)] bg-white px-6 py-[10px] transition-colors hover:bg-[rgba(55,50,47,0.03)]"
            >
              <div className="font-sans text-[13px] leading-5 font-medium text-[#37322F]">
                Partner With Our Lab
              </div>
            </motion.a>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeIn}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
            className="w-full flex-1"
          >
            <ul className="flex flex-col items-start justify-start gap-3">
              {focusAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-center justify-start gap-3 self-stretch rounded-lg border border-[rgba(2,6,23,0.08)] bg-[#F7F5F3] px-4 py-3"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white">
                    <Check />
                  </span>
                  <span className="flex-1 font-sans text-sm leading-5 font-normal text-[rgba(55,50,47,0.85)]">
                    {area}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

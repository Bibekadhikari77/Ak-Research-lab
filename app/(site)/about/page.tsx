import type { Metadata } from "next";
import { CtaBand } from "@/components/home/highlights";
import { PageHero } from "@/components/page-hero";
import About from "@/components/sections/about";
import WhyUs from "@/components/sections/why-us";

export const metadata: Metadata = {
  title: "About",
  description:
    "AK Research Lab is a technology research and engineering company in Kathmandu, Nepal, and the team behind MeroIMS.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About AK Research Lab"
        title="Research that becomes real-world technology"
        description="AK Research Lab is a technology research and engineering company working across applied AI research, software engineering, and business software. We take ideas from experiment to production, and we apply the same capabilities to products we build ourselves, such as MeroIMS."
      />
      <About intro={false} />
      <WhyUs />
      <CtaBand />
    </>
  );
}

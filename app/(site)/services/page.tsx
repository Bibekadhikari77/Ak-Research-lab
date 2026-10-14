import type { Metadata } from "next";
import { CtaBand } from "@/components/home/highlights";
import { PageHero } from "@/components/page-hero";
import Services from "@/components/sections/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI research and development, software engineering and consulting, and AI-powered business solutions from AK Research Lab.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="What we do"
        description="From research and prototyping to production-ready software, we help turn technical ideas into usable solutions."
      />
      <Services intro={false} />
      <CtaBand />
    </>
  );
}

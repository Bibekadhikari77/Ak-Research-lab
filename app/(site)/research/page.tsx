import type { Metadata } from "next";
import { CtaBand } from "@/components/home/highlights";
import { PageHero } from "@/components/page-hero";
import Research from "@/components/sections/research";
import { ButtonLink } from "@/components/ui/button-link";
import { contactHref } from "@/lib/inquiry";

export const metadata: Metadata = {
  title: "Research",
  description:
    "AK Research Lab's applied research in model training, evaluation, distributed training, and AI applications, backed by our own GPU infrastructure.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Research"
        title="Applied research. Practical engineering. Measurable progress."
        description="Our research focuses on problems that come up when AI meets real systems, from training and evaluating models to running them reliably in production, backed by our own GPU infrastructure."
      >
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={contactHref("research")} size="lg" arrow>
            Partner With Our Lab
          </ButtonLink>
          <ButtonLink href="#research-compute" size="lg" variant="outline-dark">
            Research compute
          </ButtonLink>
        </div>
      </PageHero>
      <Research intro={false} />
      <CtaBand />
    </>
  );
}

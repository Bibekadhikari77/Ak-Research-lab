import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import MeroimsFeatureTabs from "@/components/meroims/feature-tabs";
import { PageHero } from "@/components/page-hero";
import { FlagshipBadge } from "@/components/meroims/flagship-badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactHref } from "@/lib/inquiry";
import {
  meroimsBenefits,
  meroimsDescription,
  meroimsFeatures,
  meroimsIndustries,
  meroimsModules,
  meroimsTagline,
  meroimsWorkflow,
} from "@/lib/meroims";
import { meroimsLinks, siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Solutions — MeroIMS",
  description:
    "MeroIMS, the flagship product of AK Research Lab: AI-powered inventory, VAT billing, sales, purchases, accounting, and reporting in one connected system.",
  alternates: { canonical: "/solutions" },
};

const softwareApplication = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MeroIMS",
  url: meroimsLinks.site,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: meroimsDescription,
  featureList: meroimsFeatures.map((feature) => feature.title),
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

const meroimsSuites = meroimsFeatures.filter((feature) =>
  ["restaurant", "ecommerce"].includes(feature.id),
);

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={softwareApplication} />
      <PageHero
        eyebrow="Solutions"
        title="Solutions built to solve real business problems"
        description="AK Research Lab turns research and engineering expertise into practical technology. Our flagship product, MeroIMS, helps businesses run inventory, billing, and accounting from one place."
      />

      {/* Product overview */}
      <section
        aria-labelledby="meroims-title"
        className="bg-surface py-16 sm:py-24"
      >
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <Image
                src="/meroims/logo.png"
                alt="MeroIMS logo"
                width={64}
                height={64}
                className="h-16 w-16 rounded-2xl border border-slate-200 bg-white p-2"
              />
              <FlagshipBadge />
            </div>
            <h2
              id="meroims-title"
              className="text-3xl leading-tight font-semibold tracking-tight text-balance text-slate-950 sm:text-4xl"
            >
              MeroIMS — AI-powered inventory, accounting, and business
              management
            </h2>
            <p className="text-lg leading-8 font-medium text-emerald-800">
              {meroimsTagline}
            </p>
            <p className="text-base leading-7 text-slate-600">
              {meroimsDescription}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={meroimsLinks.site}
                external
                size="lg"
                className="bg-emerald-600 shadow-none hover:bg-emerald-500"
              >
                Explore MeroIMS
              </ButtonLink>
              <ButtonLink
                href={contactHref("meroims-demo")}
                variant="outline"
                size="lg"
              >
                Request a Demo
              </ButtonLink>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-3">
            {meroimsFeatures
              .filter((feature) => feature.image)
              .slice(0, 4)
              .map((feature, index) => (
                <Reveal
                  as="li"
                  index={index}
                  key={feature.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                >
                  <Image
                    src={feature.image!.src}
                    alt={feature.image!.alt}
                    width={1024}
                    height={1024}
                    sizes="(min-width: 1024px) 220px, 50vw"
                    className="aspect-square w-full object-cover"
                  />
                  <p className="px-3 py-2.5 text-xs font-medium text-slate-700">
                    {feature.tab}
                  </p>
                </Reveal>
              ))}
          </ul>
        </Container>
      </section>

      {/* Features */}
      <section
        aria-labelledby="features-title"
        className="border-surface-line bg-surface-2 border-y py-16 sm:py-24"
      >
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Features"
            id="features-title"
            title="Everything a growing business runs on"
            description="Explore the core areas of MeroIMS. Every module shares the same records, so work done in one place shows up everywhere it matters."
          />
          <MeroimsFeatureTabs />
        </Container>
      </section>

      {/* Restaurant and e-commerce suites */}
      <section
        aria-labelledby="suites-title"
        className="bg-surface py-16 sm:py-24"
      >
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Restaurant & E-commerce"
            id="suites-title"
            title="Run the restaurant floor and sell online"
            description="Dedicated suites for restaurants and online selling, built on the same MeroIMS records as your stock and accounts."
          />
          <ul className="grid gap-6 md:grid-cols-2">
            {meroimsSuites.map((suite, index) => (
              <Reveal
                as="li"
                index={index}
                key={suite.id}
                className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-gradient-to-b from-emerald-50/60 to-white p-6 sm:p-8"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-slate-950">
                    {suite.title}
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">
                    {suite.summary}
                  </p>
                </div>
                <ul className="flex flex-col gap-3">
                  {suite.modules?.map((module) => (
                    <li
                      key={module.name}
                      className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                        strokeWidth={3}
                      />
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900">
                          {module.name}
                        </span>
                        <span className="text-sm text-slate-600">
                          {module.description}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Workflow */}
      <section
        aria-labelledby="workflow-title"
        className="border-surface-line bg-surface-2 border-y py-16 sm:py-24"
      >
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Connected workflow"
            id="workflow-title"
            title="From first lead to final report"
            description="MeroIMS follows a business transaction end to end, so nothing has to be re-entered between steps."
          />
          <ol className="flex flex-wrap items-center gap-2">
            {meroimsWorkflow.map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-800 shadow-xs">
                  {step}
                </span>
                {index < meroimsWorkflow.length - 1 ? (
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-slate-400"
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Benefits */}
      <section
        aria-labelledby="benefits-title"
        className="bg-ink relative isolate overflow-hidden py-16 sm:py-24"
      >
        <div
          aria-hidden="true"
          className="bg-tech-grid absolute inset-0 -z-10"
        />
        <Container className="flex flex-col gap-12">
          <SectionHeading
            tone="dark"
            eyebrow="Business benefits"
            id="benefits-title"
            title="What MeroIMS does for a business"
          />
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {meroimsBenefits.map((benefit, index) => (
              <Reveal
                as="li"
                index={index}
                key={benefit.title}
                className="bg-ink-raised flex flex-col gap-3 p-6"
              >
                <h3 className="text-base font-semibold text-white">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-6 text-slate-400">
                  {benefit.description}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Modules and industries */}
      <section
        aria-labelledby="modules-title"
        className="bg-surface py-16 sm:py-24"
      >
        <Container className="grid gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="Modules"
              id="modules-title"
              title="More modules, one login"
              description="Beyond the core, MeroIMS includes modules for customers, projects, people, and controls."
            />
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {meroimsModules.map((module) => (
                <li
                  key={module}
                  className="flex items-center gap-2 text-sm text-slate-700"
                >
                  <Check
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 text-emerald-600"
                    strokeWidth={3}
                  />
                  {module}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="Industries"
              title="Built for many kinds of business"
              description="MeroIMS is designed for businesses across these industries."
            />
            <ul className="flex flex-wrap gap-2">
              {meroimsIndustries.map((industry) => (
                <li
                  key={industry}
                  className="rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-sm font-medium text-emerald-900"
                >
                  {industry}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-surface-line bg-surface-2 border-t py-16 sm:py-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white sm:p-12 lg:flex-row lg:items-center">
            <div className="flex max-w-xl flex-col gap-3">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                See MeroIMS with your own workflow
              </h2>
              <p className="text-base leading-7 text-emerald-50">
                Book a demo with our team, or explore plans and documentation on
                the MeroIMS website.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink
                href={contactHref("meroims-demo")}
                size="lg"
                className="bg-white text-emerald-800 shadow-none hover:bg-emerald-50"
              >
                Request a Demo
              </ButtonLink>
              <ButtonLink
                href={meroimsLinks.pricing}
                external
                size="lg"
                variant="outline-dark"
              >
                View pricing
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

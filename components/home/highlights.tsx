import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Code2,
  FlaskConical,
  Network,
  ShoppingCart,
  Sparkles,
  Store,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { FlagshipBadge } from "@/components/meroims/flagship-badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { contactHref } from "@/lib/inquiry";
import { meroimsTagline } from "@/lib/meroims";
import { meroimsLinks, siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/reveal";

// Short previews for the homepage. Each links to the page with full detail,
// so the homepage stays focused on what matters most.

function MoreLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="group text-brand-700 hover:text-brand-900 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}

const pillars = [
  {
    title: "Research",
    description: "Applied AI experiments that solve real problems.",
  },
  {
    title: "Engineering",
    description: "Production-grade software, APIs, and integrations.",
  },
  {
    title: "Products",
    description: "Our own AI-powered software, led by MeroIMS.",
  },
];

export function AboutHighlight() {
  return (
    <section
      aria-labelledby="about-highlight-title"
      className="bg-surface py-20 sm:py-24"
    >
      <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
        <div className="flex flex-col items-start gap-6">
          <SectionHeading
            eyebrow="About us"
            id="about-highlight-title"
            title="Research that becomes real-world technology"
            description="AK Research Lab is a research and engineering company in Kathmandu. We take ideas from experiment to production, and we apply the same capabilities to products we build ourselves."
          />
          <MoreLink href="/about">More about AK Research Lab</MoreLink>
        </div>
        <ol className="grid gap-3">
          {pillars.map((pillar, index) => (
            <Reveal
              as="li"
              index={index}
              key={pillar.title}
              className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white px-5 py-5"
            >
              <span className="text-brand-700 font-mono text-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base font-semibold text-slate-950">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

const serviceHighlights: {
  Icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    Icon: FlaskConical,
    title: "AI Research & Development",
    description: "Prototypes and feasibility studies for real problems.",
  },
  {
    Icon: Code2,
    title: "Software Engineering & Consulting",
    description: "Backend architecture, APIs, and system integration.",
  },
  {
    Icon: Sparkles,
    title: "AI-Powered Business Solutions",
    description: "Automation, analytics, and AI in everyday tools.",
  },
];

export function ServicesHighlight() {
  return (
    <section
      aria-labelledby="services-highlight-title"
      className="border-surface-line bg-surface-2 border-y py-20 sm:py-24"
    >
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Services"
            id="services-highlight-title"
            title="What we do"
          />
          <MoreLink href="/services">Explore all services</MoreLink>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {serviceHighlights.map(({ Icon, title, description }, index) => (
            <Reveal
              as="li"
              index={index}
              key={title}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6"
            >
              <span className="text-gold-300 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
              <p className="text-sm leading-6 text-slate-600">{description}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

const productHighlights: { Icon: LucideIcon; label: string }[] = [
  { Icon: BarChart3, label: "Inventory & accounting" },
  { Icon: ShoppingCart, label: "VAT billing & POS" },
  { Icon: UtensilsCrossed, label: "Restaurant" },
  { Icon: Store, label: "E-commerce" },
  { Icon: Sparkles, label: "AI Assistant" },
];

export function SolutionsHighlight() {
  return (
    <section
      aria-labelledby="solutions-highlight-title"
      className="bg-surface py-20 sm:py-24"
    >
      <Container>
        <Reveal
          as="div"
          className="grid gap-10 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-white p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:p-12"
        >
          <div className="flex flex-col items-start gap-5">
            <Eyebrow>Solutions</Eyebrow>
            <div className="flex flex-wrap items-center gap-4">
              <Image
                src="/meroims/logo.png"
                alt="MeroIMS logo"
                width={56}
                height={56}
                className="h-14 w-14 rounded-xl border border-slate-200 bg-white p-1.5"
              />
              <FlagshipBadge />
            </div>
            <h2
              id="solutions-highlight-title"
              className="text-3xl leading-tight font-semibold tracking-tight text-balance text-slate-950 sm:text-4xl"
            >
              MeroIMS — AI-powered inventory, accounting, and business
              management
            </h2>
            <p className="text-base leading-7 text-slate-600">
              {meroimsTagline} Built in-house by AK Research Lab.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink
                href="/solutions"
                size="lg"
                arrow
                className="bg-emerald-600 shadow-none hover:bg-emerald-500"
              >
                See MeroIMS features
              </ButtonLink>
              <ButtonLink
                href={meroimsLinks.site}
                external
                variant="outline"
                size="lg"
              >
                Visit meroims.com
              </ButtonLink>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {productHighlights.map(({ Icon, label }, index) => (
              <Reveal
                as="li"
                index={index}
                key={label}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-xs"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <Icon aria-hidden="true" className="h-4.5 w-4.5" />
                </span>
                <span className="text-sm font-medium text-slate-800">
                  {label}
                </span>
              </Reveal>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

const researchHighlights: { Icon: LucideIcon; title: string }[] = [
  { Icon: Brain, title: "Model training & fine-tuning" },
  { Icon: BarChart3, title: "Evaluation & benchmarking" },
  { Icon: Network, title: "Distributed training systems" },
  { Icon: FlaskConical, title: "Research-to-production" },
];

export function ResearchHighlight() {
  return (
    <section
      aria-labelledby="research-highlight-title"
      className="bg-ink relative isolate overflow-hidden py-20 sm:py-24"
    >
      <div aria-hidden="true" className="bg-tech-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="bg-gold-500/10 absolute -right-40 bottom-0 -z-10 h-[360px] w-[560px] rounded-full blur-[120px]"
      />
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <SectionHeading
            tone="dark"
            eyebrow="Research"
            id="research-highlight-title"
            title="Applied research. Practical engineering."
            description="From training and evaluating models to running them reliably in production, backed by our own GPU infrastructure."
          />
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/research" size="lg" arrow>
              Explore Our Research
            </ButtonLink>
            <ButtonLink
              href={contactHref("research")}
              size="lg"
              variant="outline-dark"
            >
              Partner With Our Lab
            </ButtonLink>
          </div>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {researchHighlights.map(({ Icon, title }, index) => (
            <Reveal
              as="li"
              index={index}
              key={title}
              className="bg-ink-raised flex items-center gap-4 p-6"
            >
              <span className="text-gold-300 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-white">{title}</span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function CtaBand() {
  return (
    <section
      id="get-started"
      aria-labelledby="cta-title"
      className="bg-surface py-20 sm:py-24"
    >
      <Container>
        <Reveal
          as="div"
          className="bg-ink relative isolate flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl p-8 sm:p-12 lg:flex-row lg:items-center"
        >
          <div
            aria-hidden="true"
            className="bg-tech-grid absolute inset-0 -z-10"
          />
          <div
            aria-hidden="true"
            className="bg-brand-600/25 absolute -top-20 -left-20 -z-10 h-[300px] w-[500px] rounded-full blur-[100px]"
          />
          <div className="flex max-w-xl flex-col gap-3">
            <h2
              id="cta-title"
              className="text-2xl font-semibold tracking-tight text-balance text-white sm:text-3xl"
            >
              Let&apos;s build something meaningful with AI
            </h2>
            <p className="text-base leading-7 text-slate-300">
              Tell us what you&apos;re working on, or email us at{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-gold-300 font-medium underline-offset-4 hover:underline"
              >
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href={contactHref()} size="lg" arrow>
              Get Started
            </ButtonLink>
            <ButtonLink
              href={contactHref("meroims-demo")}
              size="lg"
              variant="outline-dark"
            >
              Request a MeroIMS Demo
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Calculator,
  Cloud,
  Code2,
  Receipt,
  Sparkles,
  Store,
  UtensilsCrossed,
  Workflow,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { contactHref } from "@/lib/inquiry";
import { meroimsLinks } from "@/lib/site-config";

const meroimsHighlights = [
  { Icon: Boxes, label: "Inventory" },
  { Icon: Receipt, label: "VAT billing" },
  { Icon: Calculator, label: "Accounting" },
  { Icon: UtensilsCrossed, label: "Restaurant" },
  { Icon: Store, label: "Web store" },
  { Icon: Sparkles, label: "AI assistant" },
];

const capabilities = [
  { Icon: Cloud, label: "Cloud Computing" },
  { Icon: Code2, label: "Software Engineering" },
  { Icon: Workflow, label: "Business Automation" },
  { Icon: Boxes, label: "AI Products" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="bg-ink relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      <div
        aria-hidden="true"
        className="bg-tech-grid absolute inset-0 -z-10 opacity-80"
      />
      <div
        aria-hidden="true"
        className="bg-brand-600/20 absolute top-0 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-[120px]"
      />

      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
        <div className="animate-in fade-in slide-in-from-bottom-3 flex flex-col items-start gap-7 duration-700">
          <Eyebrow tone="dark">AI Research Lab · Kathmandu, Nepal</Eyebrow>
          <h1
            id="hero-title"
            className="text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-[3.5rem]"
          >
            Powering AI,{" "}
            <span className="from-brand-300 via-brand-200 to-gold-300 bg-gradient-to-r bg-clip-text text-transparent">
              from research to code
            </span>
          </h1>
          <p className="max-w-xl text-base leading-7 text-pretty text-slate-300 sm:text-lg sm:leading-8">
            Applied AI research and production-grade engineering, turned into
            practical software, including MeroIMS, our AI-powered platform for
            inventory, billing, and accounting.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href={contactHref()} size="lg" arrow>
              Get Started
            </ButtonLink>
            <ButtonLink href="/research" size="lg" variant="outline-dark">
              Explore Our Research
            </ButtonLink>
          </div>
          <a
            href={meroimsLinks.site}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-emerald-300 transition-colors hover:text-emerald-200"
          >
            Discover MeroIMS
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
            <span className="sr-only">(opens meroims.com in a new tab)</span>
          </a>
        </div>

        <div className="animate-in fade-in relative duration-1000">
          <div className="bg-ink-raised relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_120px_-40px_rgb(91_72_230/0.55)]">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 font-mono text-[11px] text-slate-500">
                app.meroims.com/dashboard
              </span>
            </div>
            <Image
              src="/meroims/dashboard.png"
              alt="MeroIMS dashboard showing revenue, profit, cash position, receivables, stock value, and sales charts"
              width={1835}
              height={961}
              priority
              sizes="(min-width: 1024px) 640px, 100vw"
              className="h-auto w-full bg-white"
            />
            <Link
              href="/solutions"
              className="group flex items-center gap-3 border-t border-white/10 px-4 py-3 transition-colors hover:bg-white/5"
            >
              <Image
                src="/meroims/logo.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 shrink-0 rounded-lg bg-white p-1"
              />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="font-mono text-[10px] tracking-wider text-emerald-300 uppercase">
                  Built in-house by AK Research Lab
                </span>
                <span className="truncate text-sm font-medium text-white">
                  MeroIMS: AI-powered inventory, accounting &amp; business
                  management
                </span>
              </span>
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-emerald-300 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </Container>

      <Container className="mt-20 sm:mt-24">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/10">
          <div className="bg-ink flex flex-col gap-3 px-4 pt-4 pb-1 sm:px-5">
            <p className="font-mono text-[11px] tracking-[0.14em] text-slate-400 uppercase">
              AK Research Lab
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-px sm:grid-cols-4">
            {capabilities.map(({ Icon, label }) => (
              <li
                key={label}
                className="bg-ink flex items-center gap-3 px-4 py-4 text-sm font-medium text-slate-200 sm:px-5"
              >
                <Icon
                  aria-hidden="true"
                  className="text-gold-300 h-4 w-4 shrink-0"
                />
                {label}
              </li>
            ))}
          </ul>
          <div className="bg-ink mt-px flex items-center justify-between gap-3 px-4 pt-4 pb-1 sm:px-5">
            <p className="font-mono text-[11px] tracking-[0.14em] text-emerald-300/80 uppercase">
              MeroIMS includes
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6">
            {meroimsHighlights.map(({ Icon, label }) => (
              <li
                key={label}
                className="bg-ink flex items-center gap-3 px-4 py-4 text-sm font-medium text-emerald-50 sm:px-5"
              >
                <Icon
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-emerald-300"
                />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

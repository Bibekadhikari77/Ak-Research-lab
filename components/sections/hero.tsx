import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Boxes, Code2, FlaskConical, Workflow } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { contactHref } from "@/lib/inquiry";

const capabilities = [
  { Icon: FlaskConical, label: "Applied AI Research" },
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

      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
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
            AK Research Lab combines applied AI research and production-grade
            software engineering to turn complex technical challenges into
            practical solutions. We build our own AI-powered products, including
            MeroIMS, and bring the same expertise to teams building the next
            generation of AI applications.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href={contactHref()} size="lg" arrow>
              Get Started
            </ButtonLink>
            <ButtonLink href="/research" size="lg" variant="outline-dark">
              Explore Our Research
            </ButtonLink>
          </div>
          <Link
            href="/solutions"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-emerald-300 transition-colors hover:text-emerald-200"
          >
            Discover MeroIMS
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="animate-in fade-in relative duration-1000">
          <div className="bg-ink-raised relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_120px_-40px_rgb(91_72_230/0.55)]">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 font-mono text-[11px] text-slate-500">
                research · engineering · products
              </span>
            </div>
            <Image
              src="/Gpu.jpeg"
              alt="Close-up of a circuit board with glowing data paths"
              width={1411}
              height={736}
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="aspect-[4/3] w-full object-cover hue-rotate-[50deg] saturate-[0.85] sm:aspect-[16/10]"
            />
          </div>

          <Link
            href="/solutions"
            className="group bg-ink/90 absolute -bottom-8 left-4 flex max-w-[280px] items-center gap-3 rounded-xl border border-white/10 p-3 pr-4 shadow-2xl backdrop-blur-md transition-colors hover:border-emerald-400/40 sm:-left-6"
          >
            <Image
              src="/meroims/logo.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-lg bg-white p-1"
            />
            <span className="flex flex-col">
              <span className="font-mono text-[10px] tracking-wider text-emerald-300 uppercase">
                Built in-house by AK Research Lab
              </span>
              <span className="text-sm leading-5 font-medium text-white">
                MeroIMS: AI-powered inventory, accounting &amp; business
                management
              </span>
            </span>
          </Link>
        </div>
      </Container>

      <Container className="mt-20 sm:mt-24">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-4">
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
      </Container>
    </section>
  );
}

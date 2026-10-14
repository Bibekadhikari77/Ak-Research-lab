import Link from "next/link";
import {
  ArrowRight,
  Code2,
  FlaskConical,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactHref } from "@/lib/inquiry";
import { Reveal } from "@/components/reveal";

type Service = {
  Icon: LucideIcon;
  title: string;
  description: string;
  capabilities: string[];
  cta: { label: string; href: string };
};

const services: Service[] = [
  {
    Icon: FlaskConical,
    title: "AI Research & Development",
    description:
      "Applied AI experimentation that develops practical approaches to real-world engineering problems.",
    capabilities: [
      "Problem framing and feasibility studies",
      "Prototyping and proof of concept",
      "Research-to-production handover",
    ],
    cta: { label: "Partner on research", href: contactHref("research") },
  },
  {
    Icon: Code2,
    title: "Software Engineering & Consulting",
    description:
      "Full-stack development, backend architecture, API engineering, database design, system integration, and technical consulting.",
    capabilities: [
      "Backend and API architecture",
      "Database design and integration",
      "Technical reviews and consulting",
    ],
    cta: {
      label: "Talk to an engineer",
      href: contactHref("software-engineering"),
    },
  },
  {
    Icon: Sparkles,
    title: "AI-Powered Business Solutions",
    description:
      "Software that combines automation, business workflows, analytics, and AI, including our flagship product, MeroIMS.",
    capabilities: [
      "Workflow automation",
      "Business analytics and reporting",
      "AI assistance built into everyday tools",
    ],
    cta: { label: "See MeroIMS", href: "/solutions" },
  },
];

export default function Services({ intro = true }: { intro?: boolean }) {
  return (
    <section
      id="services"
      aria-labelledby={intro ? "services-title" : undefined}
      className="border-surface-line bg-surface-2 scroll-mt-16 border-y py-20 sm:py-28"
    >
      <Container className="flex flex-col gap-14">
        {intro ? (
          <SectionHeading
            eyebrow="Services"
            id="services-title"
            title="What we do"
            description="From research and prototyping to production-ready software, we help turn technical ideas into usable solutions."
          />
        ) : null}

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(
            ({ Icon, title, description, capabilities, cta }, index) => (
              <Reveal
                as="li"
                index={index}
                key={title}
                className="group hover:border-brand-200 flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-24px_rgb(15_23_42/0.25)] sm:p-7"
              >
                <span className="text-gold-300 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-slate-950">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {description}
                </p>
                <ul className="mt-5 flex flex-col gap-2 border-t border-slate-100 pt-5">
                  {capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <span
                        aria-hidden="true"
                        className="bg-brand-600 h-1 w-1 shrink-0 rounded-full"
                      />
                      {capability}
                    </li>
                  ))}
                </ul>
                <Link
                  href={cta.href}
                  className="text-brand-700 hover:text-brand-900 mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium transition-colors"
                >
                  {cta.label}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </Reveal>
            ),
          )}
        </ul>
      </Container>
    </section>
  );
}

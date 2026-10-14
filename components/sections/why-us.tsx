import {
  Boxes,
  Cpu,
  FlaskConical,
  GitMerge,
  Layers,
  Package,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";

const reasons: { Icon: LucideIcon; title: string; description: string }[] = [
  {
    Icon: Layers,
    title: "Full-stack technical expertise",
    description:
      "One team covering research, backend systems, and user-facing software.",
  },
  {
    Icon: Cpu,
    title: "End-to-end AI development",
    description:
      "We build the AI features and the software around them, so they work as one system.",
  },
  {
    Icon: FlaskConical,
    title: "Research-driven engineering",
    description:
      "Decisions grounded in experiments and measurement, not assumptions.",
  },
  {
    Icon: Wrench,
    title: "Practical implementation experience",
    description:
      "We focus on systems that work in production, not just in a demo.",
  },
  {
    Icon: Package,
    title: "A product-building mindset",
    description:
      "We build and maintain our own software, so we think about the long term.",
  },
  {
    Icon: GitMerge,
    title: "Experiment to deployment",
    description:
      "A single, consistent approach from first prototype to running system.",
  },
  {
    Icon: Boxes,
    title: "Proven with MeroIMS",
    description:
      "We built MeroIMS in-house, applying the same practices we bring to client work.",
  },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-us-title"
      className="border-surface-line bg-surface-2 scroll-mt-16 border-t py-20 sm:py-28"
    >
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <SectionHeading
          eyebrow="Why AK Research Lab"
          id="why-us-title"
          title="Research, engineering, and products under one roof"
          description="Most AI projects stall at the boundaries between research, engineering, and product. Working across all three means fewer hand-offs and fewer surprises between experiment and production."
          className="lg:sticky lg:top-28 lg:self-start"
        />
        <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {reasons.map(({ Icon, title, description }, index) => (
            <Reveal as="li" index={index} key={title} className="flex gap-4">
              <span className="text-brand-700 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-slate-950">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

import Image from "next/image";
import {
  Activity,
  AppWindow,
  BarChart3,
  Brain,
  Code2,
  Layers,
  Network,
  Rocket,
  Scaling,
  Settings2,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { contactHref } from "@/lib/inquiry";
import { Reveal } from "@/components/reveal";

// Research areas, not published results. When papers or public projects
// exist, list them here or publish them on the blog.
const areas: { Icon: LucideIcon; title: string; description: string }[] = [
  {
    Icon: Brain,
    title: "Model training & fine-tuning",
    description: "Adapting models to specific domains and data, efficiently.",
  },
  {
    Icon: BarChart3,
    title: "Evaluation & benchmarking",
    description:
      "Measuring model quality against the tasks that actually matter.",
  },
  {
    Icon: AppWindow,
    title: "AI application development",
    description: "Turning model capabilities into dependable software.",
  },
  {
    Icon: Network,
    title: "Distributed training systems",
    description: "Scaling training across GPUs and nodes.",
  },
  {
    Icon: Code2,
    title: "Software engineering research",
    description: "Better ways to design, build, and maintain systems.",
  },
  {
    Icon: Workflow,
    title: "AI-assisted workflow automation",
    description: "Reducing repetitive work in business processes.",
  },
  {
    Icon: Rocket,
    title: "Research-to-production",
    description:
      "Carrying experiments through to deployed, maintained systems.",
  },
];

// The GPU infrastructure that supports the lab's research, also available to
// partner teams. Never list hardware models, capacity, or pricing here
// unless they are confirmed.
const computeHighlights: {
  Icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    Icon: Settings2,
    title: "GPU provisioning & configuration",
    description: "Environments set up and configured for your workload.",
  },
  {
    Icon: Users,
    title: "Compute access & usage management",
    description: "Managed access with visibility into how compute is used.",
  },
  {
    Icon: Activity,
    title: "Workload monitoring",
    description: "Track running jobs and resource utilization.",
  },
  {
    Icon: Layers,
    title: "Framework support",
    description: "PyTorch, TensorFlow, and JAX, where available.",
  },
  {
    Icon: Brain,
    title: "Research & training workflows",
    description: "Environments suited to experimentation and model training.",
  },
  {
    Icon: Scaling,
    title: "Scaling options",
    description: "Options to grow, based on actual infrastructure capacity.",
  },
];

export default function Research({ intro = true }: { intro?: boolean }) {
  return (
    <section
      id="research"
      aria-labelledby={intro ? "research-title" : undefined}
      className="bg-surface scroll-mt-16 py-20 sm:py-28"
    >
      <Container className="flex flex-col gap-14">
        {intro ? (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Research"
              id="research-title"
              title="Applied research. Practical engineering. Measurable progress."
              description="Our research focuses on problems that come up when AI meets real systems, from training and evaluating models to running them reliably in production, backed by our own GPU infrastructure."
            />
            <ButtonLink
              href={contactHref("research")}
              variant="dark"
              size="lg"
              arrow
              className="self-start lg:self-auto"
            >
              Partner With Our Lab
            </ButtonLink>
          </div>
        ) : null}

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map(({ Icon, title, description }, index) => (
            <Reveal
              as="li"
              index={index}
              key={title}
              className="hover:border-brand-200 relative flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <Icon aria-hidden="true" className="text-brand-700 h-5 w-5" />
                <span className="font-mono text-xs text-slate-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-base font-semibold text-slate-950">
                {title}
              </h3>
              <p className="text-sm leading-6 text-slate-600">{description}</p>
            </Reveal>
          ))}
          <Reveal
            as="li"
            index={7}
            className="flex flex-col justify-between gap-4 rounded-2xl bg-slate-950 p-6 text-white"
          >
            <p className="text-base leading-7 font-medium">
              Notes, tutorials, and write-ups from the lab.
            </p>
            <ButtonLink
              href="/blog"
              variant="ghost-dark"
              arrow
              className="self-start"
            >
              Read the blog
            </ButtonLink>
          </Reveal>
        </ol>

        <Reveal
          as="div"
          id="research-compute"
          className="bg-ink relative isolate scroll-mt-24 overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-12"
        >
          <div
            aria-hidden="true"
            className="bg-tech-grid absolute inset-0 -z-10"
          />
          <div
            aria-hidden="true"
            className="bg-gold-500/10 absolute -right-40 bottom-0 -z-10 h-[360px] w-[560px] rounded-full blur-[120px]"
          />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-14">
            <div className="flex flex-col gap-6">
              <Eyebrow tone="dark">Research compute</Eyebrow>
              <h3 className="text-2xl leading-tight font-semibold tracking-tight text-balance text-white sm:text-3xl">
                GPU infrastructure built for real AI workloads
              </h3>
              <p className="text-base leading-7 text-slate-300">
                The GPU infrastructure behind our research is also available to
                partner teams, with hands-on support for AI experimentation,
                model training, and compute-intensive development.
              </p>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/Gpu.jpeg"
                  alt="Circuit board with glowing compute and data-flow paths"
                  width={1411}
                  height={736}
                  sizes="(min-width: 1024px) 440px, 100vw"
                  className="aspect-[16/9] w-full object-cover opacity-90 hue-rotate-[50deg] saturate-[0.85]"
                />
              </div>
              <div className="flex flex-col items-start gap-3">
                <ButtonLink href={contactHref("gpu-compute")} size="lg" arrow>
                  Request Compute Access
                </ButtonLink>
                <p className="text-xs leading-5 text-slate-400">
                  Availability, hardware, and configurations are confirmed for
                  each request based on current capacity.
                </p>
              </div>
            </div>

            <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {computeHighlights.map(({ Icon, title, description }, index) => (
                <Reveal
                  as="li"
                  index={index}
                  key={title}
                  className="bg-ink-raised flex flex-col gap-3 p-6"
                >
                  <span className="text-gold-300 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h4 className="text-base font-semibold text-white">
                    {title}
                  </h4>
                  <p className="text-sm leading-6 text-slate-400">
                    {description}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

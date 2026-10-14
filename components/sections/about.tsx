import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";

const focusAreas = [
  "Applied AI research",
  "Software engineering research and development",
  "Production-ready AI applications",
  "Enterprise software and business automation",
  "Technical consulting and implementation support",
];

// The lab's work, from research up. Each layer builds on the one below,
// which is what "from research to code" means in practice.
const stack = [
  {
    layer: "Products",
    detail: "MeroIMS and in-house software",
    accent: true,
  },
  {
    layer: "Software engineering",
    detail: "APIs, platforms, and integrations",
  },
  {
    layer: "Applied research",
    detail: "Experiments, prototypes, and evaluation",
  },
];

export default function About({ intro = true }: { intro?: boolean }) {
  return (
    <section
      id="about"
      aria-labelledby={intro ? "about-title" : undefined}
      className="bg-surface scroll-mt-16 py-20 sm:py-28"
    >
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-8">
          {intro ? (
            <SectionHeading
              eyebrow="About AK Research Lab"
              id="about-title"
              title="Research that becomes real-world technology"
              description="AK Research Lab is a technology research and engineering company working across applied AI research, software engineering, and business software. We take ideas from experiment to production, and we apply the same capabilities to products we build ourselves, such as MeroIMS."
            />
          ) : null}
          <ul className="grid gap-3 sm:grid-cols-2">
            {focusAreas.map((area, index) => (
              <Reveal
                as="li"
                index={index}
                key={area}
                className="flex items-start gap-3 text-sm leading-6 text-slate-700"
              >
                <span className="bg-brand-50 text-brand-700 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                  <Check
                    aria-hidden="true"
                    className="h-3 w-3"
                    strokeWidth={3}
                  />
                </span>
                {area}
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div
            className="bg-tech-grid-light absolute -inset-6 -z-10"
            aria-hidden="true"
          />
          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <figcaption className="px-3 pt-2 pb-3 font-mono text-[11px] tracking-[0.14em] text-slate-500 uppercase">
              From research to code
            </figcaption>
            <ol className="flex flex-col gap-2">
              {stack.map((item, index) => (
                <Reveal
                  as="li"
                  index={index + 1}
                  key={item.layer}
                  className={
                    item.accent
                      ? "flex items-center justify-between gap-4 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-6"
                      : "flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-6"
                  }
                >
                  <span className="text-sm font-semibold text-slate-900">
                    {item.layer}
                  </span>
                  <span className="text-right text-xs text-slate-500">
                    {item.detail}
                  </span>
                </Reveal>
              ))}
            </ol>
          </figure>
        </div>
      </Container>
    </section>
  );
}

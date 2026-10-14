import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

/** Dark title band used at the top of inner pages, behind the fixed header. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "bg-ink relative isolate overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20",
        className,
      )}
    >
      <div aria-hidden="true" className="bg-tech-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="bg-brand-600/15 absolute top-0 left-1/2 -z-10 h-[380px] w-[760px] -translate-x-1/2 rounded-full blur-[120px]"
      />
      <Container className="flex flex-col gap-5">
        {eyebrow ? <Eyebrow tone="dark">{eyebrow}</Eyebrow> : null}
        <h1 className="max-w-3xl text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-white sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-base leading-7 text-pretty text-slate-300 sm:text-lg sm:leading-8">
            {description}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}

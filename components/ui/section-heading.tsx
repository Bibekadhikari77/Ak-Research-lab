import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.14em] uppercase",
        tone === "dark" ? "text-gold-300" : "text-brand-700",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "dark" ? "bg-gold-300" : "bg-brand-600",
        )}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  as: Heading = "h2",
  id,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: Tone;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}) {
  return (
    <Reveal
      as="div"
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <Heading
        id={id}
        className={cn(
          "text-3xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-4xl",
          tone === "dark" ? "text-white" : "text-slate-950",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "text-base leading-7 text-pretty sm:text-lg sm:leading-8",
            tone === "dark" ? "text-slate-300" : "text-slate-600",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

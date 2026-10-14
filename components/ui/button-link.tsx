import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-brand-600 text-white shadow-[0_8px_24px_-8px_rgb(91_72_230/0.6)] hover:bg-brand-500",
  dark: "bg-slate-950 text-white hover:bg-slate-800",
  outline:
    "border border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50",
  "outline-dark":
    "border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10",
  ghost: "text-brand-700 hover:text-brand-900",
  "ghost-dark": "text-gold-300 hover:text-white",
} as const;

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
} as const;

export type ButtonVariant = keyof typeof variants;

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: keyof typeof sizes;
  className?: string;
} = {}) {
  const isGhost = variant === "ghost" || variant === "ghost-dark";
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    isGhost ? "h-auto px-0" : sizes[size],
    className,
  );
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: ButtonVariant;
  size?: keyof typeof sizes;
  className?: string;
  /** Show a trailing arrow. External links get an up-right arrow. */
  arrow?: boolean;
  external?: boolean;
  children: ReactNode;
};

export function ButtonLink({
  variant,
  size,
  className,
  arrow = false,
  external = false,
  children,
  ...props
}: ButtonLinkProps) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <Link
      className={buttonClasses({ variant, size, className })}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      {arrow || external ? (
        <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
      ) : null}
      {external ? <span className="sr-only">(opens in a new tab)</span> : null}
    </Link>
  );
}

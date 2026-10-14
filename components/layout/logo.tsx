import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "from-brand-500 to-brand-800 text-gold-200 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br font-mono text-[11px] font-bold tracking-tight shadow-[0_0_0_1px_rgb(242_205_126/0.35)_inset]",
        className,
      )}
    >
      AK
    </span>
  );
}

export function Logo({
  tone = "dark",
  onClick,
}: {
  tone?: "light" | "dark";
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="AK Research Lab home"
      className="focus-visible:ring-brand-500 flex items-center gap-2.5 rounded-md focus-visible:ring-2 focus-visible:outline-none"
    >
      <LogoMark />
      <span
        className={cn(
          "text-[15px] font-semibold tracking-tight whitespace-nowrap",
          tone === "dark" ? "text-white" : "text-slate-950",
        )}
      >
        AK Research Lab
      </span>
    </Link>
  );
}

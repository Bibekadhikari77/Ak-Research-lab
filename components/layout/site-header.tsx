"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { buttonClasses } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";
import {
  getStartedHref,
  meroimsNavLink,
  mobileNav,
  primaryNav,
} from "@/lib/navigation";
import { Logo } from "./logo";

// Highlights the nav item for the current page, including nested routes
// such as /blog/some-post.
function useActiveHref(): string {
  const pathname = usePathname();
  if (pathname === "/") return "/";
  const match = primaryNav.find(
    (link) => pathname === link.href || pathname.startsWith(`${link.href}/`),
  );
  return match?.href ?? "";
}

export default function SiteHeader() {
  const activeHref = useActiveHref();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const pathname = usePathname();

  // Close the mobile menu, and when the link points at the page already open,
  // return to the top (Next.js does nothing for a same-page link).
  const handleNavigate = (href: string) => {
    setMenuOpen(false);
    if (href.split("?")[0] === pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || menuOpen
          ? "bg-ink/90 border-white/10 backdrop-blur-md"
          : "bg-ink/40 border-transparent backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo onClick={() => handleNavigate("/")} />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {primaryNav.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => handleNavigate(link.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-slate-300 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={meroimsNavLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1 rounded-full border border-emerald-400/30 px-3 py-1.5 text-[13px] font-medium text-emerald-300 transition-colors hover:border-emerald-300/60 hover:text-emerald-200 xl:inline-flex"
          >
            {meroimsNavLink.label}
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <Link
            href={getStartedHref}
            onClick={() => handleNavigate(getStartedHref)}
            className={buttonClasses({
              size: "md",
              className: "hidden h-9 px-4 text-[13px] sm:inline-flex",
            })}
          >
            Get Started
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="focus-visible:ring-brand-500 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:outline-none lg:hidden"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 lg:hidden"
      >
        <nav aria-label="Mobile" className="px-4 pt-3 pb-6 sm:px-6">
          <ul className="flex flex-col">
            {mobileNav.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => handleNavigate(link.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex rounded-lg px-3 py-3 text-base font-medium transition-colors",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-slate-300 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href={meroimsNavLink.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-3 text-base font-medium text-emerald-300 hover:bg-white/5"
              >
                {meroimsNavLink.label}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
          <Link
            href={getStartedHref}
            onClick={() => handleNavigate(getStartedHref)}
            className={buttonClasses({ size: "lg", className: "mt-4 w-full" })}
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}

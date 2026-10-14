"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Infrastructure", href: "/#infrastructure" },
  { label: "Research", href: "/#research" },
  { label: "Why Us", href: "/#why-us" },
];

const sectionIds = navLinks.map((link) => link.href.split("#")[1]);

// Picks whichever tracked section currently sits highest in the qualifying
// band near the top of the viewport (mirrors the IntersectionObserver's
// rootMargin below), by measuring the DOM directly rather than relying on
// the last-fired observer entry.
function resolveActiveFromDOM(): string {
  let best: { id: string; top: number } | null = null;
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.3 && rect.bottom > 100) {
      if (!best || rect.top < best.top) best = { id, top: rect.top };
    }
  }
  return best ? `/#${best.id}` : "";
}

export default function SiteNav() {
  const [activeHref, setActiveHref] = useState<string>("");
  // While a nav link was just clicked, ignore scroll-spy updates until the
  // smooth-scroll animation has had time to settle, so the clicked link
  // stays highlighted instead of flickering mid-scroll.
  const suppressedRef = useRef(false);
  const suppressTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressedRef.current) return;
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          const topMost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
          );
          setActiveHref(`/#${topMost.target.id}`);
        }
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (suppressTimeoutRef.current) clearTimeout(suppressTimeoutRef.current);
    };
  }, []);

  const handleLinkClick = (href: string) => {
    setActiveHref(href);
    suppressedRef.current = true;
    if (suppressTimeoutRef.current) clearTimeout(suppressTimeoutRef.current);
    suppressTimeoutRef.current = setTimeout(() => {
      suppressedRef.current = false;
      // Re-sync from the live DOM in case a transition happened (or the
      // user scrolled again) while scroll-spy was suppressed.
      const resolved = resolveActiveFromDOM();
      setActiveHref(resolved || href);
    }, 900);
  };

  return (
    <nav className="fixed top-0 left-0 z-50 flex h-12 w-full items-center justify-center px-6 sm:h-14 sm:px-8 md:h-16 md:px-12 lg:h-[84px] lg:px-0">
      <div className="relative z-30 flex h-10 w-full max-w-[calc(100%-32px)] items-center justify-between overflow-hidden rounded-[50px] bg-[#F7F5F3] px-3 py-1.5 pr-2 shadow-[0px_0px_0px_2px_white] backdrop-blur-sm sm:h-11 sm:max-w-[calc(100%-48px)] sm:px-4 sm:py-2 sm:pr-3 md:h-12 md:max-w-[calc(100%-64px)] md:px-4 lg:w-[900px] lg:max-w-[900px]">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-start">
            <Link
              href="/#hero"
              onClick={() => handleLinkClick("")}
              className="flex flex-col justify-center font-sans text-sm leading-5 font-medium text-[#2F3037] sm:text-base md:text-lg lg:text-xl"
            >
              AK Research Lab
            </Link>
          </div>
          <div className="flex hidden flex-row items-start justify-start gap-1 pl-3 sm:pl-4 md:pl-5 lg:flex lg:gap-1.5 lg:pl-5">
            {navLinks.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-center justify-start rounded-full px-2.5 py-1.5 font-sans text-xs leading-[14px] font-medium whitespace-nowrap transition-colors md:text-[13px] ${
                    isActive
                      ? "bg-[rgba(55,50,47,0.06)] text-[#37322F]"
                      : "text-[rgba(49,45,43,0.80)] hover:bg-[rgba(55,50,47,0.06)] hover:text-[#37322F]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex h-6 items-start justify-start gap-2 sm:h-7 sm:gap-3 md:h-8">
          <Link
            href="/#compute-request"
            className="flex items-center justify-center overflow-hidden rounded-full bg-white px-2 py-1 shadow-[0px_1px_2px_rgba(55,50,47,0.12)] transition-colors hover:bg-[rgba(55,50,47,0.03)] sm:px-3 sm:py-[6px] md:px-[14px]"
          >
            <div className="flex flex-col justify-center font-sans text-xs leading-5 font-medium text-[#37322F] md:text-[13px]">
              Get Started
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

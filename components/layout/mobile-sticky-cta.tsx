"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonClasses } from "@/components/ui/button-link";
import { getStartedHref } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * Small-screen "Get Started" bar on the homepage. Appears once the hero has
 * scrolled away and hides again near the closing call to action.
 */
export default function MobileStickyCta() {
  const pathname = usePathname();
  const [heroVisible, setHeroVisible] = useState(true);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;
    const hero = document.getElementById("hero");
    const contact = document.getElementById("get-started");

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) setHeroVisible(entry.isIntersecting);
        if (entry.target === contact) setContactVisible(entry.isIntersecting);
      }
    });
    if (hero) observer.observe(hero);
    if (contact) observer.observe(contact);
    return () => observer.disconnect();
  }, [pathname]);

  const visible = pathname === "/" && !heroVisible && !contactVisible;

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-4 pb-4 transition-transform duration-300 sm:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-24",
      )}
    >
      <Link
        href={getStartedHref}
        tabIndex={visible ? undefined : -1}
        className={buttonClasses({
          size: "lg",
          className: "w-full shadow-[0_12px_32px_-8px_rgb(91_72_230/0.6)]",
        })}
      >
        Get Started
      </Link>
    </div>
  );
}

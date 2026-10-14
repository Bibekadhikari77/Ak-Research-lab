"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Infrastructure", href: "/#infrastructure" },
  { label: "Research", href: "/#research" },
  { label: "Why Us", href: "/#why-us" },
]

const sectionIds = navLinks.map((link) => link.href.split("#")[1])

// Picks whichever tracked section currently sits highest in the qualifying
// band near the top of the viewport (mirrors the IntersectionObserver's
// rootMargin below), by measuring the DOM directly rather than relying on
// the last-fired observer entry.
function resolveActiveFromDOM(): string {
  let best: { id: string; top: number } | null = null
  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (!el) continue
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.3 && rect.bottom > 100) {
      if (!best || rect.top < best.top) best = { id, top: rect.top }
    }
  }
  return best ? `/#${best.id}` : ""
}

export default function SiteNav() {
  const [activeHref, setActiveHref] = useState<string>("")
  // While a nav link was just clicked, ignore scroll-spy updates until the
  // smooth-scroll animation has had time to settle, so the clicked link
  // stays highlighted instead of flickering mid-scroll.
  const suppressedRef = useRef(false)
  const suppressTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressedRef.current) return
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) {
          const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b))
          setActiveHref(`/#${topMost.target.id}`)
        }
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    return () => {
      if (suppressTimeoutRef.current) clearTimeout(suppressTimeoutRef.current)
    }
  }, [])

  const handleLinkClick = (href: string) => {
    setActiveHref(href)
    suppressedRef.current = true
    if (suppressTimeoutRef.current) clearTimeout(suppressTimeoutRef.current)
    suppressTimeoutRef.current = setTimeout(() => {
      suppressedRef.current = false
      // Re-sync from the live DOM in case a transition happened (or the
      // user scrolled again) while scroll-spy was suppressed.
      const resolved = resolveActiveFromDOM()
      setActiveHref(resolved || href)
    }, 900)
  }

  return (
    <nav className="w-full h-12 sm:h-14 md:h-16 lg:h-[84px] fixed left-0 top-0 flex justify-center items-center z-50 px-6 sm:px-8 md:px-12 lg:px-0">
      <div className="w-full max-w-[calc(100%-32px)] sm:max-w-[calc(100%-48px)] md:max-w-[calc(100%-64px)] lg:max-w-[900px] lg:w-[900px] h-10 sm:h-11 md:h-12 py-1.5 sm:py-2 px-3 sm:px-4 md:px-4 pr-2 sm:pr-3 bg-[#F7F5F3] backdrop-blur-sm shadow-[0px_0px_0px_2px_white] overflow-hidden rounded-[50px] flex justify-between items-center relative z-30">
        <div className="flex justify-center items-center">
          <div className="flex justify-start items-center">
            <Link
              href="/#hero"
              onClick={() => handleLinkClick("")}
              className="flex flex-col justify-center text-[#2F3037] text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-5 font-sans"
            >
              AK Research Lab
            </Link>
          </div>
          <div className="pl-3 sm:pl-4 md:pl-5 lg:pl-5 flex justify-start items-start hidden lg:flex flex-row gap-1 lg:gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeHref === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex justify-start items-center whitespace-nowrap px-2.5 py-1.5 rounded-full text-xs md:text-[13px] font-medium leading-[14px] font-sans transition-colors ${
                    isActive
                      ? "text-[#37322F] bg-[rgba(55,50,47,0.06)]"
                      : "text-[rgba(49,45,43,0.80)] hover:text-[#37322F] hover:bg-[rgba(55,50,47,0.06)]"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
        <div className="h-6 sm:h-7 md:h-8 flex justify-start items-start gap-2 sm:gap-3">
          <Link
            href="/#compute-request"
            className="px-2 sm:px-3 md:px-[14px] py-1 sm:py-[6px] bg-white shadow-[0px_1px_2px_rgba(55,50,47,0.12)] overflow-hidden rounded-full flex justify-center items-center hover:bg-[rgba(55,50,47,0.03)] transition-colors"
          >
            <div className="flex flex-col justify-center text-[#37322F] text-xs md:text-[13px] font-medium leading-5 font-sans">
              Get Started
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}

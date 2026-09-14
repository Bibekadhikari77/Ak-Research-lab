"use client"

import { useEffect, useState } from "react"

export default function MobileStickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const heroCta = document.querySelector('a[href="#compute-request"]')
    if (!heroCta) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "-96px 0px 0px 0px" },
    )
    observer.observe(heroCta)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`sm:hidden fixed inset-x-0 bottom-0 z-40 px-4 pb-4 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-24 pointer-events-none"
      }`}
    >
      <a
        href="#compute-request"
        className="flex h-12 w-full items-center justify-center rounded-full bg-[#37322F] text-white text-sm font-medium shadow-[0px_8px_24px_rgba(55,50,47,0.28)] hover:bg-[#2A2520] transition-colors"
      >
        Request Compute Access
      </a>
    </div>
  )
}

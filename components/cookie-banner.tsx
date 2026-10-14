"use client"

import { useEffect, useState } from "react"

const CONSENT_KEY = "ak-cookie-consent"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // One-time read of browser storage after mount, so the server-rendered
    // and first client-rendered pass both start hidden and stay in sync
    // (localStorage isn't available during SSR).
    try {
      if (!window.localStorage.getItem(CONSENT_KEY)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setVisible(true)
      }
    } catch {
      // localStorage unavailable (private browsing, blocked storage) — skip the banner.
    }
  }, [])

  const decide = (value: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value)
    } catch {
      // ignore write failures, just hide the banner for this session
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] flex justify-center px-4 pb-4 sm:px-6">
      <div className="w-full max-w-2xl rounded-2xl border border-[rgba(55,50,47,0.12)] bg-white shadow-[0px_8px_30px_rgba(55,50,47,0.16)] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <p className="flex-1 text-sm text-[#605A57] font-sans leading-6">
          We use cookies to understand site usage and improve AK Research Lab. See our{" "}
          <a href="/privacy" className="underline text-[#37322F] hover:text-[#2A2520]">
            Privacy Policy
          </a>{" "}
          for details.
        </p>
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="flex-1 sm:flex-none h-9 px-4 rounded-full border border-[rgba(55,50,47,0.16)] text-sm font-medium text-[#37322F] hover:bg-[rgba(55,50,47,0.03)] transition-colors"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="flex-1 sm:flex-none h-9 px-4 rounded-full bg-[#37322F] text-sm font-medium text-white hover:bg-[#2A2520] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

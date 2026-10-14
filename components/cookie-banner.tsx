"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "ak-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // One-time read of browser storage after mount, so the server-rendered
    // and first client-rendered pass both start hidden and stay in sync
    // (localStorage isn't available during SSR).
    try {
      if (!window.localStorage.getItem(CONSENT_KEY)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setVisible(true);
      }
    } catch {
      // localStorage unavailable (private browsing, blocked storage) — skip the banner.
    }
  }, []);

  const decide = (value: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // ignore write failures, just hide the banner for this session
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] flex justify-center px-4 pb-4 sm:px-6">
      <div className="flex w-full max-w-2xl flex-col items-start gap-3 rounded-2xl border border-[rgba(55,50,47,0.12)] bg-white p-4 shadow-[0px_8px_30px_rgba(55,50,47,0.16)] sm:flex-row sm:items-center sm:gap-4 sm:p-5">
        <p className="flex-1 font-sans text-sm leading-6 text-[#605A57]">
          We use cookies to understand site usage and improve AK Research Lab.
          See our{" "}
          <a
            href="/privacy"
            className="text-[#37322F] underline hover:text-[#2A2520]"
          >
            Privacy Policy
          </a>{" "}
          for details.
        </p>
        <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="h-9 flex-1 rounded-full border border-[rgba(55,50,47,0.16)] px-4 text-sm font-medium text-[#37322F] transition-colors hover:bg-[rgba(55,50,47,0.03)] sm:flex-none"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="h-9 flex-1 rounded-full bg-[#37322F] px-4 text-sm font-medium text-white transition-colors hover:bg-[#2A2520] sm:flex-none"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

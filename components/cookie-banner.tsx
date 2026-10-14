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
      <div className="flex w-full max-w-2xl flex-col items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_40px_-12px_rgb(15_23_42/0.35)] sm:flex-row sm:items-center sm:gap-4 sm:p-5">
        <p className="flex-1 font-sans text-sm leading-6 text-slate-600">
          We use cookies to understand site usage and improve AK Research Lab.
          See our{" "}
          <a
            href="/privacy"
            className="text-brand-700 hover:text-brand-900 font-medium underline"
          >
            Privacy Policy
          </a>{" "}
          for details.
        </p>
        <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="h-9 flex-1 rounded-full border border-slate-300 px-4 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 sm:flex-none"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="bg-brand-600 hover:bg-brand-500 h-9 flex-1 rounded-full px-4 text-sm font-medium text-white transition-colors sm:flex-none"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Check, Facebook, Link2, Linkedin, Twitter } from "lucide-react";

export default function ShareLinks({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "Share on LinkedIn",
      Icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Share on X",
      Icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "Share on Facebook",
      Icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (insecure context or permission denied).
    }
  };

  const buttonClasses =
    "flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-950";

  return (
    <div className="flex items-center gap-2">
      {links.map(({ label, Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={buttonClasses}
        >
          <Icon aria-hidden="true" className="h-4 w-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label="Copy link"
        className={buttonClasses}
      >
        {copied ? (
          <Check aria-hidden="true" className="h-4 w-4 text-emerald-600" />
        ) : (
          <Link2 aria-hidden="true" className="h-4 w-4" />
        )}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}

"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type Ref,
} from "react";
import { revealDelay } from "@/lib/reveal";

// Matches the transition length in globals.css plus the longest stagger.
const SETTLE_MS = 1200;

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "li" | "section";
  /** Position in a list, used to stagger siblings. */
  index?: number;
};

/**
 * Fades and slides its content in when it scrolls into view.
 *
 * The server HTML never includes any reveal state, and this component only
 * touches its own element in an effect, which React runs after that element
 * has hydrated. So server and client markup always match, content is visible
 * without JavaScript, and anything already on screen is never hidden.
 */
export function Reveal({
  as = "div",
  index = 0,
  style,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    el.dataset.reveal = "hidden";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        el.dataset.reveal = "in";
        // Drop the entrance transition afterwards so hover effects keep
        // their normal, snappy timing.
        timer = setTimeout(() => delete el.dataset.reveal, SETTLE_MS);
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
      delete el.dataset.reveal;
    };
  }, []);

  const Tag = as;
  return (
    <Tag
      // One ref type covers every allowed tag; all are plain HTML elements.
      ref={ref as Ref<HTMLDivElement & HTMLLIElement>}
      style={
        { ...style, "--reveal-delay": revealDelay(index) } as CSSProperties
      }
      {...props}
    />
  );
}

"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import {
  Check,
  ClipboardList,
  Mic,
  Palette,
  QrCode,
  Receipt,
  Sparkles,
  Store,
  type LucideIcon,
} from "lucide-react";
import { meroimsFeatures, type MeroimsFeature } from "@/lib/meroims";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/** Accessible tabs (WAI-ARIA pattern) for the MeroIMS feature areas. */
export default function MeroimsFeatureTabs() {
  const baseId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = meroimsFeatures[activeIndex];

  const focusTab = (index: number) => {
    const next = (index + meroimsFeatures.length) % meroimsFeatures.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keyActions: Record<string, () => void> = {
      ArrowRight: () => focusTab(activeIndex + 1),
      ArrowLeft: () => focusTab(activeIndex - 1),
      Home: () => focusTab(0),
      End: () => focusTab(meroimsFeatures.length - 1),
    };
    const action = keyActions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  return (
    <Reveal
      as="div"
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
    >
      <div
        role="tablist"
        aria-label="MeroIMS features"
        className="flex [scrollbar-width:none] gap-1 overflow-x-auto border-b border-slate-200 bg-slate-50 p-2"
      >
        {meroimsFeatures.map((feature, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={feature.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${feature.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={onKeyDown}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none",
                selected
                  ? "bg-white text-slate-950 shadow-sm ring-1 ring-slate-200"
                  : "text-slate-600 hover:text-slate-950",
              )}
            >
              {feature.id === "ai" ? (
                <Sparkles
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-emerald-600"
                />
              ) : null}
              {feature.tab}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active.id}`}
        tabIndex={0}
        className="grid gap-8 p-6 focus-visible:outline-none sm:p-8 md:grid-cols-[1.1fr_1fr] md:items-center"
      >
        <div
          key={`text-${active.id}`}
          className="animate-in fade-in duration-300"
        >
          <h3 className="text-xl font-semibold text-slate-950 sm:text-2xl">
            {active.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            {active.summary}
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {active.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-sm leading-6 text-slate-700"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <Check
                    aria-hidden="true"
                    className="h-3 w-3"
                    strokeWidth={3}
                  />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {active.image ? (
          <Image
            key={`visual-${active.id}`}
            src={active.image.src}
            alt={active.image.alt}
            width={1024}
            height={1024}
            sizes="(min-width: 768px) 420px, 100vw"
            className="animate-in fade-in mx-auto aspect-square w-full max-w-sm rounded-xl border border-slate-100 object-cover duration-300"
          />
        ) : active.modules ? (
          <ModulesPreview key={`visual-${active.id}`} feature={active} />
        ) : (
          <AssistantPreview />
        )}
      </div>
    </Reveal>
  );
}

const moduleIcons: Record<string, LucideIcon> = {
  "Restaurant Till": Receipt,
  "Tables & QR": QrCode,
  "Waiter View": ClipboardList,
  "Web Store": Store,
  "Storefront Design": Palette,
};

function ModulesPreview({ feature }: { feature: MeroimsFeature }) {
  return (
    <ul className="animate-in fade-in mx-auto flex w-full max-w-sm flex-col gap-3 rounded-xl border border-emerald-100 bg-gradient-to-b from-emerald-50 to-white p-5 duration-300">
      {feature.modules?.map((module) => {
        const Icon = moduleIcons[module.name] ?? Sparkles;
        return (
          <li
            key={module.name}
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3.5 shadow-sm"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <Icon aria-hidden="true" className="h-5 w-5" />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900">
                {module.name}
              </span>
              <span className="text-xs text-slate-500">
                {module.description}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

// Describes how the assistant is used without inventing output or numbers.
function AssistantPreview() {
  return (
    <div className="animate-in fade-in mx-auto flex w-full max-w-sm flex-col gap-3 rounded-xl border border-emerald-100 bg-gradient-to-b from-emerald-50 to-white p-5 duration-300">
      <p className="font-mono text-[11px] tracking-wider text-emerald-700 uppercase">
        Ask in plain language
      </p>
      {[
        "Which products will run low next month?",
        "Summarize this month's sales and expenses.",
        "Draft a supplier contract.",
      ].map((prompt) => (
        <p
          key={prompt}
          className="rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 shadow-sm"
        >
          {prompt}
        </p>
      ))}
      <p className="flex items-center gap-2 text-xs text-slate-500">
        <Mic aria-hidden="true" className="h-3.5 w-3.5" />
        Available by chat and voice
      </p>
    </div>
  );
}

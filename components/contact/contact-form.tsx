"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { buttonClasses } from "@/components/ui/button-link";
import {
  inquiryCategories,
  inquiryLabel,
  isInquiryCategory,
  validateInquiry,
  type InquiryCategory,
  type InquiryErrors,
  type InquiryValues,
} from "@/lib/inquiry";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const fieldClasses =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-900 shadow-xs transition-colors outline-none placeholder:text-slate-400 focus-visible:border-brand-500 focus-visible:ring-3 focus-visible:ring-brand-500/20 aria-invalid:border-red-400 aria-invalid:focus-visible:ring-red-500/20";

// Field order, used to move focus to the first invalid field on submit.
const FIELD_ORDER: (keyof InquiryValues)[] = [
  "name",
  "email",
  "organization",
  "category",
  "requirements",
  "budget",
  "consent",
];

function readValues(formData: FormData): InquiryValues {
  const text = (key: string) => String(formData.get(key) ?? "");
  return {
    name: text("name"),
    email: text("email"),
    organization: text("organization"),
    category: text("category"),
    requirements: text("requirements"),
    budget: text("budget"),
    consent: formData.get("consent") === "on",
  };
}

function buildMailto(values: InquiryValues): string {
  const category = isInquiryCategory(values.category)
    ? inquiryLabel(values.category)
    : "Inquiry";
  const lines = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    values.organization.trim() && `Organization: ${values.organization.trim()}`,
    `Inquiry: ${category}`,
    values.budget.trim() && `Budget / timeline: ${values.budget.trim()}`,
    "",
    values.requirements.trim(),
  ].filter((line) => line !== "");
  const subject = `${category} inquiry from ${values.name.trim()}`;
  return `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(lines.join("\n"))}`;
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-800">
        {label}
        {optional ? (
          <span className="ml-1 font-normal text-slate-400">(optional)</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type Status = "idle" | "submitting" | "mailto" | "error";

export function ContactForm({
  defaultCategory,
}: {
  defaultCategory?: InquiryCategory;
}) {
  const router = useRouter();
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const describedBy = (field: keyof InquiryValues) =>
    errors[field] ? `contact-${field}-error` : undefined;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = readValues(formData);
    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    // Honeypot: real visitors never see or fill this field.
    if (formData.get("website")) {
      router.push("/thank-you");
      return;
    }

    if (!siteConfig.contactFormEndpoint) {
      window.location.href = buildMailto(values);
      setStatus("mailto");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(siteConfig.contactFormEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...values,
          category: inquiryLabel(values.category as InquiryCategory),
          _subject: `New ${inquiryLabel(values.category as InquiryCategory)} inquiry`,
        }),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="contact-form-note"
      className="relative flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
    >
      {status === "error" ? (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          We couldn&apos;t send your message. Please try again, or email us at{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="font-medium underline"
          >
            {siteConfig.contact.email}
          </a>
          .
        </div>
      ) : null}
      {status === "mailto" ? (
        <div
          role="status"
          className="border-brand-200 bg-brand-50 text-brand-900 flex gap-3 rounded-lg border px-4 py-3 text-sm"
        >
          <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Your email app should open with your message ready to send. If it
            didn&apos;t, email us at{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-medium underline"
            >
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Full name" error={errors.name}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={cn(fieldClasses, "h-11")}
          />
        </Field>
        <Field id="contact-email" label="Work email" error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={cn(fieldClasses, "h-11")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-organization" label="Organization" optional>
          <input
            id="contact-organization"
            name="organization"
            type="text"
            autoComplete="organization"
            className={cn(fieldClasses, "h-11")}
          />
        </Field>
        <Field id="contact-category" label="Inquiry" error={errors.category}>
          <select
            id="contact-category"
            name="category"
            required
            defaultValue={defaultCategory ?? ""}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={describedBy("category")}
            className={cn(fieldClasses, "h-11 pr-8")}
          >
            <option value="" disabled>
              Select a topic
            </option>
            {inquiryCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id="contact-requirements"
        label="Project requirements"
        error={errors.requirements}
      >
        <textarea
          id="contact-requirements"
          name="requirements"
          rows={5}
          required
          placeholder="What are you building, and what do you need from us?"
          aria-invalid={Boolean(errors.requirements)}
          aria-describedby={describedBy("requirements")}
          className={cn(fieldClasses, "resize-y py-3 leading-6")}
        />
      </Field>

      <Field id="contact-budget" label="Budget or timeline" optional>
        <input
          id="contact-budget"
          name="budget"
          type="text"
          placeholder="e.g. an approximate budget or target date"
          className={cn(fieldClasses, "h-11")}
        />
      </Field>

      {/* Honeypot field for bots. Hidden from people and assistive tech. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-3">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent")}
            className="accent-brand-600 mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300"
          />
          <label
            htmlFor="contact-consent"
            className="text-sm leading-5 text-slate-600"
          >
            I agree that {siteConfig.name} may use these details to respond to
            my inquiry, as described in the{" "}
            <Link
              href="/privacy"
              className="text-brand-700 font-medium underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </label>
        </div>
        {errors.consent ? (
          <p id="contact-consent-error" className="text-xs text-red-600">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={buttonClasses({
          size: "lg",
          className: "mt-1 w-full sm:w-auto sm:self-start",
        })}
      >
        {status === "submitting" ? (
          <>
            Sending
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            Send inquiry
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </>
        )}
      </button>
      <p id="contact-form-note" className="text-xs text-slate-500">
        We typically reply by email. Please don&apos;t include passwords or
        other sensitive information.
      </p>
    </form>
  );
}

/** Preselects the inquiry topic from `?inquiry=` (used by CTAs site-wide). */
export function ContactFormFromUrl() {
  const searchParams = useSearchParams();
  const inquiry = searchParams.get("inquiry");
  const defaultCategory = isInquiryCategory(inquiry) ? inquiry : undefined;
  // Remount when the topic changes so the select picks up the new default.
  return (
    <ContactForm
      key={defaultCategory ?? "none"}
      defaultCategory={defaultCategory}
    />
  );
}

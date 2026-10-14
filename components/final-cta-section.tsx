"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/site-config";

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.33334 8H12.6667M12.6667 8L8.66667 4M12.6667 8L8.66667 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="animate-spin"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

type FieldErrors = Partial<Record<"name" | "email" | "interest", string>>;

const baseInputClassName =
  "bg-white border-[rgba(55,50,47,0.16)] rounded-[9px] h-11 px-4 text-[#37322F] placeholder:text-[#8A8580] focus-visible:ring-[#37322F]/20 focus-visible:border-[#37322F]/40";
const errorInputClassName =
  "border-red-400 focus-visible:ring-red-200 focus-visible:border-red-400";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FinalCTASection() {
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (formData: FormData): FieldErrors => {
    const nextErrors: FieldErrors = {};
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const interest = String(formData.get("interest") ?? "").trim();

    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) nextErrors.email = "Please enter your email.";
    else if (!EMAIL_PATTERN.test(email))
      nextErrors.email = "Please enter a valid email address.";
    if (!interest)
      nextErrors.interest = "Please select what you're looking for.";

    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const formData = new FormData(e.currentTarget);
    const nextErrors = validate(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      // TODO: wire this up to the real lead-capture endpoint / CRM once available.
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.98) resolve();
          else reject(new Error("network"));
        }, 500);
      });
      router.push("/thank-you");
    } catch {
      setSubmitError(
        "Something went wrong sending your request. Please try again in a moment.",
      );
      setSubmitting(false);
    }
  };

  return (
    <section
      id="compute-request"
      className="relative flex w-full scroll-mt-24 flex-col items-center justify-center gap-2 overflow-hidden"
    >
      <div className="relative z-10 flex items-center justify-center gap-6 self-stretch border-t border-[rgba(55,50,47,0.12)] px-6 py-8 md:px-24 md:py-10">
        <div className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden">
          <div className="relative h-full w-full">
            {Array.from({ length: 300 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-4 w-full origin-top-left rotate-[-45deg] outline outline-[0.5px] outline-offset-[-0.25px] outline-[rgba(3,7,18,0.08)]"
                style={{
                  top: `${i * 16 - 120}px`,
                  left: "-100%",
                  width: "300%",
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="relative z-20 flex w-full max-w-[560px] flex-col items-center justify-start gap-8 overflow-hidden rounded-lg px-6 py-5 md:py-8">
          <div className="flex flex-col items-start justify-start gap-3 self-stretch">
            <h2 className="flex flex-col justify-center self-stretch text-center font-sans text-3xl leading-tight font-semibold tracking-tight text-[#49423D] md:text-5xl md:leading-[56px]">
              Ready to Build on Real Infrastructure?
            </h2>
            <p className="self-stretch text-center font-sans text-base leading-7 font-medium text-[#605A57]">
              Whether you need GPU compute, an AI research partner, or want to
              see what our accounting platform can do, let&apos;s talk.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4 self-stretch rounded-lg border border-[rgba(55,50,47,0.12)] bg-white p-6 text-left"
          >
            {submitError ? (
              <div
                role="alert"
                className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {submitError}
              </div>
            ) : null}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cta-name" className="text-[#37322F]">
                  Name
                </Label>
                <Input
                  id="cta-name"
                  name="name"
                  type="text"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "cta-name-error" : undefined}
                  className={`${baseInputClassName} ${errors.name ? errorInputClassName : ""}`}
                />
                {errors.name ? (
                  <p
                    id="cta-name-error"
                    role="alert"
                    className="mt-0.5 text-xs text-red-600"
                  >
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cta-email" className="text-[#37322F]">
                  Email
                </Label>
                <Input
                  id="cta-email"
                  name="email"
                  type="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "cta-email-error" : undefined
                  }
                  className={`${baseInputClassName} ${errors.email ? errorInputClassName : ""}`}
                />
                {errors.email ? (
                  <p
                    id="cta-email-error"
                    role="alert"
                    className="mt-0.5 text-xs text-red-600"
                  >
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cta-company" className="text-[#37322F]">
                Company
              </Label>
              <Input
                id="cta-company"
                name="company"
                type="text"
                className={baseInputClassName}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cta-interest" className="text-[#37322F]">
                What are you looking for?
              </Label>
              <div className="relative">
                <select
                  id="cta-interest"
                  name="interest"
                  defaultValue=""
                  aria-invalid={Boolean(errors.interest)}
                  aria-describedby={
                    errors.interest ? "cta-interest-error" : undefined
                  }
                  className={`h-11 w-full appearance-none rounded-[9px] border bg-white pr-10 pl-4 font-sans text-sm text-[#37322F] outline-none focus-visible:border-[#37322F]/40 focus-visible:ring-[3px] focus-visible:ring-[#37322F]/20 ${
                    errors.interest
                      ? errorInputClassName
                      : "border-[rgba(55,50,47,0.16)]"
                  }`}
                >
                  <option value="" disabled hidden>
                    Select an option
                  </option>
                  <option value="Compute Access">Compute Access</option>
                  <option value="Research Partnership">
                    Research Partnership
                  </option>
                  <option value="Technical Expertise">
                    Technical Expertise
                  </option>
                  <option value="Research Provider">Research Provider</option>
                  <option value="Software Engineering Field Research">
                    Software Engineering Field Research
                  </option>
                  <option value="AI Model Training">AI Model Training</option>
                  <option value="GPU">GPU</option>
                  <option value="GPU Provisioning">GPU Provisioning</option>
                  <option value="GPU Technical Expertise">
                    GPU Technical Expertise
                  </option>
                  <option value="Compute Access & Management">
                    Compute Access & Management
                  </option>
                  <option value="AI Accounting Software">
                    AI Accounting Software
                  </option>
                  <option value="Other">Other</option>
                </select>
                <svg
                  className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 4.5L6 8L9.5 4.5"
                    stroke="#37322F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {errors.interest ? (
                <p
                  id="cta-interest-error"
                  role="alert"
                  className="mt-0.5 text-xs text-red-600"
                >
                  {errors.interest}
                </p>
              ) : null}
            </div>

            <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={submitting}
                className="relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#37322F] px-8 py-[6px] shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] transition-colors hover:bg-[#2A2520] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                <div className="absolute top-[-0.5px] left-0 h-[41px] w-28 bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
                <span className="relative font-sans text-[15px] leading-5 font-medium text-white">
                  {submitting ? "Sending…" : "Get Started"}
                </span>
                <span className="relative text-white">
                  {submitting ? <SpinnerIcon /> : <ArrowIcon />}
                </span>
              </button>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex h-11 w-full items-center justify-center rounded-full border border-[rgba(55,50,47,0.16)] bg-white px-8 py-[6px] transition-colors hover:bg-[rgba(55,50,47,0.03)] sm:w-auto"
              >
                <span className="font-sans text-[15px] leading-5 font-medium text-[#37322F]">
                  Contact Our Team
                </span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

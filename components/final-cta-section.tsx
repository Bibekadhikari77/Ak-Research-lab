"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { siteConfig } from "@/lib/site-config"

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.33334 8H12.6667M12.6667 8L8.66667 4M12.6667 8L8.66667 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
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
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  )
}

type FieldErrors = Partial<Record<"name" | "email" | "interest", string>>

const baseInputClassName =
  "bg-white border-[rgba(55,50,47,0.16)] rounded-[9px] h-11 px-4 text-[#37322F] placeholder:text-[#8A8580] focus-visible:ring-[#37322F]/20 focus-visible:border-[#37322F]/40"
const errorInputClassName = "border-red-400 focus-visible:ring-red-200 focus-visible:border-red-400"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function FinalCTASection() {
  const router = useRouter()
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validate = (formData: FormData): FieldErrors => {
    const nextErrors: FieldErrors = {}
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const interest = String(formData.get("interest") ?? "").trim()

    if (!name) nextErrors.name = "Please enter your name."
    if (!email) nextErrors.email = "Please enter your email."
    else if (!EMAIL_PATTERN.test(email)) nextErrors.email = "Please enter a valid email address."
    if (!interest) nextErrors.interest = "Please select what you're looking for."

    return nextErrors
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError(null)

    const formData = new FormData(e.currentTarget)
    const nextErrors = validate(formData)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      // TODO: wire this up to the real lead-capture endpoint / CRM once available.
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.98) resolve()
          else reject(new Error("network"))
        }, 500)
      })
      router.push("/thank-you")
    } catch {
      setSubmitError("Something went wrong sending your request. Please try again in a moment.")
      setSubmitting(false)
    }
  }

  return (
    <section
      id="compute-request"
      className="w-full relative overflow-hidden flex flex-col justify-center items-center gap-2 scroll-mt-24"
    >
      <div className="self-stretch px-6 md:px-24 py-8 md:py-10 border-t border-[rgba(55,50,47,0.12)] flex justify-center items-center gap-6 relative z-10">
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="w-full h-full relative">
            {Array.from({ length: 300 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-4 w-full rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
                style={{
                  top: `${i * 16 - 120}px`,
                  left: "-100%",
                  width: "300%",
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-[560px] px-6 py-5 md:py-8 overflow-hidden rounded-lg flex flex-col justify-start items-center gap-8 relative z-20">
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <h2 className="self-stretch text-center flex justify-center flex-col text-[#49423D] text-3xl md:text-5xl font-semibold leading-tight md:leading-[56px] font-sans tracking-tight">
              Ready to Build on Real Infrastructure?
            </h2>
            <p className="self-stretch text-center text-[#605A57] text-base leading-7 font-sans font-medium">
              Whether you need GPU compute, an AI research partner, or want to see what our accounting platform can
              do, let&apos;s talk.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="self-stretch bg-white border border-[rgba(55,50,47,0.12)] rounded-lg p-6 flex flex-col gap-4 text-left"
          >
            {submitError ? (
              <div
                role="alert"
                className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-4 py-3"
              >
                {submitError}
              </div>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <p id="cta-name-error" role="alert" className="text-xs text-red-600 mt-0.5">
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
                  aria-describedby={errors.email ? "cta-email-error" : undefined}
                  className={`${baseInputClassName} ${errors.email ? errorInputClassName : ""}`}
                />
                {errors.email ? (
                  <p id="cta-email-error" role="alert" className="text-xs text-red-600 mt-0.5">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cta-company" className="text-[#37322F]">
                Company
              </Label>
              <Input id="cta-company" name="company" type="text" className={baseInputClassName} />
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
                  aria-describedby={errors.interest ? "cta-interest-error" : undefined}
                  className={`w-full appearance-none bg-white border rounded-[9px] h-11 pl-4 pr-10 text-[#37322F] text-sm font-sans outline-none focus-visible:ring-[3px] focus-visible:ring-[#37322F]/20 focus-visible:border-[#37322F]/40 ${
                    errors.interest ? errorInputClassName : "border-[rgba(55,50,47,0.16)]"
                  }`}
                >
                  <option value="" disabled hidden>
                    Select an option
                  </option>
                  <option value="Compute Access">Compute Access</option>
                  <option value="Research Partnership">Research Partnership</option>
                  <option value="Technical Expertise">Technical Expertise</option>
                  <option value="Research Provider">Research Provider</option>
                  <option value="Software Engineering Field Research">
                    Software Engineering Field Research
                  </option>
                  <option value="AI Model Training">AI Model Training</option>
                  <option value="GPU">GPU</option>
                  <option value="GPU Provisioning">GPU Provisioning</option>
                  <option value="GPU Technical Expertise">GPU Technical Expertise</option>
                  <option value="Compute Access & Management">Compute Access & Management</option>
                  <option value="AI Accounting Software">AI Accounting Software</option>
                  <option value="Other">Other</option>
                </select>
                <svg
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
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
                <p id="cta-interest-error" role="alert" className="text-xs text-red-600 mt-0.5">
                  {errors.interest}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto h-11 px-8 py-[6px] relative bg-[#37322F] shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] overflow-hidden rounded-full flex justify-center items-center gap-2 hover:bg-[#2A2520] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="w-28 h-[41px] absolute left-0 top-[-0.5px] bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
                <span className="text-white text-[15px] font-medium leading-5 font-sans relative">
                  {submitting ? "Sending…" : "Get Started"}
                </span>
                <span className="text-white relative">
                  {submitting ? <SpinnerIcon /> : <ArrowIcon />}
                </span>
              </button>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="w-full sm:w-auto h-11 px-8 py-[6px] bg-white border border-[rgba(55,50,47,0.16)] rounded-full flex justify-center items-center hover:bg-[rgba(55,50,47,0.03)] transition-colors"
              >
                <span className="text-[#37322F] text-[15px] font-medium leading-5 font-sans">Contact Our Team</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

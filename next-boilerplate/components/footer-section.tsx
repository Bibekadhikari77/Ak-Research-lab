"use client"

import { Github, Linkedin, Mail, Phone, Twitter } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

function LogoIcon() {
  return (
    <div className="w-8 h-8 bg-[#37322F] rounded-[8px] flex items-center justify-center shrink-0">
      <span className="text-white text-[11px] font-bold tracking-tight font-sans">AK</span>
    </div>
  )
}

const SOCIALS = [
  { Icon: Twitter, label: "Twitter", href: siteConfig.socials.twitter },
  { Icon: Linkedin, label: "LinkedIn", href: siteConfig.socials.linkedin },
  { Icon: Github, label: "GitHub", href: siteConfig.socials.github },
]

const LAB_LINKS = [
  { label: "Services", href: "#services" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Infrastructure", href: "#infrastructure" },
  { label: "Research", href: "#research" },
  { label: "Flagship Product", href: "#product" },
]

const COMPANY_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#compute-request" },
]

const GET_STARTED_LINKS = [
  { label: "Request Compute Access", href: "#compute-request" },
  { label: "Partner With Our Lab", href: "#compute-request" },
]

function FooterLinkColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div className="space-y-6">
      <h4 className="text-[14px] font-medium text-[#94A3B8]">{title}</h4>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-[15px] font-medium text-[#1E293B] hover:text-[#37322F] transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterCard() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-[#E9EBEE] rounded-[48px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-white rounded-[40px] m-2 shadow-sm">
          <div className="p-8 md:p-10 lg:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center gap-2.5">
                <LogoIcon />
                <span className="text-[26px] font-bold tracking-tight text-[#0F172A]">AK Research Lab</span>
              </div>
              <p className="text-[#64748B] leading-relaxed text-[16px] font-normal max-w-[320px]">
                GPU infrastructure, applied AI research, and production grade software engineering powering AI from
                compute to code.
              </p>
              <div className="space-y-3">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-2.5 text-[15px] font-medium text-[#1E293B] hover:text-[#37322F] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#64748B]" />
                  {siteConfig.contact.phoneDisplay}
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2.5 text-[15px] font-medium text-[#1E293B] hover:text-[#37322F] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#64748B]" />
                  {siteConfig.contact.email}
                </a>
                <p className="text-[14px] text-[#64748B] max-w-[280px] leading-relaxed">
                  {siteConfig.contact.address}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-[44px] h-[44px] flex items-center justify-center rounded-xl border border-slate-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-slate-50 transition-all active:scale-95 group"
                  >
                    <Icon className="w-5 h-5 text-slate-800" />
                  </a>
                ))}
              </div>
            </div>

            <FooterLinkColumn title="Lab" links={LAB_LINKS} />
            <FooterLinkColumn title="Company" links={COMPANY_LINKS} />
            <FooterLinkColumn title="Get Started" links={GET_STARTED_LINKS} />
          </div>
        </div>

        <div className="px-6 sm:px-12 md:px-16 lg:px-20 py-5 flex flex-col md:flex-row justify-between items-center gap-6 text-[15px]">
          <p className="text-[#64748B] font-medium">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-row gap-8 text-[#64748B] font-medium items-center">
            <a href="/privacy" className="hover:text-[#1E293B] transition-colors">
              Privacy Policy
            </a>
            <div className="w-[1px] h-4 bg-slate-300" />
            <a href="/terms" className="hover:text-[#1E293B] transition-colors">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FooterSection() {
  return (
    <footer className="w-full flex flex-col items-center gap-0 pt-16 md:pt-20 pb-10 md:pb-16">
      <FooterCard />
    </footer>
  )
}

"use client";

import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

function LogoIcon() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#37322F]">
      <span className="font-sans text-[11px] font-bold tracking-tight text-white">
        AK
      </span>
    </div>
  );
}

const SOCIALS = [
  { Icon: Twitter, label: "Twitter", href: siteConfig.socials.twitter },
  { Icon: Linkedin, label: "LinkedIn", href: siteConfig.socials.linkedin },
  { Icon: Github, label: "GitHub", href: siteConfig.socials.github },
];

const LAB_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "What We Do", href: "/#what-we-do" },
  { label: "Infrastructure", href: "/#infrastructure" },
  { label: "Research", href: "/#research" },
  { label: "Flagship Product", href: "/#product" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/#about" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Contact", href: "/#compute-request" },
];

const GET_STARTED_LINKS = [
  { label: "Request Compute Access", href: "/#compute-request" },
  { label: "Partner With Our Lab", href: "/#compute-request" },
];

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="space-y-6">
      <h4 className="text-[14px] font-medium text-[#94A3B8]">{title}</h4>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[15px] font-medium text-[#1E293B] transition-colors hover:text-[#37322F]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterCard() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="overflow-hidden rounded-[48px] border border-slate-200 bg-[#E9EBEE] shadow-sm">
        <div className="m-2 rounded-[40px] bg-white shadow-sm">
          <div className="grid grid-cols-1 gap-12 p-8 md:grid-cols-2 md:p-10 lg:grid-cols-5 lg:p-12">
            <div className="space-y-8 lg:col-span-2">
              <div className="flex items-center gap-2.5">
                <LogoIcon />
                <span className="text-[26px] font-bold tracking-tight text-[#0F172A]">
                  AK Research Lab
                </span>
              </div>
              <p className="max-w-[320px] text-[16px] leading-relaxed font-normal text-[#64748B]">
                GPU infrastructure, applied AI research, and production grade
                software engineering powering AI from compute to code.
              </p>
              <div className="space-y-3">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-2.5 text-[15px] font-medium text-[#1E293B] transition-colors hover:text-[#37322F]"
                >
                  <Phone className="h-4 w-4 text-[#64748B]" />
                  {siteConfig.contact.phoneDisplay}
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2.5 text-[15px] font-medium text-[#1E293B] transition-colors hover:text-[#37322F]"
                >
                  <Mail className="h-4 w-4 text-[#64748B]" />
                  {siteConfig.contact.email}
                </a>
                <p className="flex max-w-[280px] items-start gap-2.5 text-[15px] leading-relaxed font-medium text-[#1E293B]">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#64748B]" />
                  {siteConfig.contact.address}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="group flex h-[44px] w-[44px] items-center justify-center rounded-xl border border-slate-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all hover:bg-slate-50 active:scale-95"
                  >
                    <Icon className="h-5 w-5 text-slate-800" />
                  </a>
                ))}
              </div>
            </div>

            <FooterLinkColumn title="Lab" links={LAB_LINKS} />
            <FooterLinkColumn title="Company" links={COMPANY_LINKS} />
            <FooterLinkColumn title="Get Started" links={GET_STARTED_LINKS} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 px-6 py-5 text-[15px] sm:px-12 md:flex-row md:px-16 lg:px-20">
          <p className="font-medium text-[#64748B]">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-row items-center gap-8 font-medium text-[#64748B]">
            <Link
              href="/privacy"
              className="transition-colors hover:text-[#1E293B]"
            >
              Privacy Policy
            </Link>
            <div className="h-4 w-[1px] bg-slate-300" />
            <Link
              href="/terms"
              className="transition-colors hover:text-[#1E293B]"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FooterSection() {
  return (
    <footer className="flex w-full flex-col items-center gap-0 pt-16 pb-10 md:pt-20 md:pb-16">
      <FooterCard />
    </footer>
  );
}

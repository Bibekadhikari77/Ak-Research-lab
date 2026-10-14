import Link from "next/link";
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Container } from "@/components/ui/container";
import { contactHref } from "@/lib/inquiry";
import { meroimsLinks, siteConfig } from "@/lib/site-config";
import { LogoMark } from "./logo";

type FooterLink = { label: string; href: string; external?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Research", href: "/research" },
      { label: "Solutions", href: "/solutions" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Our Product",
    links: [
      { label: "MeroIMS", href: "/solutions" },
      { label: "Explore MeroIMS", href: meroimsLinks.site, external: true },
      { label: "Request a Demo", href: contactHref("meroims-demo") },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Why Us", href: "/about#why-us" },
      { label: "Contact", href: "/contact" },
      { label: "Get Started", href: contactHref() },
    ],
  },
];

const socials = [
  { Icon: Linkedin, label: "LinkedIn", href: siteConfig.socials.linkedin },
  { Icon: Github, label: "GitHub", href: siteConfig.socials.github },
  { Icon: Twitter, label: "X (Twitter)", href: siteConfig.socials.twitter },
].filter((social) => social.href);

export default function SiteFooter() {
  return (
    <footer className="bg-ink relative overflow-hidden border-t border-white/10 text-slate-400">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:py-20">
        <div className="flex flex-col gap-6 lg:col-span-3">
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <span className="text-lg font-semibold tracking-tight text-white">
              {siteConfig.name}
            </span>
          </div>
          <p className="max-w-xs text-sm leading-6">
            Applied AI research, production-grade software engineering, and
            AI-powered products such as MeroIMS.
          </p>
          {socials.length > 0 ? (
            <ul className="flex gap-2">
              {socials.map(({ Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition-colors hover:border-white/25 hover:text-white"
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {columns.map((column) => (
          <nav
            key={column.title}
            aria-label={column.title}
            className="lg:col-span-2"
          >
            <h2 className="text-sm font-semibold text-white">{column.title}</h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              {column.links.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-white">Contact</h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 whitespace-nowrap transition-colors hover:text-white"
              >
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-2 whitespace-nowrap transition-colors hover:text-white"
              >
                <Phone aria-hidden="true" className="h-4 w-4 shrink-0" />
                {siteConfig.contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2 whitespace-nowrap">
              <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
              {siteConfig.contact.address}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {siteConfig.legalName} All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}

// Central place for site-wide facts used across metadata, robots.txt,
// sitemap.xml, the footer, and the legal pages. Update these once and
// every consumer picks up the change.

// TODO: replace with the real production domain once one exists.
const SITE_URL = "https://akresearchlab.com"

export const siteConfig = {
  name: "AK Research Lab",
  legalName: "AK Research Lab Pvt. Ltd.",
  url: SITE_URL,
  title: "AK Research Lab - Powering AI, From Compute to Code",
  description:
    "AK Research Lab provides GPU infrastructure, compute access, and deep technical expertise in software engineering and model training, building research-driven solutions like our own AI-powered accounting software.",
  contact: {
    email: "akresearchteam@gmail.com",
    phone: "+9876543211",
    phoneDisplay: "9876543211",
    address: "Kalanki, Kathmandu",
  },
  socials: {
    twitter: "#",
    linkedin: "#",
    github: "#",
  },
} as const

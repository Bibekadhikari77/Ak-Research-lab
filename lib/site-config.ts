// Central place for site-wide facts used across metadata, robots.txt,
// sitemap.xml, the footer, and the legal pages. Update these once and
// every consumer picks up the change.

// TODO: replace with the real production domain once one exists.
const SITE_URL = "https://akresearchlab.com";

export const siteConfig = {
  name: "AK Research Lab",
  legalName: "AK Research Lab Pvt. Ltd.",
  url: SITE_URL,
  title: "AK Research Lab — Powering AI, From Research to Code",
  description:
    "AK Research Lab combines applied AI research and production-grade software engineering to turn complex technical challenges into practical solutions. We build our own AI-powered products, including MeroIMS.",
  contact: {
    email: "akresearchteam@gmail.com",
    // TODO: verify this number before publishing.
    phone: "+9876543211",
    phoneDisplay: "9876543211",
    address: "Kathmandu, Nepal",
  },
  // Leave a value empty to hide that icon in the footer.
  socials: {
    linkedin: "",
    github: "",
    twitter: "",
  },
  // Optional third-party form endpoint (e.g. Formspree) that accepts a JSON
  // POST. When unset, the contact form falls back to opening a pre-filled
  // email to `contact.email`, so no inquiry is silently dropped.
  contactFormEndpoint: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ?? "",
} as const;

// MeroIMS is AK Research Lab's flagship product. Links point to the
// product's own site, which remains the source of truth for features and
// pricing.
export const meroimsLinks = {
  site: "https://meroims.com",
  pricing: "https://meroims.com/pricing",
  register: "https://meroims.com/register",
  help: "https://meroims.com/help",
  faqs: "https://meroims.com/faqs",
} as const;

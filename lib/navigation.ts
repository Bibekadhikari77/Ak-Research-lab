import { meroimsLinks } from "./site-config";
import { contactHref } from "./inquiry";

export type NavLink = { label: string; href: string; external?: boolean };

// Shown in the desktop header. Home is the logo; the mobile menu adds it
// explicitly.
export const primaryNav: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Research", href: "/research" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const mobileNav: NavLink[] = [
  { label: "Home", href: "/" },
  ...primaryNav,
];

export const meroimsNavLink: NavLink = {
  label: "MeroIMS",
  href: meroimsLinks.site,
  external: true,
};

export const getStartedHref = contactHref();

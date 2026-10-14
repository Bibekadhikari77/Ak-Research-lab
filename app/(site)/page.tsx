import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import {
  AboutHighlight,
  CtaBand,
  ResearchHighlight,
  ServicesHighlight,
  SolutionsHighlight,
} from "@/components/home/highlights";
import Hero from "@/components/sections/hero";
import LatestPosts from "@/components/sections/latest-posts";
import { meroimsLinks, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  email: siteConfig.contact.email,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  owns: {
    "@type": "SoftwareApplication",
    name: "MeroIMS",
    url: meroimsLinks.site,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organization} />
      <Hero />
      <AboutHighlight />
      <ServicesHighlight />
      <SolutionsHighlight />
      <ResearchHighlight />
      <LatestPosts />
      <CtaBand />
    </>
  );
}

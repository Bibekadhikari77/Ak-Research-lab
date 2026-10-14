import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import SiteNav from "../components/site-nav";
import HeroAISection from "../components/hero-ai-section";
import AboutSection from "../components/about-section";
import ServicesSection from "../components/services-section";
import WhatWeDoSection from "../components/what-we-do-section";
import InfrastructureSection from "../components/infrastructure-section";
import ResearchSection from "../components/research-section";
import FlagshipProductSection from "../components/flagship-product-section";
import WhyUsSection from "../components/why-us-section";
import FinalCTASection from "../components/final-cta-section";
import FooterSection from "../components/footer-section";
import MobileStickyCta from "../components/mobile-sticky-cta";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden bg-[#F7F5F3]">
      <div className="relative flex w-full flex-col items-center justify-start">
        {/* Main container with proper margins */}
        <div className="relative flex min-h-screen w-full max-w-none flex-col items-start justify-start px-4 sm:px-6 md:px-8 lg:w-[1060px] lg:max-w-[1060px] lg:px-0">
          <div className="relative z-10 flex flex-col items-center justify-center gap-4 self-stretch overflow-hidden border-b border-[rgba(55,50,47,0.06)] pt-[9px] sm:gap-6 md:gap-8 lg:gap-[66px]">
            <SiteNav />

            <div
              id="hero"
              className="flex w-full scroll-mt-24 flex-col items-center justify-start px-2 pr-0 pl-0 sm:px-4 sm:pr-0 sm:pl-0 md:px-8 lg:px-0"
            >
              <HeroAISection />
              <AboutSection />
              <ServicesSection />
              <WhatWeDoSection />
              <InfrastructureSection />
              <ResearchSection />
              <FlagshipProductSection />
              <WhyUsSection />
              <FinalCTASection />
              <FooterSection />
            </div>
          </div>
        </div>
      </div>
      <MobileStickyCta />
    </div>
  );
}

import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"
import SiteNav from "../components/site-nav"
import HeroAISection from "../components/hero-ai-section"
import AboutSection from "../components/about-section"
import ServicesSection from "../components/services-section"
import WhatWeDoSection from "../components/what-we-do-section"
import InfrastructureSection from "../components/infrastructure-section"
import ResearchSection from "../components/research-section"
import FlagshipProductSection from "../components/flagship-product-section"
import WhyUsSection from "../components/why-us-section"
import FinalCTASection from "../components/final-cta-section"
import FooterSection from "../components/footer-section"
import MobileStickyCta from "../components/mobile-sticky-cta"

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: { canonical: "/" },
}

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen relative bg-[#F7F5F3] overflow-x-hidden flex flex-col justify-start items-center">
      <div className="relative flex flex-col justify-start items-center w-full">
        {/* Main container with proper margins */}
        <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] lg:w-[1060px] relative flex flex-col justify-start items-start min-h-screen">
          <div className="self-stretch pt-[9px] overflow-hidden border-b border-[rgba(55,50,47,0.06)] flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[66px] relative z-10">
            <SiteNav />

            <div id="hero" className="flex flex-col justify-start items-center px-2 sm:px-4 md:px-8 lg:px-0 w-full sm:pl-0 sm:pr-0 pl-0 pr-0 scroll-mt-24">
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
  )
}

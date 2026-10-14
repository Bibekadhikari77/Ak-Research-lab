import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import MobileStickyCta from "@/components/layout/mobile-sticky-cta";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex flex-1 flex-col">
        {children}
      </main>
      <SiteFooter />
      <MobileStickyCta />
    </>
  );
}

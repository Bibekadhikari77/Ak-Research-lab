import { Suspense } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  ContactForm,
  ContactFormFromUrl,
} from "@/components/contact/contact-form";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

const contactDetails = [
  {
    Icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    Icon: Phone,
    label: "Phone",
    value: siteConfig.contact.phoneDisplay,
    href: `tel:${siteConfig.contact.phone}`,
  },
  { Icon: MapPin, label: "Office", value: siteConfig.contact.address },
];

export default function Contact({ asPage = false }: { asPage?: boolean }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className={cn(
        "bg-ink relative isolate scroll-mt-16 overflow-hidden py-20 sm:py-28",
        asPage && "flex-1 pt-32 sm:pt-40",
      )}
    >
      <div aria-hidden="true" className="bg-tech-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="bg-brand-600/15 absolute top-1/3 -left-40 -z-10 h-[420px] w-[620px] rounded-full blur-[120px]"
      />

      <Container className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <div className="flex flex-col gap-10">
          <SectionHeading
            tone="dark"
            as={asPage ? "h1" : "h2"}
            eyebrow="Contact"
            id="contact-title"
            title="Let's build something meaningful with AI"
            description="Whether you need research collaboration, software engineering expertise, or a business solution such as MeroIMS, tell us about your requirements."
          />
          <ul className="flex flex-col gap-4">
            {contactDetails.map(({ Icon, label, value, href }, index) => (
              <Reveal
                as="li"
                index={index}
                key={label}
                className="flex items-center gap-4"
              >
                <span className="text-gold-300 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">{label}</span>
                  {href ? (
                    <a
                      href={href}
                      className="hover:text-gold-200 text-sm font-medium break-all text-white transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-white">
                      {value}
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Suspense fallback={<ContactForm />}>
          <ContactFormFromUrl />
        </Suspense>
      </Container>
    </section>
  );
}

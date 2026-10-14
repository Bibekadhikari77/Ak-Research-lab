import type { Metadata } from "next"
import { LegalPageShell } from "@/components/legal-page-shell"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information.`,
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell title="Privacy Policy" updated="September 14, 2026">
      <p>
        This Privacy Policy explains how {siteConfig.legalName} (&quot;{siteConfig.name}
        ,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and protects
        information when you visit our website or submit a request through our contact forms.
      </p>

      <h2>Information We Collect</h2>
      <p>We collect information in the following ways:</p>
      <ul>
        <li>
          <strong>Information you provide directly:</strong> name, email address, company, and
          the details you submit through our compute-request / contact form.
        </li>
        <li>
          <strong>Usage data:</strong> pages visited, time on page, referring source, and device
          type, collected automatically through analytics.
        </li>
        <li>
          <strong>Cookies:</strong> small files used to remember your cookie preference and to
          power analytics. See the Cookies section below.
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To respond to compute-access, partnership, and research inquiries.</li>
        <li>To operate, maintain, and improve this website.</li>
        <li>To understand aggregate site usage through analytics.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        We use cookies and similar technologies for essential site functionality and for
        analytics. You can accept or decline non-essential cookies from the banner shown on your
        first visit, and you can clear your browser&apos;s storage at any time to reset that
        choice.
      </p>

      <h2>How We Share Information</h2>
      <p>
        We do not sell your personal information. We may share information with service
        providers who help us operate this site (such as analytics and hosting providers), or
        when required by law.
      </p>

      <h2>Data Retention</h2>
      <p>
        We retain contact-form submissions for as long as needed to respond to your inquiry and
        maintain business records, after which they are deleted or anonymized.
      </p>

      <h2>Your Rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal information by
        contacting us using the details below.
      </p>

      <h2>Contact Us</h2>
      <p>
        {siteConfig.legalName}
        <br />
        {siteConfig.contact.address}
        <br />
        Email:{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
        <br />
        Phone: <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phoneDisplay}</a>
      </p>
    </LegalPageShell>
  )
}

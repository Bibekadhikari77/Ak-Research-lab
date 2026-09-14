import type { Metadata } from "next"
import { LegalPageShell } from "@/components/legal-page-shell"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `The terms that govern your use of the ${siteConfig.name} website.`,
}

export default function TermsPage() {
  return (
    <LegalPageShell title="Terms and Conditions" updated="September 14, 2026">
      <p>
        These Terms and Conditions (&quot;Terms&quot;) govern your use of the {siteConfig.name}{" "}
        website operated by {siteConfig.legalName}. By accessing this site or submitting a
        request through it, you agree to these Terms.
      </p>

      <h2>Use of This Site</h2>
      <p>
        This website is provided to share information about {siteConfig.name}&apos;s services
        and to let visitors request compute access, partnerships, or general contact. You agree
        to use it only for lawful purposes and not to misuse, disrupt, or attempt unauthorized
        access to it.
      </p>

      <h2>No Guarantee of Service</h2>
      <p>
        Submitting a request through this site does not guarantee access to compute resources,
        a partnership, or any specific outcome. Any resulting engagement is subject to a
        separate written agreement between you and {siteConfig.legalName}.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on this site, including text, graphics, logos, and product names, is the
        property of {siteConfig.legalName} or its licensors and may not be reproduced without
        permission.
      </p>

      <h2>Third-Party Links</h2>
      <p>
        This site may link to third-party websites. We are not responsible for the content or
        practices of any linked site.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        This site and its content are provided &quot;as is,&quot; without warranties of any
        kind. To the fullest extent permitted by law, {siteConfig.legalName} is not liable for
        any indirect, incidental, or consequential damages arising from your use of this site.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the site after changes are
        posted constitutes acceptance of the updated Terms.
      </p>

      <h2>Governing Law</h2>
      <p>
        These Terms are governed by the laws of the jurisdiction in which {siteConfig.legalName}{" "}
        is registered, without regard to conflict-of-law principles.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about these Terms can be sent to{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
      </p>
    </LegalPageShell>
  )
}

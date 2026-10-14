import type { Metadata } from "next";
import Contact from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact AK Research Lab about research collaboration, software engineering, GPU compute access, or a MeroIMS demo.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <Contact asPage />;
}

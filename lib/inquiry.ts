// Inquiry categories shared by the contact form and every CTA that deep-links
// into it (e.g. "Request a Demo" preselects the MeroIMS demo option).

export const inquiryCategories = [
  { value: "gpu-compute", label: "GPU Compute Access" },
  { value: "model-training", label: "AI Model Training" },
  { value: "research", label: "Research Collaboration" },
  { value: "software-engineering", label: "Software Engineering" },
  { value: "meroims-demo", label: "MeroIMS Demo" },
  { value: "other", label: "Other" },
] as const;

export type InquiryCategory = (typeof inquiryCategories)[number]["value"];

export function isInquiryCategory(value: unknown): value is InquiryCategory {
  return inquiryCategories.some((category) => category.value === value);
}

export function inquiryLabel(value: InquiryCategory): string {
  return (
    inquiryCategories.find((category) => category.value === value)?.label ??
    value
  );
}

/** Link to the contact page, optionally with an inquiry topic preselected. */
export function contactHref(category?: InquiryCategory): string {
  return category ? `/contact?inquiry=${category}` : "/contact";
}

export type InquiryValues = {
  name: string;
  email: string;
  organization: string;
  category: string;
  requirements: string;
  budget: string;
  consent: boolean;
};

export type InquiryErrors = Partial<Record<keyof InquiryValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_REQUIREMENTS = 5000;

export function validateInquiry(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};

  if (!values.name.trim()) errors.name = "Please enter your full name.";
  else if (values.name.trim().length > 120)
    errors.name = "Please keep your name under 120 characters.";

  if (!values.email.trim()) errors.email = "Please enter your work email.";
  else if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";

  if (!isInquiryCategory(values.category))
    errors.category = "Please choose what you'd like to discuss.";

  if (values.requirements.trim().length < 20)
    errors.requirements =
      "Please describe your requirements in a sentence or two (at least 20 characters).";
  else if (values.requirements.length > MAX_REQUIREMENTS)
    errors.requirements = `Please keep this under ${MAX_REQUIREMENTS} characters.`;

  if (!values.consent)
    errors.consent = "Please agree to the privacy policy so we can reply.";

  return errors;
}

import { describe, expect, it } from "vitest";
import {
  contactHref,
  isInquiryCategory,
  validateInquiry,
  type InquiryValues,
} from "./inquiry";

const valid: InquiryValues = {
  name: "Sita Sharma",
  email: "sita@example.com",
  organization: "",
  category: "meroims-demo",
  requirements: "We'd like to see MeroIMS for our two retail branches.",
  budget: "",
  consent: true,
};

describe("validateInquiry", () => {
  it("accepts a complete inquiry with optional fields empty", () => {
    expect(validateInquiry(valid)).toEqual({});
  });

  it("reports each missing or invalid required field", () => {
    const errors = validateInquiry({
      ...valid,
      name: "  ",
      email: "not-an-email",
      category: "free-gpus",
      requirements: "hi",
      consent: false,
    });
    expect(Object.keys(errors).sort()).toEqual(
      ["category", "consent", "email", "name", "requirements"].sort(),
    );
  });
});

describe("inquiry links", () => {
  it("builds deep links that preselect a topic", () => {
    expect(contactHref()).toBe("/contact");
    expect(contactHref("meroims-demo")).toBe("/contact?inquiry=meroims-demo");
  });

  it("only accepts known categories", () => {
    expect(isInquiryCategory("research")).toBe(true);
    expect(isInquiryCategory("<script>")).toBe(false);
    expect(isInquiryCategory(null)).toBe(false);
  });
});

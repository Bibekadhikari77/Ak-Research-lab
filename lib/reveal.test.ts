import { describe, expect, it } from "vitest";
import { revealDelay } from "./reveal";

describe("revealDelay", () => {
  it("staggers siblings", () => {
    expect(revealDelay()).toBe("0ms");
    expect(revealDelay(2)).toBe("140ms");
  });

  it("caps the delay so long lists don't lag", () => {
    expect(revealDelay(50)).toBe(revealDelay(6));
    expect(revealDelay(-1)).toBe("0ms");
  });
});

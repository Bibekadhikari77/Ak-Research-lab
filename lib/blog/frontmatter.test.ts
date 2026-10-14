import { describe, expect, it } from "vitest";
import { parseFrontmatter } from "./frontmatter";

describe("parseFrontmatter", () => {
  it("parses strings, quoted values with colons, booleans, and lists", () => {
    const { data, body } = parseFrontmatter(
      [
        "---",
        'title: "MeroIMS: an update"',
        "category: meroims",
        "featured: true",
        "tags: [gpu, 'model training']",
        "---",
        "",
        "Body text.",
      ].join("\n"),
    );

    expect(data).toEqual({
      title: "MeroIMS: an update",
      category: "meroims",
      featured: true,
      tags: ["gpu", "model training"],
    });
    expect(body).toBe("Body text.");
  });

  it("handles Windows line endings and empty lists", () => {
    const { data } = parseFrontmatter("---\r\ntags: []\r\n---\r\nHi");
    expect(data.tags).toEqual([]);
  });

  it("rejects files without frontmatter fences", () => {
    expect(() => parseFrontmatter("title: x", "a.md")).toThrow(/opening/);
    expect(() => parseFrontmatter("---\ntitle: x\n", "a.md")).toThrow(
      /closing/,
    );
  });

  it("rejects lines that are not key: value pairs", () => {
    expect(() => parseFrontmatter("---\njust text\n---\n", "a.md")).toThrow(
      /line 2/,
    );
  });
});

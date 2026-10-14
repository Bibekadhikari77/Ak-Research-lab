import { describe, expect, it } from "vitest";
import { readingMinutes, renderMarkdown, slugify } from "./markdown";

describe("renderMarkdown", () => {
  it("adds unique heading ids and collects h2/h3 for the table of contents", () => {
    const { html, headings } = renderMarkdown(
      [
        "## Getting started",
        "### Setup & install",
        "## Getting started",
        "#### Deep",
      ].join("\n\n"),
    );

    expect(headings).toEqual([
      { id: "getting-started", text: "Getting started", depth: 2 },
      { id: "setup-install", text: "Setup & install", depth: 3 },
      { id: "getting-started-1", text: "Getting started", depth: 2 },
    ]);
    expect(html).toContain('<h2 id="getting-started">');
    expect(html).toContain('<h4 id="deep">');
  });

  it("opens external links in a new tab and leaves internal links alone", () => {
    const { html } = renderMarkdown(
      "[site](https://meroims.com) and [blog](/blog)",
    );
    expect(html).toContain(
      '<a href="https://meroims.com" target="_blank" rel="noopener noreferrer">site</a>',
    );
    expect(html).toContain('<a href="/blog">blog</a>');
  });

  it("lazy-loads images and renders GFM tables and code", () => {
    const { html } = renderMarkdown(
      "![A chart](/c.png)\n\n| a | b |\n| - | - |\n| 1 | 2 |\n\n```ts\nconst x = 1;\n```",
    );
    expect(html).toContain('alt="A chart"');
    expect(html).toContain('loading="lazy"');
    expect(html).toContain("<table>");
    expect(html).toContain('<code class="language-ts">');
  });
});

describe("slugify", () => {
  it("produces URL-safe ids", () => {
    expect(slugify("Hello, World!  Again")).toBe("hello-world-again");
    expect(slugify("Café déjà vu")).toBe("cafe-deja-vu");
    expect(slugify("!!!")).toBe("section");
  });
});

describe("readingMinutes", () => {
  it("is at least one minute and ignores code blocks", () => {
    expect(readingMinutes("short")).toBe(1);
    const words = Array.from({ length: 660 }, () => "word").join(" ");
    expect(readingMinutes(words)).toBe(3);
    expect(readingMinutes(`${words}\n\n\`\`\`\n${words}\n\`\`\``)).toBe(3);
  });
});

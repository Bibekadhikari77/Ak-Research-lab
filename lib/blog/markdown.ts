import { Marked, type Tokens } from "marked";

export type Heading = { id: string; text: string; depth: 2 | 3 };

export type RenderedMarkdown = { html: string; headings: Heading[] };

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

function toPlainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&(amp|lt|gt|quot|#39);/g, (entity) => ENTITIES[entity])
    .trim();
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/[\s-]+/g, "-") || "section"
  );
}

const EXTERNAL_LINK = /^https?:\/\//i;

/**
 * Renders post Markdown to HTML. Headings get stable anchor ids so the table
 * of contents can link to them, external links open in a new tab, and images
 * load lazily. Post content comes from files in this repository, so it is
 * trusted and not sanitized further.
 */
export function renderMarkdown(source: string): RenderedMarkdown {
  const headings: Heading[] = [];
  const usedIds = new Map<string, number>();

  const uniqueId = (text: string) => {
    const base = slugify(text);
    const count = usedIds.get(base) ?? 0;
    usedIds.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };

  const marked = new Marked({
    gfm: true,
    async: false,
    renderer: {
      heading({ tokens, depth }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        const text = toPlainText(inner);
        const id = uniqueId(text);
        if (depth === 2 || depth === 3) headings.push({ id, text, depth });
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
      link({ href, title, tokens }: Tokens.Link) {
        const inner = this.parser.parseInline(tokens);
        const titleAttr = title ? ` title="${escapeAttribute(title)}"` : "";
        const externalAttrs = EXTERNAL_LINK.test(href)
          ? ' target="_blank" rel="noopener noreferrer"'
          : "";
        return `<a href="${escapeAttribute(href)}"${titleAttr}${externalAttrs}>${inner}</a>`;
      },
      image({ href, title, text }: Tokens.Image) {
        const titleAttr = title ? ` title="${escapeAttribute(title)}"` : "";
        return `<img src="${escapeAttribute(href)}" alt="${escapeAttribute(text)}"${titleAttr} loading="lazy" decoding="async" />`;
      },
    },
  });

  const html = marked.parse(source) as string;
  return { html, headings };
}

const WORDS_PER_MINUTE = 220;

export function readingMinutes(markdown: string): number {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`[\]()!-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

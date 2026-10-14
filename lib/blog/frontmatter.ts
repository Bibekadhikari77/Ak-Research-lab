// Minimal frontmatter parser for blog posts. Supports the subset of YAML the
// post template uses: `key: value` pairs, quoted strings, booleans, and
// inline lists (`tags: [a, b]`). Anything else is a build error, so a typo
// can't silently publish a broken post.

export type FrontmatterValue = string | boolean | string[];

export type ParsedDocument = {
  data: Record<string, FrontmatterValue>;
  body: string;
};

const FENCE = "---";

function unquote(raw: string): string {
  const value = raw.trim();
  if (
    value.length >= 2 &&
    ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'")))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function parseValue(raw: string): FrontmatterValue {
  const value = raw.trim();
  if (value === "true") return true;
  if (value === "false") return false;
  if (value.startsWith("[") && value.endsWith("]")) {
    const inner = value.slice(1, -1).trim();
    if (!inner) return [];
    return inner
      .split(",")
      .map((item) => unquote(item))
      .filter(Boolean);
  }
  return unquote(value);
}

export function parseFrontmatter(
  source: string,
  file = "post",
): ParsedDocument {
  const normalized = source.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");

  if (lines[0]?.trim() !== FENCE) {
    throw new Error(`${file}: missing opening "---" frontmatter fence.`);
  }

  const end = lines.findIndex((line, i) => i > 0 && line.trim() === FENCE);
  if (end === -1) {
    throw new Error(`${file}: missing closing "---" frontmatter fence.`);
  }

  const data: Record<string, FrontmatterValue> = {};
  lines.slice(1, end).forEach((line, i) => {
    if (!line.trim() || line.trim().startsWith("#")) return;
    const match = /^([A-Za-z][\w-]*)\s*:\s*(.*)$/.exec(line);
    if (!match) {
      throw new Error(
        `${file}: can't read frontmatter line ${i + 2}: "${line.trim()}". Use "key: value".`,
      );
    }
    data[match[1]] = parseValue(match[2]);
  });

  return {
    data,
    body: lines
      .slice(end + 1)
      .join("\n")
      .trim(),
  };
}

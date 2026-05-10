import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
  toc: TocItem[];
  readingMinutes: number;
}

interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export function slugifyHeading(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[`*_~[\]()]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function isValidDateString(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().startsWith(value);
}

function validateFrontmatter(data: Record<string, unknown>, slug: string): PostFrontmatter {
  const errors: string[] = [];
  const { title, date, description, tags } = data;

  if (typeof title !== "string" || title.trim() === "") {
    errors.push("title 必须是非空字符串");
  }

  if (typeof date !== "string" || !isValidDateString(date)) {
    errors.push("date 必须是 YYYY-MM-DD 格式的有效日期");
  }

  if (typeof description !== "string" || description.trim() === "") {
    errors.push("description 必须是非空字符串");
  }

  if (!Array.isArray(tags) || !tags.every((tag) => typeof tag === "string")) {
    errors.push("tags 必须是字符串数组");
  }

  if (errors.length > 0) {
    throw new Error(`文章 ${slug}.mdx 的 frontmatter 不合法：${errors.join("；")}`);
  }

  return {
    title: typeof title === "string" ? title.trim() : "",
    date: typeof date === "string" ? date : "",
    description: typeof description === "string" ? description.trim() : "",
    tags: Array.isArray(tags) ? tags.filter((tag) => typeof tag === "string") : [],
  };
}

function getPlainHeadingText(value: string): string {
  return value
    .replace(/#+\s*$/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .trim();
}

function extractToc(content: string): TocItem[] {
  const headingPattern = /^(##|###)\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingPattern.exec(content)) !== null) {
    const text = getPlainHeadingText(match[2]);
    const id = slugifyHeading(text);
    if (!id) continue;

    toc.push({
      id,
      text,
      level: match[1] === "##" ? 2 : 3,
    });
  }

  return toc;
}

function getReadingMinutes(content: string): number {
  const cjkMatches = content.match(/[\u4e00-\u9fff]/g) ?? [];
  const latinWords = content
    .replace(/[\u4e00-\u9fff]/g, " ")
    .match(/[A-Za-z0-9_]+/g) ?? [];
  const weightedWords = cjkMatches.length / 2 + latinWords.length;

  return Math.max(1, Math.ceil(weightedWords / 220));
}

function readPost(fileName: string): Post {
  const slug = fileName.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = validateFrontmatter(data, slug);

  return {
    slug,
    ...frontmatter,
    content: content || "",
    toc: extractToc(content || ""),
    readingMinutes: getReadingMinutes(content || ""),
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => readPost(fileName))
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  if (!slug) return null;

  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  return readPost(`${slug}.mdx`);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}

export function getAllTags(): { name: string; count: number }[] {
  const tagCounts = new Map<string, number>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(tagCounts, ([name, count]) => ({ name, count })).sort((a, b) =>
    a.name.localeCompare(b.name, "zh-CN"),
  );
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getArchiveGroups(): { year: string; posts: Post[] }[] {
  const groups = new Map<string, Post[]>();

  for (const post of getAllPosts()) {
    const year = post.date.slice(0, 4);
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }

  return Array.from(groups, ([year, posts]) => ({ year, posts })).sort((a, b) =>
    b.year.localeCompare(a.year),
  );
}

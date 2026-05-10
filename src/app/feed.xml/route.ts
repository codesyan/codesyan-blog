import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getAllPosts();
  const latestPost = posts[0];
  const lastBuildDate = latestPost
    ? new Date(`${latestPost.date}T00:00:00.000Z`).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/posts/${post.slug}`;

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <description>${escapeXml(post.description)}</description>
          <pubDate>${new Date(`${post.date}T00:00:00.000Z`).toUTCString()}</pubDate>
          ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("")}
        </item>`;
    })
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(siteConfig.name)}</title>
        <link>${siteConfig.url}</link>
        <description>${escapeXml(siteConfig.description)}</description>
        <language>zh-CN</language>
        <lastBuildDate>${lastBuildDate}</lastBuildDate>
        <managingEditor>${siteConfig.email} (${escapeXml(siteConfig.author.name)})</managingEditor>
        <webMaster>${siteConfig.email} (${escapeXml(siteConfig.author.name)})</webMaster>
        ${items}
      </channel>
    </rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

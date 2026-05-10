import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const allPosts = getAllPosts();
  const allTags = getAllTags();
  const latestPostDate = allPosts[0]?.date ?? new Date().toISOString();
  const posts = allPosts.map((post) => ({
    url: `${siteConfig.url}/posts/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const tags = allTags.map((tag) => ({
    url: `${siteConfig.url}/tags/${encodeURIComponent(tag.name)}`,
    lastModified: latestPostDate,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/archive`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/search`,
      lastModified: latestPostDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteConfig.url}/tags`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...posts,
    ...tags,
  ];
}

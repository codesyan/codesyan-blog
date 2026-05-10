import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const allPosts = getAllPosts();
  const latestPostDate = allPosts[0]?.date ?? new Date().toISOString();
  const posts = allPosts.map((post) => ({
    url: `${siteConfig.url}/posts/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...posts,
  ];
}

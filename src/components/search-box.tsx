"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatDate } from "@/lib/format";

export interface SearchPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingMinutes: number;
}

export function SearchBox({ posts }: { posts: SearchPost[] }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) return posts;

    return posts.filter((post) => {
      const haystack = [
        post.title,
        post.description,
        post.date,
        ...post.tags,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery, posts]);

  return (
    <div>
      <label className="sr-only" htmlFor="blog-search">
        搜索文章
      </label>
      <input
        id="blog-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="搜索标题、摘要或标签"
        className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground shadow-sm outline-none transition-colors placeholder:text-muted focus:border-accent"
      />

      <div className="mt-6 text-sm text-muted">
        {normalizedQuery ? `找到 ${results.length} 篇文章` : `共 ${posts.length} 篇文章`}
      </div>

      <div className="mt-4 grid gap-4">
        {results.map((post) => (
          <article
            key={post.slug}
            className="rounded-lg border border-border bg-surface p-5 shadow-sm transition-colors hover:border-accent"
          >
            <Link href={`/posts/${post.slug}`} className="group block">
              <h2 className="text-xl font-semibold transition-colors group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">{post.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>约 {post.readingMinutes} 分钟</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-surface-muted px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

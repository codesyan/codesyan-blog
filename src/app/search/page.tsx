import type { Metadata } from "next";
import { SearchBox } from "@/components/search-box";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "搜索",
  description: "搜索山石玩AI的文章。",
  alternates: {
    canonical: "/search",
  },
};

export default function SearchPage() {
  const posts = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    description: post.description,
    tags: post.tags,
    readingMinutes: post.readingMinutes,
  }));

  return (
    <div className="page-shell">
      <header className="mb-10 border-b border-border pb-8">
        <div className="page-kicker mb-4">Search</div>
        <h1 className="text-3xl font-semibold text-foreground sm:text-5xl">
          搜索
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          按标题、摘要和标签快速筛选文章。
        </p>
      </header>

      <SearchBox posts={posts} />
    </div>
  );
}

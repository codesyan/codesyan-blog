import type { Metadata } from "next";
import { TagPill } from "@/components/tag-pill";
import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "标签",
  description: "按主题浏览山石玩AI的文章。",
  alternates: {
    canonical: "/tags",
  },
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="page-shell">
      <header className="mb-10 border-b border-border pb-8">
        <div className="page-kicker mb-4">Tags</div>
        <h1 className="text-3xl font-semibold text-foreground sm:text-5xl">
          标签
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          按主题查看文章，快速找到同一类 AI Coding 记录。
        </p>
      </header>

      {tags.length === 0 ? (
        <p className="surface-panel p-6 text-sm text-muted">
          暂时还没有标签。
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagPill key={tag.name} tag={tag.name} count={tag.count} />
          ))}
        </div>
      )}
    </div>
  );
}

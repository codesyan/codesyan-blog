import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { TagPill } from "@/components/tag-pill";
import { getAllPosts, getAllTags } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const featuredPosts = posts.slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
      <section className="mb-16 max-w-3xl">
        <div className="mb-5 inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted shadow-sm">
          AI Coding Notes
        </div>
        <h1 className="mb-5 text-4xl font-bold leading-tight text-foreground sm:text-6xl">
          山石玩AI
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted">
          一个关于 AI Coding 的个人博客。记录 AI 工具的使用心得、Prompt 工程技巧和开发感悟。
          <span className="block mt-1">山石合则为岩——稳重求实，玩则有趣。</span>
        </p>
      </section>

      {tags.length > 0 && (
        <section className="mb-14">
          <div className="mb-4 flex items-end justify-between border-b border-border pb-3">
            <h2 className="text-lg font-semibold">主题标签</h2>
            <Link href="/tags" className="text-sm text-muted hover:text-accent">
              查看全部
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagPill key={tag.name} tag={tag.name} count={tag.count} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="mb-6 flex items-end justify-between border-b border-border pb-3">
          <h2 className="text-lg font-semibold">最新文章</h2>
          <span className="text-sm text-muted">{posts.length} 篇</span>
        </div>
        {posts.length === 0 ? (
          <p className="rounded-lg border border-border bg-surface p-6 text-sm text-muted shadow-sm">
            还没有文章，第一篇在路上。
          </p>
        ) : (
          <div className="grid gap-4">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

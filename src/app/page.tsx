import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { TagPill } from "@/components/tag-pill";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const featuredPosts = posts.slice(0, 3);
  const latestPost = posts[0];

  return (
    <div className="page-shell">
      <section className="mb-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-end">
        <div className="max-w-3xl">
          <div className="page-kicker mb-5">AI Coding Notes</div>
          <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
            山石玩AI
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            记录 AI 时代的编码实践、工具选择和工作流复盘。少一点口号，多一点能回到编辑器里的经验。
            <span className="mt-2 block text-foreground">
              山石合则为岩，稳重求实；玩则有趣，持续试验。
            </span>
          </p>
        </div>

        <aside className="surface-panel p-5">
          <p className="text-sm font-medium text-muted">站点概览</p>
          <dl className="mt-5 grid grid-cols-[minmax(3.5rem,1fr)_minmax(3.5rem,1fr)_max-content] items-start gap-5 text-sm">
            <div>
              <dt className="text-muted">文章</dt>
              <dd className="mt-1 text-xl font-semibold leading-7 text-foreground">
                {posts.length}
              </dd>
            </div>
            <div>
              <dt className="text-muted">标签</dt>
              <dd className="mt-1 text-xl font-semibold leading-7 text-foreground">
                {tags.length}
              </dd>
            </div>
            <div>
              <dt className="text-muted">更新</dt>
              <dd className="mt-1 whitespace-nowrap text-base font-semibold leading-7 text-foreground">
                {latestPost ? formatDate(latestPost.date) : "待定"}
              </dd>
            </div>
          </dl>
          {latestPost && (
            <Link
              href={`/posts/${latestPost.slug}`}
              className="mt-5 block border-t border-border pt-4 text-sm leading-6 text-muted transition-colors hover:text-accent"
            >
              最新：<span className="font-medium text-foreground">{latestPost.title}</span>
            </Link>
          )}
        </aside>
      </section>

      {tags.length > 0 && (
        <section className="mb-14">
          <div className="section-rule mb-4">
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
        <div className="section-rule mb-6">
          <h2 className="text-lg font-semibold">最新文章</h2>
          <span className="text-sm text-muted">{posts.length} 篇</span>
        </div>
        {posts.length === 0 ? (
          <p className="surface-panel p-6 text-sm text-muted">
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

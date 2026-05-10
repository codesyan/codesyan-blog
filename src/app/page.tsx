import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

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

      <section>
        <div className="mb-6 flex items-end justify-between border-b border-border pb-3">
          <h2 className="text-lg font-semibold">文章列表</h2>
          <span className="text-sm text-muted">{posts.length} 篇</span>
        </div>
        {posts.length === 0 ? (
          <p className="rounded-lg border border-border bg-surface p-6 text-sm text-muted shadow-sm">
            还没有文章，第一篇在路上。
          </p>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-lg border border-border bg-surface p-5 shadow-sm transition-colors hover:border-accent"
              >
                <Link href={`/posts/${post.slug}`} className="group block">
                  <h3 className="text-xl font-semibold transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted line-clamp-2">
                    {post.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border bg-surface-muted px-2.5 py-1 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

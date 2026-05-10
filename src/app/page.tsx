import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <section className="mb-16">
        <h1 className="text-2xl font-semibold tracking-tight mb-4">山石玩AI</h1>
        <p className="text-muted leading-relaxed max-w-xl">
          一个关于 AI Coding 的个人博客。记录 AI 工具的使用心得、Prompt 工程技巧和开发感悟。
          <span className="block mt-1">山石合则为岩——稳重求实，玩则有趣。</span>
        </p>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-6">
          文章列表
        </h2>
        {posts.length === 0 ? (
          <p className="text-muted text-sm">还没有文章，第一篇在路上。</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link href={`/posts/${post.slug}`} className="group block">
                  <h3 className="text-lg font-semibold group-hover:text-muted transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted line-clamp-2">
                    {post.description}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    {post.tags.length > 0 && (
                      <div className="flex gap-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-border/50 px-2 py-0.5 text-xs"
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

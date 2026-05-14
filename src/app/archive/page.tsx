import Link from "next/link";
import type { Metadata } from "next";
import { formatDate } from "@/lib/format";
import { getArchiveGroups } from "@/lib/posts";

export const metadata: Metadata = {
  title: "归档",
  description: "按时间浏览山石玩AI的所有文章。",
  alternates: {
    canonical: "/archive",
  },
};

export default function ArchivePage() {
  const groups = getArchiveGroups();

  return (
    <div className="page-shell">
      <header className="mb-10 border-b border-border pb-8">
        <div className="page-kicker mb-4">Archive</div>
        <h1 className="text-3xl font-semibold text-foreground sm:text-5xl">
          归档
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          按发布时间回看所有文章。
        </p>
      </header>

      <div className="space-y-10">
        {groups.map((group) => (
          <section key={group.year}>
            <h2 className="mb-4 text-xl font-semibold">{group.year}</h2>
            <div className="surface-panel divide-y divide-border overflow-hidden">
              {group.posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="grid gap-2 p-4 transition-colors hover:bg-surface-muted sm:grid-cols-[9rem_1fr_auto] sm:items-center"
                >
                  <time className="text-sm text-muted" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                  <span className="font-medium text-foreground">{post.title}</span>
                  <span className="text-sm text-muted">约 {post.readingMinutes} 分钟</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

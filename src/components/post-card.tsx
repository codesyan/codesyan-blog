import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { TagPill } from "@/components/tag-pill";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-lg border border-border bg-surface p-5 shadow-sm transition-colors hover:border-accent">
      <Link href={`/posts/${post.slug}`} className="group block">
        <h3 className="text-xl font-semibold transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted line-clamp-2">
          {post.description}
        </p>
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>约 {post.readingMinutes} 分钟</span>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <TagPill key={tag} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { TagPill } from "@/components/tag-pill";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group grid gap-4 rounded-lg border border-border bg-surface/88 p-5 shadow-sm transition-colors hover:border-accent sm:grid-cols-[8rem_1fr]">
      <div className="text-xs text-muted">
        <time dateTime={post.date} className="block font-medium text-foreground">
          {formatDate(post.date)}
        </time>
        <span className="mt-1 block">约 {post.readingMinutes} 分钟</span>
      </div>
      <div>
        <Link href={`/posts/${post.slug}`} className="block">
          <h3 className="text-xl font-semibold leading-snug transition-colors group-hover:text-accent">
            {post.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted line-clamp-2">
            {post.description}
          </p>
        </Link>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <TagPill key={tag} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

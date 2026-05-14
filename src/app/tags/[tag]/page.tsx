import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/post-card";
import { getAllTags, getPostsByTag } from "@/lib/posts";

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getAllTags().map((tag) => ({
    tag: encodeURIComponent(tag.name),
  }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const tagName = decodeURIComponent(tag);

  return {
    title: `标签：${tagName}`,
    description: `浏览山石玩AI中关于「${tagName}」的文章。`,
    alternates: {
      canonical: `/tags/${encodeURIComponent(tagName)}`,
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const tagName = decodeURIComponent(tag);
  const posts = getPostsByTag(tagName);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="page-shell">
      <header className="mb-10 border-b border-border pb-8">
        <div className="page-kicker mb-4">Tag</div>
        <h1 className="text-3xl font-semibold text-foreground sm:text-5xl">
          {tagName}
        </h1>
        <p className="mt-4 text-base text-muted">{posts.length} 篇文章</p>
      </header>

      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug, getAllPosts } from "@/lib/posts";
import { Giscus } from "@/components/giscus";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <header className="mb-8">
        <Link
          href="/"
          className="text-sm text-muted hover:text-foreground transition-colors mb-4 inline-block"
        >
          ← 返回文章列表
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight mt-2">
          {post.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-muted">
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
      </header>

      <div className="prose prose-zinc dark:prose-invert">
        <MDXRemote source={post.content} />
      </div>

      {(prevPost || nextPost) && (
        <nav className="mt-16 grid grid-cols-2 gap-4 border-t border-border pt-8">
          {prevPost ? (
            <Link
              href={`/posts/${prevPost.slug}`}
              className="text-sm hover:text-muted transition-colors"
            >
              ← {prevPost.title}
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link
              href={`/posts/${nextPost.slug}`}
              className="text-sm text-right hover:text-muted transition-colors"
            >
              {nextPost.title} →
            </Link>
          ) : (
            <div />
          )}
        </nav>
      )}

      <Giscus />
    </article>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { getAllSlugs, getPostBySlug, getAllPosts } from "@/lib/posts";
import { Giscus } from "@/components/giscus";
import { mdxComponents } from "@/components/mdx-components";
import { TableOfContents } from "@/components/table-of-contents";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/format";
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
    alternates: {
      canonical: `/posts/${post.slug}`,
    },
    authors: [siteConfig.author],
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/posts/${post.slug}`,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: post.date,
      authors: [siteConfig.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
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
  const prevPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <article className="page-shell">
      <header className="mb-10 max-w-3xl border-b border-border pb-10">
        <Link
          href="/"
          className="mb-8 inline-flex items-center rounded-full border border-border bg-surface/82 px-3 py-1.5 text-sm text-muted shadow-sm transition-colors hover:border-accent hover:text-accent"
        >
          ← 返回文章列表
        </Link>
        <div className="page-kicker mb-5">Article</div>
        <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-5xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            {post.description}
          </p>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>约 {post.readingMinutes} 分钟</span>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-surface/82 px-2.5 py-1 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,44rem)_16rem] lg:items-start">
        <div>
          <div className="prose scroll-smooth">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    [
                      rehypePrettyCode,
                      {
                        theme: "github-dark",
                      },
                    ],
                  ],
                },
              }}
            />
          </div>

          {(prevPost || nextPost) && (
            <nav className="mt-16 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
              {prevPost ? (
                <Link
                  href={`/posts/${prevPost.slug}`}
                  className="rounded-lg border border-border bg-surface/88 p-4 text-sm shadow-sm transition-colors hover:border-accent hover:text-accent"
                >
                  <span className="mb-1 block text-xs text-muted">上一篇</span>
                  ← {prevPost.title}
                </Link>
              ) : (
                <div />
              )}
              {nextPost ? (
                <Link
                  href={`/posts/${nextPost.slug}`}
                  className="rounded-lg border border-border bg-surface/88 p-4 text-right text-sm shadow-sm transition-colors hover:border-accent hover:text-accent"
                >
                  <span className="mb-1 block text-xs text-muted">下一篇</span>
                  {nextPost.title} →
                </Link>
              ) : (
                <div />
              )}
            </nav>
          )}

          <Giscus />
        </div>

        <TableOfContents items={post.toc} />
      </div>
    </article>
  );
}

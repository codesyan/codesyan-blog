import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-1 flex-col justify-center px-5 py-24">
      <div className="rounded-lg border border-border bg-surface p-8 shadow-sm">
        <p className="text-sm font-medium text-accent">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          这页没有找到
        </h1>
        <p className="mt-5 max-w-xl text-base leading-8 text-muted">
          可能是文章地址写错了，或者这篇内容还在路上。可以回到首页继续浏览已有文章。
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-border bg-surface-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}

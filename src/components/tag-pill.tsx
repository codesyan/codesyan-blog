import Link from "next/link";

export function TagPill({ tag, count }: { tag: string; count?: number }) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}`}
      className="rounded-full border border-border bg-surface-muted px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {tag}
      {typeof count === "number" && <span className="ml-1 text-muted">({count})</span>}
    </Link>
  );
}

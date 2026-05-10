import type { TocItem } from "@/lib/posts";

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <aside className="mb-10 rounded-lg border border-border bg-surface p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-foreground">文章目录</h2>
      <nav className="mt-3">
        <ol className="space-y-2 text-sm text-muted">
          {items.map((item) => (
            <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
              <a
                href={`#${item.id}`}
                className="transition-colors hover:text-accent"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}

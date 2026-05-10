import Link from "next/link";
import { LogoMark } from "@/components/logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <Link
          href="/"
          className="flex items-center gap-3 text-base font-semibold text-foreground transition-colors hover:text-accent"
        >
          <LogoMark className="size-10 drop-shadow-sm" />
          <span>山石玩AI</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm text-muted">
          <Link
            href="/"
            className="rounded-full px-3 py-1.5 transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            文章
          </Link>
          <a
            href="https://github.com/codesyan"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-3 py-1.5 transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-8 text-sm text-muted">
        <span> 2026 CodesYan</span>
        <span>
          山石玩AI ·{" "}
          <a
            href="https://codesyan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            codesyan.com
          </a>
        </span>
      </div>
    </footer>
  );
}

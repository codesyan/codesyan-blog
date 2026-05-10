export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 CodesYan</span>
        <span>
          山石玩AI ·{" "}
          <a
            href="https://codesyan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            codesyan.com
          </a>
        </span>
      </div>
    </footer>
  );
}

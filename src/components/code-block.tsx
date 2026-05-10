"use client";

import type { ReactNode } from "react";
import { isValidElement, useState } from "react";

function getNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }

  return "";
}

export function CodeBlock({
  children,
  ...props
}: {
  children?: ReactNode;
  [key: string]: unknown;
}) {
  const [copied, setCopied] = useState(false);
  const code = getNodeText(children);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={copyCode}
        className="absolute right-3 top-3 rounded-md border border-white/10 bg-white/10 px-2 py-1 text-xs text-white/80 opacity-0 backdrop-blur transition-opacity hover:text-white group-hover:opacity-100"
      >
        {copied ? "已复制" : "复制"}
      </button>
      <pre {...props}>{children}</pre>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

export function Giscus() {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const container = ref.current;
    if (!container || container.childElementCount > 0) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "codesyan/codesyan-blog");
    script.setAttribute("data-repo-id", "R_kgDOSZgTUw");
    script.setAttribute("data-category-id", "DIC_kwDOSZgTU84C8uL8");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "zh-CN");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    script.onload = () => setStatus("ready");
    script.onerror = () => setStatus("error");

    container.appendChild(script);
  }, []);

  return (
    <section className="mt-16 border-t border-border pt-8">
      <h2 className="text-lg font-semibold">讨论</h2>
      <div className="mt-4 rounded-lg border border-border bg-surface p-4 shadow-sm">
        <div ref={ref} />
        {status !== "ready" && (
          <p className="text-sm text-muted">
            {status === "loading"
              ? "评论正在加载。"
              : "评论加载失败，可能是网络暂时无法连接到 Giscus。"}
          </p>
        )}
      </div>
    </section>
  );
}

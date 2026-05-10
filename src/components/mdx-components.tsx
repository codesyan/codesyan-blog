import type { ReactNode } from "react";
import { isValidElement } from "react";
import { CodeBlock } from "@/components/code-block";
import { slugifyHeading } from "@/lib/posts";

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

function Heading({
  level,
  children,
}: {
  level: 2 | 3;
  children: ReactNode;
}) {
  const id = slugifyHeading(getNodeText(children));
  const Component = level === 2 ? "h2" : "h3";

  return <Component id={id}>{children}</Component>;
}

export const mdxComponents = {
  h2: (props: { children: ReactNode }) => <Heading level={2} {...props} />,
  h3: (props: { children: ReactNode }) => <Heading level={3} {...props} />,
  pre: CodeBlock,
  Callout: ({
    title,
    children,
  }: {
    title?: string;
    children: ReactNode;
  }) => (
    <aside className="my-6 rounded-lg border border-border bg-surface-muted p-4">
      {title && <p className="mb-2 font-semibold text-foreground">{title}</p>}
      <div className="text-muted">{children}</div>
    </aside>
  ),
};

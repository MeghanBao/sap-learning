import { useMemo } from "react";
import { marked } from "marked";

// Renders a lesson's markdown body. Content is authored in-repo (trusted), so
// marked's HTML output is used directly; do not feed user input here.
export default function Markdown({ source }: { source: string }) {
  const html = useMemo(
    () => marked.parse(source, { async: false }) as string,
    [source],
  );
  return <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />;
}

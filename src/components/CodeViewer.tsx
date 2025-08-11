import { useMemo } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-markup";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

interface CodeViewerProps {
  content: string;
  filename?: string;
  language?: string;
}

const extensionToLanguage: Record<string, string> = {
  sql: "sql",
  py: "python",
  js: "javascript",
  jsx: "jsx",
  ts: "typescript",
  tsx: "tsx",
  css: "css",
  md: "markdown",
  html: "html",
};

function detectLanguage(filename?: string, language?: string): string {
  if (language && extensionToLanguage[language]) return extensionToLanguage[language];
  if (!filename) return "text";
  const ext = filename.split(".").pop()?.toLowerCase();
  return extensionToLanguage[ext ?? ""] || "text";
}

export function CodeViewer({ content, filename, language }: CodeViewerProps) {
  const lang = detectLanguage(filename, language);

  const highlightedCode = useMemo(() => {
    if (lang === "text" || !content.trim()) return content;
    try {
      return Prism.highlight(content, Prism.languages[lang], lang);
    } catch {
      return content;
    }
  }, [content, lang]);

  // Copy-to-clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="code-viewer-container h-full w-full overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-6 pt-4 pb-2">
        <span className="inline-block text-xs font-mono text-muted-foreground">
          {lang.toUpperCase()}
        </span>
        <button
          className="copy-btn px-2 py-1 text-xs rounded bg-card/30 hover:bg-card/50 border border-border text-muted-foreground transition"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          Copy
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <pre className={`language-${lang} line-numbers m-0 p-0 bg-transparent`}>
          <code
            className={`language-${lang} block p-6 text-sm leading-relaxed`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </div>
  );
}
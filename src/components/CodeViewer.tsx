import { useMemo } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-markdown';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

interface CodeViewerProps {
  content: string;
  language: string;
}

const languageMap: Record<string, string> = {
  sql: 'sql',
  python: 'python',
  markdown: 'markdown',
  md: 'markdown'
};

export function CodeViewer({ content, language }: CodeViewerProps) {
  const highlightedCode = useMemo(() => {
    const lang = languageMap[language] || 'text';
    if (lang === 'text' || !content.trim()) {
      return content;
    }
    
    try {
      return Prism.highlight(content, Prism.languages[lang], lang);
    } catch (error) {
      console.warn('Syntax highlighting failed:', error);
      return content;
    }
  }, [content, language]);

  const lang = languageMap[language] || 'text';

  return (
    <div className="code-viewer-container h-full overflow-hidden">
      <pre className={`language-${lang} line-numbers h-full overflow-auto m-0 p-0 bg-transparent`}>
        <code 
          className={`language-${lang} block p-4 text-sm leading-relaxed`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
}
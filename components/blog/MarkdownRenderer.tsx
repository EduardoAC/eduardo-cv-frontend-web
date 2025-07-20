'use client';

import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import Prism from 'prismjs';
// import 'prismjs/themes/prism.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  showTableOfContents?: boolean;
}

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

const createCustomRenderer = () => {
  const renderer = new marked.Renderer();

  renderer.code = ({ text, lang }) => {
    const validLanguage = lang && Prism.languages[lang] ? lang : 'text';
    const highlighted = Prism.highlight(text, Prism.languages[validLanguage] || Prism.languages.text, validLanguage);

    return `
      <div class="snap-code-block">
        <div class="snap-code-header">
          <span class="snap-code-lang">${validLanguage}</span>
          <button class="snap-code-copy" data-code="${encodeURIComponent(text)}">Copy</button>
        </div>
        <pre><code class="language-${validLanguage}">${highlighted}</code></pre>
      </div>
    `;
  };

  renderer.heading = ({ text, depth }) => {
    const slug = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `<h${depth} id="${slug}"><a href="#${slug}" class="snap-anchor-link">${text}</a></h${depth}>`;
  };

  renderer.image = ({ href, title, text }) => {
    return `<img src="${href}" alt="${text}" title="${title ?? ''}" loading="lazy" class="snap-blog-image" />`;
  };

  renderer.link = ({ href, title, text }) => {
    const isExternal = href.startsWith('http');
    const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${href}" title="${title ?? ''}"${target} class="snap-link">${text}</a>`;
  };

  renderer.blockquote = ({ text }) => {
    const lines = text.split('\n');
    const firstLine = lines[0];
    const restContent = lines.slice(1).join('\n');

    if (firstLine.includes('> **Note:**') || firstLine.includes('> **Warning:**') || firstLine.includes('> **Tip:**')) {
      const type = firstLine.includes('Note') ? 'note' : firstLine.includes('Warning') ? 'warning' : 'tip';
      const icon = type === 'note' ? '💡' : type === 'warning' ? '⚠️' : '💡';

      return `
        <div class="snap-callout snap-callout-${type}">
          <div class="snap-callout-header">
            <span class="snap-callout-icon">${icon}</span>
            <span class="snap-callout-title">${type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </div>
          <div class="snap-callout-content">${restContent}</div>
        </div>
      `;
    }

    return `<blockquote class="snap-blockquote">${text}</blockquote>`;
  };

  return renderer;
};

const copyToClipboard = (button: HTMLButtonElement, text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  });
};

const generateTableOfContents = (
  container: HTMLElement,
  setTOC: React.Dispatch<React.SetStateAction<TableOfContentsItem[]>>
) => {
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const tocItems: TableOfContentsItem[] = Array.from(headings).map((heading) => ({
    id: heading.id,
    text: heading.textContent || '',
    level: parseInt(heading.tagName.charAt(1)),
  }));
  setTOC(tocItems);
};

const handleGists = (container: HTMLElement) => {
  const placeholders = container.querySelectorAll('.snap-gist-placeholder');
  placeholders.forEach((placeholder) => {
    const gistId = placeholder.getAttribute('data-gist-id');
    if (gistId) {
      const gistContainer = document.createElement('div');
      gistContainer.className = 'snap-gist-container';
      const script = document.createElement('script');
      script.src = `https://gist.github.com/${gistId}.js`;
      gistContainer.appendChild(script);
      placeholder.replaceWith(gistContainer);
    }
  });
};

const attachCopyListeners = (container: HTMLElement) => {
  const buttons = container.querySelectorAll('.snap-code-copy');
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const codeText = decodeURIComponent(button.getAttribute('data-code') || '');
      copyToClipboard(button as HTMLButtonElement, codeText);
    });
  });
};

const attachAnchorListeners = (container: HTMLElement) => {
  const links = container.querySelectorAll('.snap-anchor-link');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.substring(1);
      if (targetId) {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
};

const renderMarkdownContent = async ({
  rawContent,
  contentRef,
  showTableOfContents,
  setTableOfContents,
}: {
  rawContent: string;
  contentRef: React.RefObject<HTMLDivElement>;
  showTableOfContents: boolean;
  setTableOfContents: React.Dispatch<React.SetStateAction<TableOfContentsItem[]>>;
}) => {
  marked.setOptions({
    renderer: createCustomRenderer(),
    breaks: true,
    gfm: true,
  });

  const processedContent = rawContent.replace(
    /```gist:([a-zA-Z0-9]+\/[a-zA-Z0-9]+)```/g,
    (_, gistId) => `<div class="snap-gist-placeholder" data-gist-id="${gistId}"></div>`
  );

  const htmlContent = await marked(processedContent);
  if (!contentRef.current) return;

  contentRef.current.innerHTML = htmlContent;

  if (showTableOfContents) generateTableOfContents(contentRef.current, setTableOfContents);
  handleGists(contentRef.current);
  attachCopyListeners(contentRef.current);
  attachAnchorListeners(contentRef.current);
};

const TableOfContents: React.FC<{ items: TableOfContentsItem[] }> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -35% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="snap-toc">
      <h4 className="snap-toc-title">Table of Contents</h4>
      <ul className="snap-toc-list">
        {items.map((item) => (
          <li
            key={item.id}
            className={`snap-toc-item snap-toc-level-${item.level} ${activeId === item.id ? 'snap-toc-active' : ''}`}
          >
            <a
              href={`#${item.id}`}
              className="snap-toc-link"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '', showTableOfContents = false }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);

  useEffect(() => {
    renderMarkdownContent({
      rawContent: content,
      contentRef,
      showTableOfContents,
      setTableOfContents,
    }).catch((err) => console.error('Error rendering markdown:', err));
  }, [content, showTableOfContents]);

  return (
    <div className={`snap-markdown ${className}`.trim()}>
      {showTableOfContents && tableOfContents.length > 0 && <TableOfContents items={tableOfContents} />}
      <div ref={contentRef} className="snap-markdown-content" />
    </div>
  );
};

export default MarkdownRenderer;

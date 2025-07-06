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

// Custom renderer for marked
const createCustomRenderer = () => {
  const renderer = new marked.Renderer();
  
  // Custom code block rendering
  renderer.code = ({ text, lang }) => {
    const validLanguage = lang && Prism.languages[lang] ? lang : 'text';
    const highlighted = Prism.highlight(text, Prism.languages[validLanguage] || Prism.languages.text, validLanguage);
    
    return `
      <div class=\"snap-code-block\">
        <div class=\"snap-code-header\">
          <span class=\"snap-code-lang\">${validLanguage}</span>
          <button class=\"snap-code-copy\" data-code="${encodeURIComponent(text)}">Copy</button>
        </div>
        <pre><code class=\"language-${validLanguage}\">${highlighted}</code></pre>
      </div>
    `;
  };

  // Custom heading rendering with anchor links
  renderer.heading = ({ text, depth }) => {
    const slug = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `<h${depth} id=\"${slug}\"><a href=\"#${slug}\" class=\"snap-anchor-link\">${text}</a></h${depth}>`;
  };

  // Custom image rendering with lazy loading
  renderer.image = ({ href, title, text }) => {
    return `<img src=\"${href}\" alt=\"${text}\" title=\"${title || ''}\" loading=\"lazy\" class=\"snap-blog-image\" />`;
  };

  // Custom link rendering
  renderer.link = ({ href, title, text }) => {
    const isExternal = href.startsWith('http');
    const target = isExternal ? ' target=\"_blank\" rel=\"noopener noreferrer\"' : '';
    return `<a href=\"${href}\" title=\"${title || ''}\"${target} class=\"snap-link\">${text}</a>`;
  };

  // Custom blockquote rendering for callouts
  renderer.blockquote = ({ text }) => {
    const lines = text.split('\n');
    const firstLine = lines[0];
    const restContent = lines.slice(1).join('\n');
    
    // Check if it's a callout
    if (firstLine.includes('> **Note:**') || firstLine.includes('> **Warning:**') || firstLine.includes('> **Tip:**')) {
      const type = firstLine.includes('Note') ? 'note' : firstLine.includes('Warning') ? 'warning' : 'tip';
      const icon = type === 'note' ? '💡' : type === 'warning' ? '⚠️' : '💡';
      
      return `
        <div class=\"snap-callout snap-callout-${type}\">
          <div class=\"snap-callout-header\">
            <span class=\"snap-callout-icon\">${icon}</span>
            <span class=\"snap-callout-title\">${type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </div>
          <div class=\"snap-callout-content\">${restContent}</div>
        </div>
      `;
    }
    
    return `<blockquote class=\"snap-blockquote\">${text}</blockquote>`;
  };

  return renderer;
};

// Copy to clipboard function
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

// Table of Contents component
const TableOfContents: React.FC<{ items: TableOfContentsItem[] }> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
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

// GitHub Gist component
const GitHubGist: React.FC<{ gistId: string }> = ({ gistId }) => {
  const gistRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (gistRef.current) {
      const script = document.createElement('script');
      script.src = `https://gist.github.com/${gistId}.js`;
      gistRef.current.appendChild(script);
    }
  }, [gistId]);

  return (
    <div className="snap-gist-container">
      <div ref={gistRef} className="snap-gist-embed" />
    </div>
  );
};

// MarkdownRenderer component
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ 
  content, 
  className = '',
  showTableOfContents = false 
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);

  useEffect(() => {
    if (contentRef.current) {
      // Configure marked options
      marked.setOptions({
        renderer: createCustomRenderer(),
        breaks: true,
        gfm: true,
      });

      // Process content for GitHub Gists
      const processedContent = content.replace(
        /```gist:([a-zA-Z0-9]+\/[a-zA-Z0-9]+)```/g,
        (match, gistId) => {
          return `<div class=\"snap-gist-placeholder\" data-gist-id=\"${gistId}\"></div>`;
        }
      );

      // Render markdown
      const renderMarkdown = async () => {
        try {
          const htmlContent = await marked(processedContent);
          if (contentRef.current) {
            contentRef.current.innerHTML = htmlContent;

            // Generate table of contents
            if (showTableOfContents) {
              const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
              const tocItems: TableOfContentsItem[] = Array.from(headings).map((heading) => ({
                id: heading.id,
                text: heading.textContent || '',
                level: parseInt(heading.tagName.charAt(1)),
              }));
              setTableOfContents(tocItems);
            }

            // Handle GitHub Gists
            const gistPlaceholders = contentRef.current.querySelectorAll('.snap-gist-placeholder');
            gistPlaceholders.forEach((placeholder) => {
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

            // Add copy functionality to code blocks
            const copyButtons = contentRef.current.querySelectorAll('.snap-code-copy');
            copyButtons.forEach((button) => {
              button.addEventListener('click', (e) => {
                e.preventDefault();
                const codeBlock = button.closest('.snap-code-block');
                const codeElement = codeBlock?.querySelector('code');
                if (codeElement) {
                  const codeText = decodeURIComponent(button.getAttribute('data-code') || '');
                  copyToClipboard(button as HTMLButtonElement, codeText || '');
                }
              });
            });

            // Add smooth scrolling for anchor links
            const anchorLinks = contentRef.current.querySelectorAll('.snap-anchor-link');
            anchorLinks.forEach((link) => {
              link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href')?.substring(1);
                if (targetId) {
                  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                }
              });
            });
          }
        } catch (error) {
          console.error('Error rendering markdown:', error);
        }
      };

      renderMarkdown();
    }
  }, [content, showTableOfContents]);

  return (
    <div className={`snap-markdown ${className}`.trim()}>
      {showTableOfContents && tableOfContents.length > 0 && (
        <TableOfContents items={tableOfContents} />
      )}
      <div ref={contentRef} className="snap-markdown-content" />
    </div>
  );
};

export default MarkdownRenderer; 
'use client';

import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
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
}

// Custom renderer for marked
const createCustomRenderer = () => {
  const renderer = new marked.Renderer();
  
  // Custom code block rendering
  renderer.code = ({ text, lang }) => {
    const validLanguage = lang && Prism.languages[lang] ? lang : 'text';
    const highlighted = Prism.highlight(text, Prism.languages[validLanguage] || Prism.languages.text, validLanguage);
    
    return `
      <div class="code-block">
        <div class="code-header">
          <span class="language-label">${validLanguage}</span>
          <button class="copy-button" onclick="copyToClipboard(this, \`${text.replace(/`/g, '\\`')}\`)">
            Copy
          </button>
        </div>
        <pre><code class="language-${validLanguage}">${highlighted}</code></pre>
      </div>
    `;
  };

  // Custom heading rendering with anchor links
  renderer.heading = ({ text, depth }) => {
    const slug = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `<h${depth} id="${slug}"><a href="#${slug}" class="anchor-link">${text}</a></h${depth}>`;
  };

  // Custom image rendering with lazy loading
  renderer.image = ({ href, title, text }) => {
    return `<img src="${href}" alt="${text}" title="${title || ''}" loading="lazy" class="blog-image" />`;
  };

  // Custom link rendering
  renderer.link = ({ href, title, text }) => {
    const isExternal = href.startsWith('http');
    const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${href}" title="${title || ''}"${target}>${text}</a>`;
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
    <div className="gist-container">
      <div ref={gistRef} className="gist-embed" />
    </div>
  );
};

// MarkdownRenderer component
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  const contentRef = useRef<HTMLDivElement>(null);

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
          return `<div class="gist-placeholder" data-gist-id="${gistId}"></div>`;
        }
      );

      // Render markdown
      const renderMarkdown = async () => {
        try {
          const htmlContent = await marked(processedContent);
          if (contentRef.current) {
            contentRef.current.innerHTML = htmlContent;

            // Handle GitHub Gists
            const gistPlaceholders = contentRef.current.querySelectorAll('.gist-placeholder');
            gistPlaceholders.forEach((placeholder) => {
              const gistId = placeholder.getAttribute('data-gist-id');
              if (gistId) {
                const gistContainer = document.createElement('div');
                gistContainer.className = 'gist-container';
                
                const script = document.createElement('script');
                script.src = `https://gist.github.com/${gistId}.js`;
                gistContainer.appendChild(script);
                
                placeholder.replaceWith(gistContainer);
              }
            });

            // Add copy functionality to code blocks
            const copyButtons = contentRef.current.querySelectorAll('.copy-button');
            copyButtons.forEach((button) => {
              button.addEventListener('click', (e) => {
                e.preventDefault();
                const codeBlock = button.closest('.code-block');
                const codeElement = codeBlock?.querySelector('code');
                if (codeElement) {
                  copyToClipboard(button as HTMLButtonElement, codeElement.textContent || '');
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
  }, [content]);

  return (
    <div 
      ref={contentRef} 
      className={`markdown-renderer ${className}`}
    />
  );
};

export default MarkdownRenderer; 
import type { TableOfContentsItem } from '@/lib/blog/markdown';
import BlogPostEnhancer from './BlogPostEnhancer';

interface MarkdownRendererProps {
  html: string;
  toc?: ReadonlyArray<TableOfContentsItem>;
  className?: string;
  showTableOfContents?: boolean;
  tocCollapsible?: boolean;
  introHtml?: string;
  introClassName?: string;
  rootId?: string;
}

const getSectionLabel = (count: number) => `${count} section${count === 1 ? '' : 's'}`;

export const TableOfContents = ({
  items,
  collapsible = false,
}: {
  items: ReadonlyArray<TableOfContentsItem>;
  collapsible?: boolean;
}) => {
  if (collapsible) {
    return (
      <details
        className="snap-toc snap-toc-collapsible"
        data-blog-toc
        data-blog-toc-collapsible
        aria-label="Table of contents"
      >
        <summary className="snap-toc-summary">
          <span className="snap-toc-summary-copy">
            <span className="snap-toc-title">On this page</span>
            <span className="snap-toc-summary-count">{getSectionLabel(items.length)}</span>
          </span>
          <span className="snap-toc-summary-icon" aria-hidden="true" />
        </summary>
        <div className="snap-toc-panel">
          <ul className="snap-toc-list text-align-left">
            {items.map((item) => (
              <li
                key={item.id}
                className={`snap-toc-item snap-toc-level-${item.level}`}
                data-heading-id={item.id}
              >
                <a href={`#${item.id}`} className="snap-toc-link">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </details>
    );
  }

  return (
    <nav className="snap-toc" data-blog-toc aria-label="Table of contents">
      <h4 className="snap-toc-title">On this page</h4>
      <ul className="snap-toc-list text-align-left">
        {items.map((item) => (
          <li
            key={item.id}
            className={`snap-toc-item snap-toc-level-${item.level}`}
            data-heading-id={item.id}
          >
            <a href={`#${item.id}`} className="snap-toc-link">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default function MarkdownRenderer({
  html,
  toc = [],
  className = '',
  showTableOfContents = false,
  tocCollapsible = false,
  introHtml,
  introClassName = '',
  rootId = 'blog-post-markdown',
}: Readonly<MarkdownRendererProps>) {
  return (
    <div id={rootId} className={`snap-markdown ${className}`.trim()}>
      {showTableOfContents && toc.length > 0 && <TableOfContents items={toc} collapsible={tocCollapsible} />}
      {introHtml && (
        <div
          className={`snap-markdown-content ${introClassName}`.trim()}
          dangerouslySetInnerHTML={{ __html: introHtml }}
        />
      )}
      <div className="snap-markdown-content" dangerouslySetInnerHTML={{ __html: html }} />
      <BlogPostEnhancer rootId={rootId} />
    </div>
  );
}

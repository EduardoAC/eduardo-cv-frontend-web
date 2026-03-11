import type { TableOfContentsItem } from '@/lib/blog/markdown';
import BlogPostEnhancer from './BlogPostEnhancer';

interface MarkdownRendererProps {
  html: string;
  toc?: ReadonlyArray<TableOfContentsItem>;
  className?: string;
  showTableOfContents?: boolean;
  rootId?: string;
}

const TableOfContents = ({ items }: { items: ReadonlyArray<TableOfContentsItem> }) => (
  <nav className="snap-toc" data-blog-toc>
    <h4 className="snap-toc-title">Table of Contents</h4>
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

export default function MarkdownRenderer({
  html,
  toc = [],
  className = '',
  showTableOfContents = false,
  rootId = 'blog-post-markdown',
}: Readonly<MarkdownRendererProps>) {
  return (
    <div id={rootId} className={`snap-markdown ${className}`.trim()}>
      {showTableOfContents && toc.length > 0 && <TableOfContents items={toc} />}
      <div className="snap-markdown-content" dangerouslySetInnerHTML={{ __html: html }} />
      <BlogPostEnhancer rootId={rootId} />
    </div>
  );
}

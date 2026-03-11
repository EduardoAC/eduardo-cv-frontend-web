import React from 'react';
import Link from 'next/link';

interface TagProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  ariaLabel?: string;
}

const Tag: React.FC<TagProps> = ({ children, className = '', href, ariaLabel }) => {
  const content = <span className={`snap-tag ${className}`.trim()}>{children}</span>;

  if (!href) {
    return content;
  }

  return (
    <Link className="snap-link" href={href} aria-label={ariaLabel}>
      {content}
    </Link>
  );
};

export default Tag; 

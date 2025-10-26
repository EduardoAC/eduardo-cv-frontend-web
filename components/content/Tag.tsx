import React from 'react';

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ children, className = '' }) => (
  <span className={`snap-tag ${className}`.trim()}>{children}</span>
);

export default Tag; 

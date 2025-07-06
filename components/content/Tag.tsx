import React from 'react';
import styles from './Card.module.scss';

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ children, className = '' }) => (
  <span className={`snap-tag ${className}`.trim()}>{children}</span>
);

export default Tag; 
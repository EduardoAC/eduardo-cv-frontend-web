import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <article className={`snap-card ${className}`.trim()}>{children}</article>
);

export default Card; 

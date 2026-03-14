import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => (
  <article className={`snap-card ${className}`.trim()} {...props}>
    {children}
  </article>
);

export default Card; 

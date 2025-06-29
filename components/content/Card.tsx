import React from 'react';
import styles from './Card.module.scss';

export interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'minimal';
  padding?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  onClick?: () => void;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'medium',
  className = '',
  children,
  as: Component = 'div',
  onClick,
  interactive = false,
  ...props
}) => {
  const cardClasses = [
    styles.card,
    styles[`card--${variant}`],
    styles[`padding--${padding}`],
    interactive && styles['card--interactive'],
    className
  ].filter(Boolean).join(' ');

  return (
    <Component 
      className={cardClasses} 
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card; 
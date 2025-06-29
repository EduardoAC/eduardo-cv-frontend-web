import React from 'react';
import styles from './Container.module.scss';

export interface ContainerProps {
  variant?: 'default' | 'narrow' | 'wide' | 'full' | 'fluid';
  padding?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export const Container: React.FC<ContainerProps> = ({
  variant = 'default',
  padding = 'medium',
  className = '',
  children,
  as: Component = 'div',
  ...props
}) => {
  const containerClasses = [
    styles.container,
    styles[`container--${variant}`],
    styles[`padding--${padding}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={containerClasses} {...props}>
      {children}
    </Component>
  );
};

export default Container; 
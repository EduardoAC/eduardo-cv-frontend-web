import React from 'react';
import styles from './Card.module.scss';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => (
  <div className={`snap-container ${className}`.trim()}>{children}</div>
);

export default Container; 
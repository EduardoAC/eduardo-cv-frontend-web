import React from 'react';
import styles from './MobileCarousel.module.scss';

interface CarouselItem {
  id: string;
  title: string;
  imgUrl: string;
  link: string;
}

interface MobileCarouselProps {
  items: CarouselItem[];
  renderItem: (item: CarouselItem) => React.ReactNode;
  className?: string;
}

export default function MobileCarousel({ items, renderItem, className }: MobileCarouselProps) {
  return (
    <div className={`${styles.mobileCarousel} ${className || ''}`}>
      <div className={styles.slides}>
        {items.map((item, index) => (
          <div key={item.id} id={`slide-${index + 1}`} className={styles.slide}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
} 
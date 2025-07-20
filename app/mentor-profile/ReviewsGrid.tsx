import React from 'react';
import styles from './ReviewsGrid.module.scss';

export interface Review {
  name: string;
  title: string;
  image: string;
  date: string;
  text: string;
  rating?: number;
  badges?: string[];
}

interface ReviewsGridProps {
  reviews: Review[];
}

export default function ReviewsGrid({ reviews }: ReviewsGridProps) {
  return (
    <div className={`snap-grid ${styles.grid}`}> 
      {reviews.map((review, idx) => (
        <div
          className={`snap-col snap-col-sm-6 snap-col-md-4 snap-col-lg-3 ${styles.card}`}
          key={idx}
        >
          <div className={styles.avatarRow}>
            <img src={review.image} alt={review.name} className={styles.avatar} />
            <div>
              <div className={styles.name}>{review.name}</div>
              <div className={styles.title}>{review.title}</div>
              <div className={styles.date}>{review.date}</div>
            </div>
          </div>
          <div className={styles.text}>{review.text}</div>
          {review.badges && review.badges.length > 0 && (
            <div className={styles.badges}>
              {review.badges.map((badge, i) => (
                <span className={styles.badge} key={i}>{badge}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 
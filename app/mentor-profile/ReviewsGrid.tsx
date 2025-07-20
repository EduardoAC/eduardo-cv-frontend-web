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
  initialCount?: number;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 2, marginTop: 4, marginBottom: 4 }}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={i < rating ? '#FFD700' : 'none'}
          stroke="#FFD700"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginRight: 2 }}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsGrid({ reviews, initialCount = 3 }: ReviewsGridProps) {
  const hasMore = reviews.length > initialCount;
  const toggleId = `toggle-reviews-${Math.random().toString(36).slice(2)}`;
  return (
    <div className={styles.reviewsGridWrapper}>
      <input type="checkbox" id={toggleId} className={styles.toggleCheckbox} />
      <div className={styles.gridWrapper}>
        <div className={`snap-grid ${styles.grid}`}> 
          {reviews.map((review, idx) => (
            <div
              className={
                idx < initialCount
                  ? `snap-col snap-col-sm-6 snap-col-md-4 snap-col-lg-3 ${styles.card}`
                  : `snap-col snap-col-sm-6 snap-col-md-4 snap-col-lg-3 ${styles.card} ${styles.hiddenReview}`
              }
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
              {typeof review.rating === 'number' && (
                <Stars rating={review.rating} />
              )}
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
      </div>
      {hasMore && (
        <label htmlFor={toggleId} className={styles.seeMoreBtn}>
          <span className={styles.showMoreText}>See more</span>
          <span className={styles.showLessText}>See less</span>
        </label>
      )}
    </div>
  );
} 
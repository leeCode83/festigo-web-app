'use client';

import { FaStar } from 'react-icons/fa';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import styles from '@/styles/components/events/ReviewSection.module.css';

interface Review {
  id: number;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewSectionProps {
  eventId: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onReviewSubmitted: () => void;
  eventStatus: 'upcoming' | 'past' | 'ongoing';
}

export default function ReviewSection({ eventId, reviews, averageRating, totalReviews, onReviewSubmitted, eventStatus }: ReviewSectionProps) {
  return (
    <section className={styles.reviewSection}>
      <div className={styles.reviewHeader}>
        <div className={styles.ratingOverview}>
          <h2 className={styles.sectionTitle}>Reviews</h2>
          <div className={styles.ratingStats}>
            <div className={styles.averageRating}>
              <span className={styles.ratingNumber}>{averageRating.toFixed(1)}</span>
              <div className={styles.ratingStars}>
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`${styles.star} ${
                      index < Math.floor(averageRating) ? styles.starFilled : ''
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className={styles.totalReviews}>{totalReviews} reviews</span>
          </div>
        </div>
      </div>

      <ReviewForm eventId={eventId} onReviewSubmitted={onReviewSubmitted} eventStatus={eventStatus} />

      <div className={styles.reviewList}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </section>
  );
}

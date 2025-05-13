'use client';

import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from '@/styles/components/events/ReviewForm.module.css';
import Cookies from 'js-cookie';

interface ReviewFormProps {
  eventId: string;
  onReviewSubmitted: () => void;
  eventStatus: 'upcoming' | 'past' | 'ongoing';
}

export default function ReviewForm({ eventId, onReviewSubmitted, eventStatus }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState<string | undefined>(Cookies.get('token'));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (rating === 0) {
      setError('Please give a rating');
      return;
    }
    if (!review.trim()) {
      setError('Please write a review');
      return;
    }

    if (!token) {
      setError('Please login to submit a review');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:3001/reviews/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rating: Number(rating),
          comment: review.trim()
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to submit review. Please try again.');
      }

      setRating(0);
      setReview('');
      onReviewSubmitted();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.reviewForm} onSubmit={handleSubmit}>
        <h3 className={styles.formTitle}>
          {eventStatus === 'upcoming' ? 'Pre-Event Review' : 'Write a Review'}
        </h3>
        
        <div className={styles.ratingContainer}>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={styles.starButton}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                disabled={isSubmitting}
              >
                <FaStar
                  className={`${styles.star} ${
                    (hoveredRating || rating) >= star ? styles.starActive : ''
                  }`}
                />
              </button>
            ))}
          </div>
          <span className={styles.ratingLabel}>
            {rating ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Select rating'}
          </span>
        </div>

        <textarea
          className={styles.reviewInput}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Share your experience..."
          rows={4}
          disabled={isSubmitting}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}
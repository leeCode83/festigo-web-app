'use client';

import { FaStar, FaUserCircle } from 'react-icons/fa';
import styles from '@/styles/components/events/ReviewCard.module.css';

interface ReviewCardProps {
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ReviewCard({ username, rating, comment, createdAt }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewHeader}>
        <div className={styles.userInfo}>
          <FaUserCircle className={styles.userIcon} />
          <div className={styles.userMeta}>
            <h4 className={styles.username}>{username}</h4>
            <time className={styles.reviewDate}>{formatDate(createdAt)}</time>
          </div>
        </div>
        <div className={styles.rating}>
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`${styles.star} ${index < rating ? styles.starFilled : ''}`}
            />
          ))}
        </div>
      </div>
      <p className={styles.comment}>{comment}</p>
    </div>
  );
}

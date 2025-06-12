import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import styles from '@/styles/components/profile/ProfileCard.module.css';

interface Review {
  comment: string;
  rating: number;
  createdAt: string;
  event: {
    id: number;
    title: string;
  };
}

export default function ProfileReviewCard({ review }: { review: Review }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.rating}>
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} color={i < review.rating ? '#ffc107' : '#e4e5e9'} />
          ))}
        </div>
        <span className={styles.date}>
          {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
        </span>
      </div>
      <p className={styles.comment}>{review.comment}</p>
      <div className={styles.cardFooter}>
        Ulasan untuk event:{' '}
        <Link href={`/events/${review.event.id}`} className={styles.eventLink}>
          {review.event.title}
        </Link>
      </div>
    </div>
  );
}
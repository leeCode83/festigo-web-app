'use client';

import { FaHeart, FaShare, FaStar, FaCalendar } from 'react-icons/fa';
import styles from '@/styles/components/events/PopularEventCard.module.css';
import { useRouter } from 'next/navigation';

interface PopularEventCardProps {
  id: number;
  image: string;
  title: string;
  date: string;
  like: number;
  averageRating: number;
}

export default function PopularEventCard({ id, image, title, date, like, averageRating }: PopularEventCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/events/${id}`);
  };

  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation(); // Prevent card click when clicking action buttons
    action();
  };

  return (
    <div className={styles.popularEventCard} onClick={handleCardClick}>
      <div className={styles.cardImageWrapper}>
        <img 
          src={image}
          alt={title}
          className={styles.cardImage}
        />
        <div className={styles.cardActions}>
          <button 
            className={styles.actionButton}
            onClick={(e) => handleActionClick(e, () => console.log('Like clicked'))}
          >
            <FaHeart />
          </button>
          <button 
            className={styles.actionButton}
            onClick={(e) => handleActionClick(e, () => console.log('Share clicked'))}
          >
            <FaShare />
          </button>
        </div>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <div className={styles.cardInfo}>
          <div className={styles.cardDate}>
            <FaCalendar /> {new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
          <div className={styles.cardStats}>
            <div className={styles.statItem}>
              <FaStar className={styles.statIcon} /> {averageRating.toFixed(1)}
            </div>
            <div className={styles.statItem}>
              <FaHeart className={styles.statIcon} /> {like}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

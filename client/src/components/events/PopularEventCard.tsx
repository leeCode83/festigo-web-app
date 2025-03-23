'use client';

import { FaHeart, FaShare, FaStar, FaCalendar } from 'react-icons/fa';
import styles from '@/styles/components/events/PopularEventCard.module.css';

interface PopularEventCardProps {
  id: number;
  image: string;
  title: string;
  date: string;
  like: number;
  averageRating: number;
}

export default function PopularEventCard({ id, image, title, date, like, averageRating }: PopularEventCardProps) {
  return (
    <div className={styles.popularEventCard}>
      <div className={styles.cardImageWrapper}>
        <img 
          src={image}
          alt={title}
          className={styles.cardImage}
        />
        <div className={styles.cardActions}>
          <button className={styles.actionButton}><FaHeart /></button>
          <button className={styles.actionButton}><FaShare /></button>
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <div className={styles.cardRating}>
            <FaStar /> {averageRating.toFixed(1)}
          </div>
        </div>
        <div className={styles.cardInfo}>
          <span><FaCalendar /> {new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          <span><FaHeart /> {like}</span>
        </div>
      </div>
    </div>
  );
}

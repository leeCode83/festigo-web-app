'use client';

import { FaCalendar } from 'react-icons/fa';
import styles from '@/styles/components/events/UpcomingEventCard.module.css';
import { useRouter } from 'next/navigation';

interface UpcomingEventCardProps {
  id: number;
  image: string;
  title: string;
  date: string;
  ticketUrl: string;
  like: number;
}

export default function UpcomingEventCard({ id, image, title, date, ticketUrl, like }: UpcomingEventCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/events/${id}`);
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking book button
    window.open(ticketUrl, '_blank');
  };

  return (
    <div className={styles.upcomingEventCard} onClick={handleCardClick}>
      <div className={styles.upcomingCardHeader}>
        <img 
          src={image}
          alt={title}
          className={styles.upcomingEventLogo}
        />
        <div className={styles.upcomingEventBadge}>
          {like > 0 ? `${like} Likes` : 'New'}
        </div>
      </div>
      <div className={styles.upcomingCardContent}>
        <h3 className={styles.upcomingCardTitle}>{title}</h3>
        <div className={styles.upcomingCardDetails}>
          <span><FaCalendar /> {new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
        <div className={styles.upcomingCardFooter}>
          <button 
            className={styles.upcomingCardButton} 
            onClick={handleBookClick}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

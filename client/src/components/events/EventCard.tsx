import { FC } from 'react';
import Image from 'next/image';
import { FaStar, FaHeart } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { format } from 'date-fns';
import styles from '@/styles/components/events/EventCard.module.css';

interface EventCardProps {
  id: string;
  image: string;
  title: string;
  date: string;
  location: string;
  averageRating: number;
  likes: number;
}

const EventCard: FC<EventCardProps> = ({
  id,
  image,
  title,
  date,
  location,
  averageRating,
  likes,
}) => {
  const formattedDate = format(new Date(date), 'MMM dd, yyyy');

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={title}
          width={400}
          height={250}
          className={styles.image}
        />
        <div className={styles.rating}>
          <FaStar className={styles.starIcon} />
          <span>{averageRating.toFixed(1)}</span>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.details}>
          <div className={styles.dateLocation}>
            <p className={styles.date}>{formattedDate}</p>
            <div className={styles.location}>
              <IoLocationSharp className={styles.locationIcon} />
              <span>{location}</span>
            </div>
          </div>
          <div className={styles.likes}>
            <FaHeart className={styles.heartIcon} />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

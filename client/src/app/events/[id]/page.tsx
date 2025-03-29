'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import { format } from 'date-fns';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTicketAlt } from 'react-icons/fa';
import Navbar from '@/components/layout/Navbar';
import ReviewSection from '@/components/events/ReviewSection';

interface Review {
  id: number;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  ticketUrl: string;
  price: string;
  organizer: string;
}

export default function EventDetail() {
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:3001/reviews/event/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const [eventResponse, reviewsResponse] = await Promise.all([
          fetch(`http://localhost:3001/events/event/${params.id}`),
          fetch(`http://localhost:3001/reviews/event/${params.id}`)
        ]);

        if (!eventResponse.ok || !reviewsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [eventData, reviewsData] = await Promise.all([
          eventResponse.json(),
          reviewsResponse.json()
        ]);

        setEvent(eventData);
        setReviews(reviewsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [params.id]);

  const calculateAverageRating = (reviews: Review[]) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className={styles.loadingContainer}>
          <div className={styles.loading}>Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div>
        <Navbar />
        <div className={styles.errorContainer}>
          <div className={styles.error}>{error || 'Event not found'}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        
        <div className={styles.heroSection}>
          <div className={styles.heroImage}>
            <Image
              src={event.image}
              alt={event.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className={styles.heroOverlay} />
          </div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{event.title}</h1>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.mainContent}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>About This Event</h2>
              <p className={styles.description}>{event.description}</p>
            </section>

            <ReviewSection
              eventId={params.id as string}
              reviews={reviews}
              averageRating={calculateAverageRating(reviews)}
              totalReviews={reviews.length}
              onReviewSubmitted={fetchReviews}
            />
          </div>

          <div className={styles.sidebar}>
            <div className={styles.eventInfo}>
              <div className={styles.infoItem}>
                <FaCalendarAlt className={styles.icon} />
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>Date</div>
                  <div className={styles.infoValue}>
                    {format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
                  </div>
                </div>
              </div>

              <div className={styles.infoItem}>
                <FaClock className={styles.icon} />
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>Time</div>
                  <div className={styles.infoValue}>{event.time}</div>
                </div>
              </div>

              <div className={styles.infoItem}>
                <FaMapMarkerAlt className={styles.icon} />
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>Location</div>
                  <div className={styles.infoValue}>{event.location}</div>
                </div>
              </div>

              <div className={styles.infoItem}>
                <FaTicketAlt className={styles.icon} />
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>Price</div>
                  <div className={styles.infoValue}>{event.price}</div>
                </div>
              </div>

              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bookButton}
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

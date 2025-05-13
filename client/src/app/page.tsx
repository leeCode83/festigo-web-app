'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaHeart, FaStar, FaChevronRight } from 'react-icons/fa';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/common/Hero';
import styles from './page.module.css';

interface PopularEvent {
  id: number;
  image: string;
  title: string;
  date: string;
  like: number;
  averageRating: number;
}

interface UpcomingEvent {
  id: number;
  image: string;
  title: string;
  date: string;
  location: string;
  ticketUrl: string;
  like: number;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [popularEvents, setPopularEvents] = useState<PopularEvent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const [popularResponse, upcomingResponse] = await Promise.all([
          fetch('http://localhost:3001/events/popular'),
          fetch('http://localhost:3001/events/upcoming')
        ]);

        if (!popularResponse.ok || !upcomingResponse.ok) {
          throw new Error('Failed to fetch events');
        }

        const [popularData, upcomingData] = await Promise.all([
          popularResponse.json(),
          upcomingResponse.json()
        ]);

        setPopularEvents(popularData);
        setUpcomingEvents(upcomingData);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const renderPopularEvents = () => (
    <section className={styles.popularSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Popular Right Now</h2>
        <Link href="/popular" className={styles.sectionLink}>
          View All <FaChevronRight />
        </Link>
      </div>

      <div className={styles.eventGrid}>
        {popularEvents.map((event) => (
          <article key={event.id} className={styles.popularEventCard}>
            <Link href={`/events/${event.id}`} className={styles.cardLink}>
              <div className={styles.cardImageWrapper}>
                <Image
                  src={event.image}
                  alt={event.title}
                  className={styles.cardImage}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={styles.cardActions}>
                  <button className={styles.actionButton} onClick={(e) => e.stopPropagation()}>
                    <FaHeart />
                  </button>
                </div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{event.title}</h3>
                  <div className={styles.cardRating}>
                    <FaStar />
                    <span>{event.averageRating.toFixed(1)}</span>
                  </div>
                </div>
                <div className={styles.cardInfo}>
                  <span>
                    <FaCalendarAlt />
                    {format(new Date(event.date), 'MMM d, yyyy')}
                  </span>
                  <span>
                    <FaHeart />
                    {event.like} likes
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );

  const renderUpcomingEvents = () => (
    <section className={styles.upcomingSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Upcoming Events</h2>
        <Link href="/calendar" className={styles.sectionLink}>
          View Calendar <FaChevronRight />
        </Link>
      </div>

      <div className={styles.eventGrid}>
        {upcomingEvents.map((event) => (
          <article key={event.id} className={styles.upcomingEventCard}>
            <Link href={`/events/${event.id}`} className={styles.cardLink}>
              <div className={styles.cardImageWrapper}>
                <Image
                  src={event.image}
                  alt={event.title}
                  className={styles.cardImage}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={styles.cardActions}>
                  <button className={styles.actionButton} onClick={(e) => e.stopPropagation()}>
                    <FaHeart />
                  </button>
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{event.title}</h3>
                <div className={styles.upcomingCardDetails}>
                  <span>
                    <FaCalendarAlt />
                    {format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
                  </span>
                  <span>
                    <FaClock />
                    {format(new Date(event.date), 'h:mm a')}
                  </span>
                  <span>
                    <FaMapMarkerAlt />
                    {event.location || 'Location TBA'}
                  </span>
                </div>
                <div className={styles.upcomingCardFooter}>
                  <span className={styles.cardInfo}>
                    <FaHeart /> {event.like} likes
                  </span>
                  <Link
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.upcomingCardButton}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Get Tickets
                  </Link>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );

  if (isLoading) {
    return (
      <main className={styles.main}>
        <Navbar />
        <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className={styles.loading}>Loading events...</div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Navbar />
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      {renderPopularEvents()}
      {renderUpcomingEvents()}
    </main>
  );
}

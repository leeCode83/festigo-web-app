'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/common/Hero';
import EventCard from '@/components/events/EventCard';
import styles from './page.module.css';

interface Event {
  id: string;
  image: string;
  title: string;
  date: string;
  location: string;
  likes: number;
  averageRating: number;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [popularEvents, setPopularEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
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

  const renderEventSection = (title: string, events: Event[], viewAllLink: string, viewAllText: string) => (
    <section className={styles.eventSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <Link href={viewAllLink} className={styles.sectionLink}>
          {viewAllText} <FaChevronRight />
        </Link>
      </div>

      <div className={styles.eventGrid}>
        {events.map((event) => (
          <Link key={event.id} href={`/events/${event.id}`} className={styles.cardLink}>
            <EventCard
              id={event.id}
              image={event.image}
              title={event.title}
              date={event.date}
              location={event.location}
              averageRating={event.averageRating}
              likes={event.likes}
            />
          </Link>
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
      {renderEventSection('Popular Right Now', popularEvents, '/popular', 'View All')}
      {renderEventSection('Upcoming Events', upcomingEvents, '/calendar', 'View Calendar')}
    </main>
  );
}
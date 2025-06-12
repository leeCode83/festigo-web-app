'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import Hero from '@/components/common/Hero';
import EventCard from '@/components/events/EventCard';
import styles from '@/app/page.module.css';

// Definisikan tipe data untuk event
interface Event {
  id: string;
  image: string;
  title: string;
  date: string;
  location: string;
  likes: number;
  averageRating: number;
}

interface HomePageClientProps {
  initialPopularEvents: Event[];
  initialUpcomingEvents: Event[];
}

export default function HomePageClient({ initialPopularEvents, initialUpcomingEvents }: HomePageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Saring event berdasarkan query pencarian (jika diperlukan di masa depan)
  // Untuk saat ini, kita tampilkan saja semua data awal
  const popularEvents = initialPopularEvents;
  const upcomingEvents = initialUpcomingEvents;

  return (
    <>
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <section className={styles.eventSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Popular Right Now</h2>
          <Link href="/popular" className={styles.sectionLink}>
            View All <FaChevronRight />
          </Link>
        </div>
        <div className={styles.eventGrid}>
          {popularEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`} className={styles.cardLink}>
              <EventCard {...event} />
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.eventSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Upcoming Events</h2>
          <Link href="/calendar" className={styles.sectionLink}>
            View Calendar <FaChevronRight />
          </Link>
        </div>
        <div className={styles.eventGrid}>
          {upcomingEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`} className={styles.cardLink}>
              <EventCard {...event} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
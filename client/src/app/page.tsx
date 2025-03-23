'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/common/Hero';
import EventsSection from '@/components/events/EventsSection';
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
      
      <EventsSection
        type="popular"
        title="Popular Right Now"
        linkText="View All"
        linkHref="/popular"
        events={popularEvents}
      />

      <EventsSection
        type="upcoming"
        title="Upcoming Events"
        linkText="View Calendar"
        linkHref="/calendar"
        events={upcomingEvents}
      />
    </main>
  );
}

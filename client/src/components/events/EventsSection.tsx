'use client';

import SectionHeader from '@/components/common/SectionHeader';
import PopularEventCard from './PopularEventCard';
import UpcomingEventCard from './UpcomingEventCard';
import styles from '@/styles/components/events/EventsSection.module.css';

interface Event {
  id: number;
  image: string;
  title: string;
  date: string;
}

interface PopularEvent extends Event {
  like: number;
  averageRating: number;
}

interface UpcomingEvent extends Event {
  ticketUrl: string;
  like: number;
}

interface EventsSectionProps {
  type: 'popular' | 'upcoming';
  title: string;
  linkText: string;
  linkHref: string;
  events: PopularEvent[] | UpcomingEvent[];
}

export default function EventsSection({ type, title, linkText, linkHref, events }: EventsSectionProps) {
  // Limit popular events to 8 cards
  const displayEvents = type === 'popular' ? events.slice(0, 8) : events;

  return (
    <section className={styles.eventsSection}>
      <SectionHeader title={title} linkText={linkText} linkHref={linkHref} />
      <div className={`${styles.eventGrid} ${type === 'popular' ? styles.popularGrid : styles.upcomingGrid}`}>
        {displayEvents.map((event) => (
          type === 'popular' ? (
            <PopularEventCard key={event.id} {...event as PopularEvent} />
          ) : (
            <UpcomingEventCard key={event.id} {...event as UpcomingEvent} />
          )
        ))}
      </div>
    </section>
  );
}

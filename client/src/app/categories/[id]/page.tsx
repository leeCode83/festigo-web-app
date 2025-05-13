'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaHeart, FaStar } from 'react-icons/fa';
import Navbar from '@/components/layout/Navbar';
import styles from './page.module.css';

interface CategoryEvent {
  id: number;
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  like: number;
  averageRating: number;
  ticketUrl: string;
}

const categories = {
  music: {
    title: 'Music Events',
    description: 'Discover amazing concerts and musical performances',
    longDescription: 'From classical concerts to modern festivals, our music events bring together talented artists and passionate audiences. Experience live performances, music festivals, and concerts that will leave you inspired.',
    features: ['Live Performances', 'Music Festivals', 'Concert Tours', 'Album Launch Events'],
    icon: '🎵',
    heroImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&auto=format&fit=crop&q=80'
  },
  culinary: {
    title: 'Culinary Events',
    description: 'Explore food festivals and culinary experiences',
    longDescription: 'Immerse yourself in the world of gastronomy with our curated culinary events. From food festivals to cooking workshops, discover new flavors and culinary traditions.',
    features: ['Food Festivals', 'Cooking Workshops', 'Wine Tasting', 'Chef Meet & Greet'],
    icon: '🍳',
    heroImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&auto=format&fit=crop&q=80'
  },
  'pop-culture': {
    title: 'Pop Culture Events',
    description: 'Join conventions, cosplay events, and more',
    longDescription: 'Celebrate your favorite fandoms at our pop culture events. Meet fellow enthusiasts, participate in cosplay competitions, and immerse yourself in the world of entertainment.',
    features: ['Comic Conventions', 'Cosplay Events', 'Fan Meetups', 'Gaming Tournaments'],
    icon: '🌟',
    heroImage: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=1600&auto=format&fit=crop&q=80'
  },
  art: {
    title: 'Art Events',
    description: 'Experience exhibitions, galleries, and art installations',
    longDescription: 'Explore the world of visual arts through our diverse art events. From contemporary exhibitions to traditional galleries, discover the beauty of artistic expression.',
    features: ['Art Exhibitions', 'Gallery Openings', 'Artist Talks', 'Workshop Sessions'],
    icon: '🎨',
    heroImage: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1600&auto=format&fit=crop&q=80'
  },
  sports: {
    title: 'Sports Events',
    description: 'Watch and participate in exciting sporting events',
    longDescription: 'Get your adrenaline pumping with our sports events. Whether you are a participant or spectator, experience the thrill of competition and athletic excellence.',
    features: ['Tournaments', 'Training Camps', 'Championship Games', 'Sports Workshops'],
    icon: '⚽',
    heroImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&auto=format&fit=crop&q=80'
  },
  education: {
    title: 'Educational Events',
    description: 'Attend workshops, seminars, and learning sessions',
    longDescription: 'Expand your knowledge and skills through our educational events. Join expert-led workshops, informative seminars, and interactive learning sessions.',
    features: ['Expert Workshops', 'Professional Seminars', 'Training Sessions', 'Career Development'],
    icon: '📚',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&auto=format&fit=crop&q=80'
  }
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.id as string;
  const [events, setEvents] = useState<CategoryEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3001/events/category/${category}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (category) {
      fetchEvents();
    }
  }, [category]);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.loading}>Loading events...</div>
        </div>
      </div>
    );
  }

  if (error || !categories[category as keyof typeof categories]) {
    return (
      <div>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.error}>
            {error || 'Category not found'}
          </div>
        </div>
      </div>
    );
  }

  const categoryInfo = categories[category as keyof typeof categories];

  return (
    <div>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.categoryHero}>
          <div className={styles.heroImage} style={{ backgroundImage: `url(${categoryInfo.heroImage})` }} />
          <div className={styles.heroContent}>
            <span className={styles.categoryIcon}>{categoryInfo.icon}</span>
            <h1 className={styles.categoryTitle}>{categoryInfo.title}</h1>
            <p className={styles.categoryDescription}>{categoryInfo.description}</p>
          </div>
        </div>

        <section className={styles.categoryInfo}>
          <div className={styles.infoContainer}>
            <div className={styles.aboutCategory}>
              <h2>About {categoryInfo.title}</h2>
              <p>{categoryInfo.longDescription}</p>
            </div>
            <div className={styles.categoryFeatures}>
              <h3>What to Expect</h3>
              <ul className={styles.featuresList}>
                {categoryInfo.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    <span className={styles.featureIcon}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.eventsSection}>
          <div className={styles.sectionHeader}>
            <h2>Upcoming {categoryInfo.title}</h2>
            <p>Discover and book your next amazing experience</p>
          </div>

          <div className={styles.eventGrid}>
          {events.map((event) => (
            <article key={event.id} className={styles.eventCard}>
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
                      <span>{event.averageRating ? event.averageRating.toFixed(1) : 'N/A'}</span>
                    </div>
                  </div>
                  <div className={styles.cardDetails}>
                    <span className={styles.cardDetail}>
                      <FaCalendarAlt />
                      {format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
                    </span>
                    <span className={styles.cardDetail}>
                      <FaClock />
                      {event.time ? format(new Date(`${event.date.split('T')[0]}T${event.time}`), 'h:mm a') : 'Time TBA'}
                    </span>
                    <span className={styles.cardDetail}>
                      <FaMapMarkerAlt />
                      {event.location}
                    </span>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardLikes}>
                      <FaHeart /> {event.like} likes
                    </span>
                    <Link
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.ticketButton}
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

          {events.length === 0 && !error && (
            <div className={styles.noEvents}>
              No events found for this category. Check back later!
          </div>
          )}
        </section>
      </main>
    </div>
  );
}
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';
import styles from './styles.module.css';
import cardStyles from './eventCard.module.css';
import Navbar from '@/components/layout/Navbar';

interface MusicEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  price: string;
  description: string;
  category: string;
}

export default function MusicEvents() {
  const musicEvents: MusicEvent[] = [
    {
      id: '1',
      title: 'Coldplay Music of The Spheres',
      date: '15 May 2025',
      location: 'Gelora Bung Karno Stadium, Jakarta',
      image: '/images/coldplay-concert.jpg',
      price: 'Rp 1.500.000',
      description: 'Experience the magic of Coldplay live in Jakarta with their spectacular Music of The Spheres World Tour.',
      category: 'Concert'
    },
    {
      id: '2',
      title: 'Java Jazz Festival 2025',
      date: '20 May 2025',
      location: 'JIExpo Kemayoran, Jakarta',
      image: '/images/java-jazz.jpg',
      price: 'Rp 850.000',
      description: 'The biggest jazz festival in Southeast Asia returns with world-class performers and unforgettable performances.',
      category: 'Festival'
    },
    {
      id: '3',
      title: 'Synchronize Fest 2025',
      date: '1 June 2025',
      location: 'Gambir Expo, Jakarta',
      image: '/images/synchronize.jpg',
      price: 'Rp 500.000',
      description: 'A multi-genre music festival celebrating the diversity of Indonesian music scene.',
      category: 'Festival'
    },
    {
      id: '4',
      title: 'Taylor Swift The Eras Tour',
      date: '10 June 2025',
      location: 'Gelora Bung Karno Stadium, Jakarta',
      image: '/images/taylor-swift.jpg',
      price: 'Rp 2.500.000',
      description: 'Join Taylor Swift on her record-breaking Eras Tour as she performs her greatest hits from all albums.',
      category: 'Concert'
    },
    {
      id: '5',
      title: 'We The Fest 2025',
      date: '15 July 2025',
      location: 'JIExpo Kemayoran, Jakarta',
      image: '/images/we-the-fest.jpg',
      price: 'Rp 750.000',
      description: 'The annual summer festival returns with an exciting lineup of local and international artists.',
      category: 'Festival'
    },
    {
      id: '6',
      title: 'NCT 127 Neo City Tour',
      date: '25 July 2025',
      location: 'Indonesia Convention Exhibition, BSD',
      image: '/images/nct-concert.jpg',
      price: 'Rp 1.800.000',
      description: 'Experience the electrifying performance of NCT 127 as they bring their Neo City Tour to Indonesia.',
      category: 'Concert'
    }
  ];

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.patternOverlay}></div>
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.titleContainer}>
              <div className={styles.titleRow}>
                <div className={styles.titleWrapper}>
                  <div className={`${styles.titleGlow} ${styles.titleGlowLeft}`}></div>
                  <h1 className={`${styles.title} ${styles.titleLeft}`}>
                    Konser
                  </h1>
                </div>
                <div className={styles.separator}>
                  <div className={`${styles.separatorLine} ${styles.separatorLineLeft}`}></div>
                  <span className={styles.separatorText}>&</span>
                  <div className={`${styles.separatorLine} ${styles.separatorLineRight}`}></div>
                </div>
                <div className={styles.titleWrapper}>
                  <div className={`${styles.titleGlow} ${styles.titleGlowRight}`}></div>
                  <h1 className={`${styles.title} ${styles.titleRight}`}>
                    Musik
                  </h1>
                </div>
              </div>
              
              <div className={styles.decorativeLine}>
                <div className={styles.decorativeLineInner}></div>
              </div>
              
              <p className={styles.description}>
                Temukan event musik terbaik dari berbagai genre. Dari konser megah hingga festival musik indie.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className={cardStyles.eventsSection}>
        <div className={cardStyles.sectionTitle}>
          <h2 className={cardStyles.sectionHeading}>
            Event Musik Mendatang
          </h2>
        </div>
        <div className={cardStyles.eventGrid}>
          {musicEvents.map((event) => (
            <div key={event.id} className={cardStyles.eventCard}>
              <div className={cardStyles.imageContainer}>
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className={cardStyles.eventImage}
                />
                <div className={cardStyles.imageOverlay}></div>
                <div className={cardStyles.categoryBadge}>
                  {event.category}
                </div>
              </div>
              <div className={cardStyles.contentContainer}>
                <h3 className={cardStyles.eventTitle}>{event.title}</h3>
                <p className={cardStyles.eventDescription}>{event.description}</p>
                <div className={cardStyles.eventDetails}>
                  <div className={cardStyles.detailRow}>
                    <FaCalendarAlt className={cardStyles.detailIcon} />
                    <span className={cardStyles.detailText}>{event.date}</span>
                  </div>
                  <div className={cardStyles.detailRow}>
                    <FaMapMarkerAlt className={cardStyles.detailIcon} />
                    <span className={cardStyles.detailText}>{event.location}</span>
                  </div>
                  <div className={cardStyles.detailRow}>
                    <FaTicketAlt className={cardStyles.detailIcon} />
                    <span className={`${cardStyles.detailText} ${cardStyles.priceText}`}>{event.price}</span>
                  </div>
                </div>
                <div className={cardStyles.footer}>
                  <Link 
                    href={`/events/${event.id}`}
                    className={cardStyles.actionButton}
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

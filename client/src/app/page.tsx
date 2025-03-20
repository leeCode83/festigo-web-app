'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { FaCalendar, FaMapMarkerAlt, FaSearch, FaArrowRight, FaTicketAlt, FaHeart, FaShare, FaStar } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const popularEvents = [
    { 
      id: 1, 
      name: 'Comifuro', 
      image: '/images/comifuro.jpg',
      date: '24 May 2025',
      price: 'Rp 150.000',
      rating: 4.8,
      category: 'Convention'
    },
    { 
      id: 2, 
      name: 'Ryoji Ikeda', 
      image: '/images/ryoji.jpg',
      date: '15 June 2025',
      price: 'Rp 300.000',
      rating: 4.9,
      category: 'Art Exhibition'
    },
    { 
      id: 3, 
      name: 'Formula e', 
      image: '/images/formula.jpg',
      date: '3 June 2025',
      price: 'Rp 750.000',
      rating: 4.7,
      category: 'Sports'
    },
    { 
      id: 4, 
      name: 'DAYS', 
      image: '/images/days.jpg',
      date: '10 July 2025',
      price: 'Rp 200.000',
      rating: 4.6,
      category: 'Music'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      name: 'Yoasobi',
      date: '26-27 Feb 2025',
      location: 'Istora Senayan, Jakarta',
      logo: '/images/yoasobi.png',
      category: 'Music',
      ticketStatus: 'Selling Fast',
      price: 'Rp 800.000'
    },
    {
      id: 2, 
      name: 'Jakarta E-Prix',
      date: '3 - 4 Juni 2025',
      location: 'AGH Jakarta International E-Prix Circuit',
      logo: '/images/formula-e.png',
      category: 'Sports',
      ticketStatus: 'Early Bird',
      price: 'Rp 750.000'
    },
    {
      id: 3,
      name: 'Java Jazz',
      date: '30 May - 1 June 2025',
      location: 'JIEXPO Kemayoran',
      logo: '/images/java-jazz.png',
      category: 'Music',
      ticketStatus: 'Limited',
      price: 'Rp 1.200.000'
    },
    {
      id: 4,
      name: 'Comic Frontier',
      date: '24 - 25 May 2025',
      location: 'ICE BSD',
      logo: '/images/comifuro.png',
      category: 'Convention',
      ticketStatus: 'Available',
      price: 'Rp 150.000'
    }
  ];

  const categories = [
    {
      title: 'Konser & Musik',
      icon: '🎵',
      href: '/categories/music'
    },
    {
      title: 'Pensi & Acara Kampus',
      icon: '🎓',
      href: '/categories/campus'
    },
    {
      title: 'Festival & Expo',
      icon: '🎪',
      href: '/categories/festival'
    },
    {
      title: 'Pop Culture',
      icon: '🌟',
      href: '/categories/popculture'
    },
    {
      title: 'Pertunjukan Seni',
      icon: '🎭',
      href: '/categories/arts'
    },
    {
      title: 'Sport & Esports',
      icon: '🎮',
      href: '/categories/sports'
    }
  ];

  return (
    <main className={styles.main}>
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
        <Link href="/" className={styles.headerTitle}>
          <span className={styles.logo}>FestiGo</span>
        </Link>
        <nav className={styles.headerNav}>
          <Link href="/discover" className={styles.navLink}>Discover</Link>
          <div 
            className={styles.categoryDropdown}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className={styles.navLink}>Categories</button>
            {isDropdownOpen && (
              <div className={styles.dropdownContent}>
                <Link href="/categories/music" className={styles.dropdownItem}>
                  🎵 Konser & Musik
                </Link>
                <Link href="/categories/campus" className={styles.dropdownItem}>
                  🎓 Pensi & Acara Kampus
                </Link>
                <Link href="/categories/festival" className={styles.dropdownItem}>
                  🎪 Festival & Expo
                </Link>
                <Link href="/categories/popculture" className={styles.dropdownItem}>
                  🌟 Pop Culture
                </Link>
                <Link href="/categories/arts" className={styles.dropdownItem}>
                  🎭 Pertunjukan Seni
                </Link>
                <Link href="/categories/sports" className={styles.dropdownItem}>
                  🎮 Sport & Esports
                </Link>
              </div>
            )}
          </div>
          <Link href="/calendar" className={styles.navLink}>Calendar</Link>
        </nav>
        <div className={styles.headerButtons}>
          <Link href="/signup" className={styles.button}>Join Now</Link>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Discover Your Next <span className={styles.highlight}>Adventure</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Find and book tickets for the best events happening in your city
          </p>
          <div className={styles.searchContainer}>
            <div className={styles.searchIconWrapper}>
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search events, artists, or venues..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className={styles.searchButton}>
              Search
            </button>
          </div>
        </div>
        <div className={styles.heroBackground} />
      </section>

      <section className={styles.popularSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Popular Right Now</h2>
          <Link href="/popular" className={styles.sectionLink}>
            View All <FaArrowRight />
          </Link>
        </div>
        <div className={styles.eventGrid}>
          {popularEvents.map((event) => (
            <div key={event.id} className={styles.popularEventCard}>
              <div className={styles.cardImageWrapper}>
                <img 
                  src={event.image}
                  alt={event.name}
                  className={styles.cardImage}
                />
                <div className={styles.cardCategory}>{event.category}</div>
                <div className={styles.cardActions}>
                  <button className={styles.actionButton}><FaHeart /></button>
                  <button className={styles.actionButton}><FaShare /></button>
                </div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{event.name}</h3>
                  <div className={styles.cardRating}>
                    <FaStar /> {event.rating}
                  </div>
                </div>
                <div className={styles.cardInfo}>
                  <span><FaCalendar /> {event.date}</span>
                  <span><FaTicketAlt /> {event.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.upcomingSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Upcoming Events</h2>
          <Link href="/calendar" className={styles.sectionLink}>
            View Calendar <FaArrowRight />
          </Link>
        </div>
        <div className={styles.eventGrid}>
          {upcomingEvents.map((event) => (
            <div key={event.id} className={styles.upcomingEventCard}>
              <div className={styles.upcomingCardHeader}>
                <img 
                  src={event.logo}
                  alt={event.name}
                  className={styles.upcomingEventLogo}
                />
                <div className={styles.upcomingEventBadge}>
                  {event.ticketStatus}
                </div>
              </div>
              <div className={styles.upcomingCardContent}>
                <div className={styles.upcomingCardCategory}>
                  {event.category}
                </div>
                <h3 className={styles.upcomingCardTitle}>{event.name}</h3>
                <div className={styles.upcomingCardDetails}>
                  <span><FaCalendar /> {event.date}</span>
                  <span><FaMapMarkerAlt /> {event.location}</span>
                </div>
                <div className={styles.upcomingCardFooter}>
                  <span className={styles.upcomingCardPrice}>{event.price}</span>
                  <button className={styles.upcomingCardButton}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

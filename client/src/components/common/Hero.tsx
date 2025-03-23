'use client';

import { FaSearch } from 'react-icons/fa';
import styles from '@/styles/components/common/Hero.module.css';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Hero({ searchQuery, onSearchChange }: HeroProps) {
  return (
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
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button className={styles.searchButton}>
            Search
          </button>
        </div>
      </div>
      <div className={styles.heroBackground} />
    </section>
  );
}

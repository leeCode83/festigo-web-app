'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import styles from '@/styles/components/layout/Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
              {categories.map((category) => (
                <Link 
                  key={category.href} 
                  href={category.href} 
                  className={styles.dropdownItem}
                >
                  {category.icon} {category.title}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link href="/calendar" className={styles.navLink}>Calendar</Link>
      </nav>
      <div className={styles.headerButtons}>
        <Link href="/signup" className={styles.button}>Join Now</Link>
      </div>
    </header>
  );
}

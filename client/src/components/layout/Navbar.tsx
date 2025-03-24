'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/styles/components/layout/Navbar.module.css';
import Cookies from 'js-cookie';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState<string | undefined>();

  useEffect(() => {
    // Check for username in cookies
    const storedUsername = Cookies.get('username');
    setUsername(storedUsername);

    // Add scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
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
        {username ? (
          <Link href="/profile" className={styles.button}>
            {username}
          </Link>
        ) : (
          <Link href="/signup" className={styles.button}>
            Join Now
          </Link>
        )}
      </div>
    </header>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/styles/components/layout/Navbar.module.css';
import Cookies from 'js-cookie';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState<string | undefined>();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    setUsername(undefined);
    setShowLogoutPopup(false);
    window.location.href = '/'; // Redirect to home page
  };

  const isTokenExpired = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true; // If we can't decode the token, consider it expired
    }
  };

  // Function to check and clear tokens
  const checkAndClearTokens = () => {
    const currentToken = Cookies.get('token');
    const storedUsername = Cookies.get('username');

    // Clear tokens if they're missing or token is expired
    if (!currentToken || !storedUsername || isTokenExpired(currentToken)) {
      Cookies.remove('token');
      Cookies.remove('username');
      setUsername(undefined);
      return;
    }

    setUsername(storedUsername);
  };

  useEffect(() => {
    checkAndClearTokens();

    // Check token expiration every minute
    const tokenCheckInterval = setInterval(checkAndClearTokens, 60000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(tokenCheckInterval);
    };
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
          <div className={styles.userMenu}>
            <button 
              onClick={() => setShowLogoutPopup(!showLogoutPopup)} 
              className={styles.userButton}
            >
              {username}
            </button>
            {showLogoutPopup && (
              <div className={styles.logoutPopup}>
                <p>Apakah Anda ingin keluar?</p>
                <div className={styles.logoutButtons}>
                  <button 
                    onClick={handleLogout}
                    className={`${styles.logoutButton} ${styles.confirmButton}`}
                  >
                    Ya, Keluar
                  </button>
                  <button 
                    onClick={() => setShowLogoutPopup(false)}
                    className={`${styles.logoutButton} ${styles.cancelButton}`}
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link href="/signup" className={styles.button}>
            Join Now
          </Link>
        )}
      </div>
    </header>
  );
}

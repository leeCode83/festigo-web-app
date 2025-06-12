'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/styles/components/layout/Navbar.module.css';
import Cookies from 'js-cookie';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  
  // MODIFIKASI: State untuk menu pengguna
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const [username, setUsername] = useState<string | undefined>();

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    setUsername(undefined);
    setIsUserMenuOpen(false);
    window.location.href = '/'; 
  };

  useEffect(() => {
    const storedUsername = Cookies.get('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const categories = [
    { title: 'Music Events', href: '/categories/music' },
    { title: 'Culinary Events', href: '/categories/culinary' },
    { title: 'Pop Culture', href: '/categories/pop-culture' },
    { title: 'Art Events', href: '/categories/art' },
    { title: 'Sports Events', href: '/categories/sports' },
    { title: 'Educational Events', href: '/categories/education' }
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <Link href="/" className={styles.headerTitle}>
        <span className={styles.logo}>FestiGo</span>
      </Link>
      <nav className={styles.headerNav}>
        <Link href="/discover" className={styles.navLink}>Discover</Link>
        <Link href="/" className={styles.navLink}>Home</Link>
        <div 
          className={styles.categoryDropdown}
          onMouseEnter={() => setIsCategoryDropdownOpen(true)}
          onMouseLeave={() => setIsCategoryDropdownOpen(false)}
        >
          <button className={styles.navLink}>Categories</button>
          {isCategoryDropdownOpen && (
            <div className={styles.dropdownContent}>
              {categories.map((category) => (
                <Link key={category.href} href={category.href} className={styles.dropdownItem}>
                  {category.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
      <div className={styles.headerButtons}>
        {username ? (
          <div className={styles.userMenu}>
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} 
              className={styles.userButton}
            >
              {username}
            </button>
            {isUserMenuOpen && (
              // --- MODIFIKASI: Dropdown Menu Baru ---
              <div className={styles.userMenuDropdown}>
                <Link href="/profile" className={styles.dropdownLink} onClick={() => setIsUserMenuOpen(false)}>
                  <FaUser />
                  <span>Profil Saya</span>
                </Link>
                <button onClick={handleLogout} className={`${styles.dropdownLink} ${styles.logoutButton}`}>
                  <FaSignOutAlt />
                  <span>Keluar</span>
                </button>
              </div>
              // --- AKHIR MODIFIKASI ---
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
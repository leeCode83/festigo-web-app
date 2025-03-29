'use client';

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';
import styles from '@/styles/components/layout/Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>FestiGo</h3>
          <p className={styles.footerDescription}>
            Discover and book the best events in your area. From music festivals to workshops,
            find your next unforgettable experience with FestiGo.
          </p>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.footerSubtitle}>Quick Links</h4>
          <ul className={styles.footerLinks}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.footerSubtitle}>Categories</h4>
          <ul className={styles.footerLinks}>
            <li><Link href="/events?category=music">Music</Link></li>
            <li><Link href="/events?category=art">Art & Culture</Link></li>
            <li><Link href="/events?category=food">Food & Drink</Link></li>
            <li><Link href="/events?category=workshop">Workshops</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.footerSubtitle}>Contact Us</h4>
          <ul className={styles.contactInfo}>
            <li>Email: info@festigo.com</li>
            <li>Phone: +62 123 456 789</li>
            <li>Address: Jakarta, Indonesia</li>
          </ul>
          <div className={styles.socialLinks}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.copyright}>
          © {currentYear} FestiGo. All rights reserved.
        </div>
        <div className={styles.madeWith}>
          Made with <FaHeart className={styles.heartIcon} /> in Indonesia
        </div>
      </div>
    </footer>
  );
}

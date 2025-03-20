'use client';

import styles from '../../styles/login.module.css';
import { FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          FestiGo
        </Link>
        <div className={styles.navButtons}>
          <Link href="/signup" className={styles.joinButton}>
            Join
          </Link>
        </div>
      </nav>

      <div className={styles.content}>
        <div className={styles.imageSection}>
          <Image
            src="/images/starry-night.jpg"
            alt="Art Exhibition"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <div className={styles.loginSection}>
          <div className={styles.loginContainer}>
            <h1 className={styles.title}>Welcome Back</h1>
            <p className={styles.subtitle}>Sign in to continue your journey</p>

            <div className={styles.loginOptions}>
              <button className={`${styles.loginButton} ${styles.emailButton}`}>
                <FaEnvelope />
                Continue with Email
              </button>

              <button className={`${styles.loginButton} ${styles.googleButton}`}>
                <Image
                  src="/images/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                Continue with Google
              </button>

              <button className={`${styles.loginButton} ${styles.facebookButton}`}>
                <Image
                  src="/images/facebook.svg"
                  alt="Facebook"
                  width={20}
                  height={20}
                />
                Facebook
              </button>

              <div className={styles.divider}>
                <span>OR</span>
              </div>

              <div className={styles.signupPrompt}>
                Don&apos;t have an account?{' '}
                <Link href="/signup" className={styles.signupLink}>
                  Sign up
                </Link>
              </div>

              <p className={styles.terms}>
                By joining, you agree to the{' '}
                <Link href="/terms" className={styles.termsLink}>
                  NGENG NGENG Terms of Service
                </Link>{' '}
                and to occasionally receive emails from us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

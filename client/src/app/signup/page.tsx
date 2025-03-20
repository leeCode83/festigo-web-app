'use client';

import styles from '../../styles/signup.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Signup() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          FestiGo
        </Link>
        <div className={styles.navButtons}>
          <Link href="/login" className={styles.joinButton}>
            Sign In
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

        <div className={styles.signupSection}>
          <div className={styles.signupContainer}>
            <h1 className={styles.title}>Create Account</h1>
            <p className={styles.subtitle}>Join the community and discover amazing events</p>

            <div className={styles.signupOptions}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Username"
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Password"
                  className={styles.input}
                />
              </div>

              <button type="submit" className={`${styles.signupButton} ${styles.submitButton}`}>
                Sign up
              </button>

              <div className={styles.divider}>
                <span>OR</span>
              </div>

              <button className={`${styles.signupButton} ${styles.googleButton}`}>
                <Image
                  src="/images/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                Continue with Google
              </button>

              <button className={`${styles.signupButton} ${styles.facebookButton}`}>
                <Image
                  src="/images/facebook.svg"
                  alt="Facebook"
                  width={20}
                  height={20}
                />
                Facebook
              </button>

              <div className={styles.loginPrompt}>
                Already have an account?{' '}
                <Link href="/login" className={styles.loginLink}>
                  Sign in
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

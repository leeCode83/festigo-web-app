'use client';

import styles from '../../styles/signup.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store the JWT token and username in cookies
      Cookies.set('token', data.token, { expires: 1 }); // Token expires in 1 day
      Cookies.set('username', data.username, { expires: 1 }); // Store username with same expiration
      router.push('/'); // Redirect to home page
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          FestiGo
        </Link>
        <div className={styles.navButtons}>
          <Link href="/signup" className={styles.joinButton}>
            Sign Up
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
            <h1 className={styles.title}>Welcome Back</h1>
            <p className={styles.subtitle}>Sign in to continue</p>

            {error && <div className={styles.error}>{error}</div>}

            <form onSubmit={handleSubmit} className={styles.signupOptions}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                  className={styles.input}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className={styles.input}
                />
              </div>
              
              <button 
                type="submit" 
                className={`${styles.signupButton} ${styles.submitButton}`}
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <div className={styles.loginPrompt}>
                Don't have an account?{' '}
                <Link href="/signup" className={styles.loginLink}>
                  Sign up
                </Link>
              </div>

              <p className={styles.terms}>
                By signing in, you agree to our{' '}
                <Link href="/terms" className={styles.termsLink}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className={styles.termsLink}>
                  Privacy Policy
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

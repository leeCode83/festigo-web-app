'use client';

import styles from '@/styles/auth.module.css'; // MODIFIKASI: Menggunakan CSS module baru
import Image from 'next/image';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { FaEnvelope, FaLock } from 'react-icons/fa';

/**
 * Komponen Halaman Login.
 * Memungkinkan pengguna yang sudah ada untuk masuk ke akun mereka.
 */
export default function Login() {
  const router = useRouter();
  
  // State untuk menyimpan data form login
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Menangani perubahan pada setiap input form.
   * @param e - Event dari input element.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Menangani proses submit form login.
   * @param e - Event dari form submission.
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Menggunakan environment variable untuk URL API
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login gagal. Periksa kembali email dan password Anda.');
      }

      // Menyimpan token dan username di cookies
      Cookies.set('token', data.token, { expires: 1 });
      Cookies.set('username', data.username, { expires: 1 });
      
      // Arahkan ke halaman utama setelah login berhasil
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Kolom Kiri: Gambar Ilustrasi */}
      <div className={styles.artSection}>
        <Image
          src="/images/starry-night.jpg"
          alt="Art Exhibition"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className={styles.artOverlay}>
          <h2>Temukan Event Terbaikmu.</h2>
          <p>Bergabunglah dengan ribuan pencari event lainnya.</p>
        </div>
      </div>

      {/* Kolom Kanan: Form Login */}
      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <Link href="/" className={styles.logo}>FestiGo</Link>
          <h1 className={styles.title}>Selamat Datang Kembali!</h1>
          <p className={styles.subtitle}>Masuk untuk melanjutkan petualanganmu.</p>

          {error && <div className={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <FaEnvelope className={styles.inputIcon} />
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
              <FaLock className={styles.inputIcon} />
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
            
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
          
          <div className={styles.separator}>atau</div>

          <p className={styles.redirectPrompt}>
            Belum punya akun?{' '}
            <Link href="/signup" className={styles.redirectLink}>
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
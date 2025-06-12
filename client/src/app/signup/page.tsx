'use client';

import styles from '@/styles/auth.module.css'; // MODIFIKASI: Menggunakan CSS module baru
import Image from 'next/image';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { FaEnvelope, FaUser, FaLock } from 'react-icons/fa';

/**
 * Komponen Halaman Registrasi (Signup).
 * Memungkinkan pengguna baru untuk membuat akun.
 * Menggunakan state untuk mengelola input form, loading, dan error.
 */
export default function Signup() {
  const router = useRouter();
  
  // State untuk menyimpan data dari form input
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });
  
  // State untuk menampilkan pesan error dan status loading
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Menangani perubahan pada setiap input form dan memperbarui state.
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
   * Menangani proses submit form.
   * Mengirim data registrasi ke API backend.
   * @param e - Event dari form submission.
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Mengambil URL API dari environment variable
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        // Menampilkan pesan error dari API jika registrasi gagal
        throw new Error(data.message || 'Registrasi gagal. Silakan coba lagi.');
      }

      // Menyimpan token dan username di cookies setelah berhasil
      Cookies.set('token', data.token, { expires: 1 }); // Token berlaku 1 hari
      Cookies.set('username', data.username, { expires: 1 });
      
      // Mengarahkan pengguna ke halaman utama
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui.');
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

      {/* Kolom Kanan: Form Registrasi */}
      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <Link href="/" className={styles.logo}>FestiGo</Link>
          <h1 className={styles.title}>Buat Akun Baru</h1>
          <p className={styles.subtitle}>Selamat datang! Silakan isi data di bawah ini.</p>

          {error && <div className={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <FaUser className={styles.inputIcon} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Username"
                className={styles.input}
              />
            </div>

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
              {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
            </button>
          </form>

          <div className={styles.separator}>atau</div>

          <p className={styles.redirectPrompt}>
            Sudah punya akun?{' '}
            <Link href="/login" className={styles.redirectLink}>
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
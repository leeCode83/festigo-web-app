'use client';

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import styles from './page.module.css'; // Akan kita buat setelah ini
import Cookies from 'js-cookie';

interface GalleryItem {
  id: number;
  imageUrl: string;
  caption?: string;
  user?: { username: string }; // Sesuaikan dengan data user yang ingin ditampilkan
  createdAt: string;
}

const DiscoverPage = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const captionRef = useRef<string>('');
  const uploadHandledRef = useRef<boolean>(false);
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();
  const [isCloudinaryScriptLoaded, setIsCloudinaryScriptLoaded] = useState(false); // MODIFIED: Added state

  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // MODIFIED: useEffect for creating the widget, depends on script loaded status and env vars
  useEffect(() => {
    if (isCloudinaryScriptLoaded && CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET) {
      // @ts-ignore
      if (window.cloudinary) {
        // @ts-ignore
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: CLOUDINARY_CLOUD_NAME,
          uploadPreset: CLOUDINARY_UPLOAD_PRESET,
          sources: ['local', 'url', 'camera'],
          multiple: false,
          maxFiles: 1,
          showCompletedButton: true,
          cropping: true,
          resourceType: 'auto', // Mendeteksi apakah gambar atau video
          clientAllowedFormats: ['image', 'video'], // Membatasi hanya gambar dan video
          theme: 'minimal',
        },
        async (error: any, result: any) => {
          if (!error && result && result.event === 'success' && !uploadHandledRef.current) {
            uploadHandledRef.current = true;
            console.log('Upload success:', result.info);
            const imageUrl = result.info.secure_url;
            await sendToBackend(imageUrl, captionRef.current);
            widgetRef.current?.close();
            setCaption(''); // Reset caption setelah upload
            captionRef.current = '';
          }
          if (error) {
            console.error('Upload error:', error);
            setError('Gagal mengupload file. Silakan coba lagi.');
          }
        }
      );
        console.log('Cloudinary widget created/re-created.');
      } else {
        console.warn('window.cloudinary is not available even after script load.');
        setError('Gagal menginisialisasi Cloudinary. Fitur upload mungkin tidak berfungsi.');
      }
    } else if (isCloudinaryScriptLoaded && (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET)) {
      // Script loaded but creds missing
      console.warn(
        'Cloudinary credentials not found. Make sure NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET are set in .env'
      );
      setError('Konfigurasi Cloudinary tidak ditemukan. Fitur upload mungkin tidak berfungsi.');
    }
    // MODIFIED: Dependency array changed, caption removed
  }, [isCloudinaryScriptLoaded, CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET]);

  const fetchGalleryItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Ganti dengan URL API Anda jika berbeda
      // Sertakan token untuk otentikasi
      const token = Cookies.get('token');
      const response = await fetch('http://localhost:3001/galleries', {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      if (!response.ok) {
        throw new Error('Gagal mengambil item galeri');
      }
      const data = await response.json();
      console.log('Fetched galleries:', data);
      // Map data to ensure imageUrl property exists, fallback to image if necessary
      const items = data.map((g: any) => ({
        ...g,
        imageUrl: g.imageUrl ?? g.image,
      }));
      setGalleryItems(items);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat memuat galeri.');
      console.error('Error fetching gallery items:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // MODIFIED: useEffect for loading Cloudinary script
  useEffect(() => {
    fetchGalleryItems(); // Keep this here if it's okay to run on mount

    const script = document.createElement('script');
    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.async = true;
    script.onload = () => {
      console.log('Cloudinary script loaded successfully.');
      setIsCloudinaryScriptLoaded(true); // Set flag when script is loaded
    };
    script.onerror = () => {
      console.error('Failed to load Cloudinary script.');
      setError('Gagal memuat skrip upload. Fitur upload mungkin tidak berfungsi.');
      setIsCloudinaryScriptLoaded(false);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []); // Runs once on mount

  const sendToBackend = async (imageUrl: string, imageCaption?: string) => {
    const token = Cookies.get('token');
    // userId akan diambil dari token di backend, jadi tidak perlu dikirim dari frontend
    // jika backend Anda mengharapkan userId di body, Anda perlu mengambilnya dari state user yang login

    try {
      const response = await fetch('http://localhost:3001/galleries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ 
          imageUrl,
          caption: imageCaption 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menyimpan gambar ke backend');
      }
      // Refresh galeri setelah berhasil upload
      fetchGalleryItems(); 
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat menyimpan gambar.');
      console.error('Error sending to backend:', err);
    }
  };

  const handleUploadClick = () => {
    if (widgetRef.current) {
      uploadHandledRef.current = false;
      widgetRef.current.open();
    } else {
      // MODIFIED: More informative error and logging
      setError('Upload widget belum siap. Pastikan konfigurasi Cloudinary benar dan tunggu sebentar.');
      console.error('Attempted to open widget, but widgetRef.current is not set.');
      console.log({
        isCloudinaryScriptLoaded,
        CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_UPLOAD_PRESET,
        cloudinaryRefCurrent: cloudinaryRef.current,
        widgetRefCurrent: widgetRef.current
      });
    }
  };

  return (
    <>
      <Head>
        <title>Discover | FestiGo</title>
      </Head>
      <main className={styles.mainContainer}>
        <section className={styles.uploadSection}>
          <h2>Bagikan Momen Festivalmu!</h2>
          <p>Upload foto atau video keseruanmu di berbagai festival.</p>
          <div className={styles.uploadForm}>
            <textarea
              className={styles.captionInput}
              placeholder="Tambahkan caption (opsional)..."
              value={caption}
              onChange={(e) => { setCaption(e.target.value); captionRef.current = e.target.value; }}
            />
            <button onClick={handleUploadClick} className={styles.uploadButton}>
              Upload Foto/Video
            </button>
          </div>
        </section>

        {error && <p className={styles.errorText}>{error}</p>}

        <section className={styles.gallerySection}>
          <h2>Galeri Festival</h2>
          {isLoading ? (
            <p>Memuat galeri...</p>
          ) : galleryItems.length === 0 && !error ? (
            <p>Belum ada foto atau video yang diupload. Jadilah yang pertama!</p>
          ) : (
            <div className={styles.galleryGrid}>
              {galleryItems.map((item) => (
                <div key={item.id} className={styles.galleryItem}>
                  {(item.imageUrl.endsWith('.mp4') || item.imageUrl.endsWith('.mov') || item.imageUrl.endsWith('.avi')) ? (
                    <video controls className={styles.galleryMedia} src={item.imageUrl} />
                  ) : (
                    <img className={styles.galleryMedia} src={item.imageUrl} alt={item.caption || 'Festival moment'} />
                  )}
                  {item.caption && <p className={styles.galleryCaption}>{item.caption}</p>}
                  <p className={styles.galleryDate}>Diunggah: {new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default DiscoverPage;

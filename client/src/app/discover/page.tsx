'use client';

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './page.module.css';
import Cookies from 'js-cookie';
import { FaUpload, FaTimes, FaCalendarAlt } from 'react-icons/fa';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns'; // MODIFIKASI: Impor date-fns yang benar
import { enUS } from 'date-fns/locale'; // MODIFIKASI: Cara impor locale yang benar
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from '@/components/layout/Navbar';

// --- Konfigurasi untuk Kalender (Diperbarui) ---
const locales = {
  'en-US': enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// --- Definisi Tipe Data ---
interface GalleryItem {
  id: number; imageUrl: string; caption?: string;
  user?: { username: string }; createdAt: string;
}
interface CalendarEvent {
  id: number; title: string; start: Date; end: Date;
}

export default function DiscoverPage() {
  // State untuk semua data di halaman ini
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State untuk alur unggah
  const [caption, setCaption] = useState('');
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();
  
  // useEffect untuk memuat semua data dan menginisialisasi Cloudinary
  useEffect(() => {
    const fetchPageData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [galleryRes, eventsRes] = await Promise.all([
          fetch('http://localhost:3001/galleries'),
          fetch('http://localhost:3001/events/upcoming/all'),
        ]);

        if (!galleryRes.ok) throw new Error('Gagal mengambil item galeri');
        if (!eventsRes.ok) throw new Error('Gagal mengambil data event');

        const galleryData = await galleryRes.json();
        const eventsData = await eventsRes.json();
        
        setGalleryItems(galleryData.sort((a: GalleryItem, b: GalleryItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        
        const formattedEvents = eventsData.map((event: any) => ({
          id: event.id,
          title: event.title,
          start: new Date(event.date),
          end: new Date(event.date),
        }));
        setUpcomingEvents(formattedEvents);

      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan saat memuat data.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPageData();

    // Inisialisasi Cloudinary Widget
    const script = document.createElement('script');
    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.async = true;
    script.onload = () => {
      cloudinaryRef.current = (window as any).cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        cropping: true,
        resourceType: 'auto',
        clientAllowedFormats: ['image', 'video'],
      }, (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          setMediaPreviewUrl(result.info.secure_url);
          setMediaType(result.info.resource_type);
          widgetRef.current.close();
        }
      });
    };
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);
  
  // Fungsi handler untuk unggah dan posting galeri (tidak berubah)
  const handleUploadClick = () => { widgetRef.current?.open(); };
  const handleCancelPreview = () => { setMediaPreviewUrl(null); setCaption(''); };
  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaPreviewUrl) return;
    setIsUploading(true);
    const token = Cookies.get('token');
    try {
      const response = await fetch('http://localhost:3001/galleries', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ imageUrl: mediaPreviewUrl, caption: caption }),
      });
      if (!response.ok) throw new Error('Gagal menyimpan unggahan.');
      setMediaPreviewUrl(null); setCaption('');
      // Refresh galeri setelah berhasil
      const galleryRes = await fetch('http://localhost:3001/galleries');
      const galleryData = await galleryRes.json();
      setGalleryItems(galleryData.sort((a: GalleryItem, b: GalleryItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <Head>
        <title>Discover Events & Moments | FestiGo</title>
      </Head>
      <main className={styles.mainContainer}>
        {isLoading ? (
          <div className={styles.loadingText}>Memuat Halaman Discover...</div>
        ) : error ? (
          <p className={styles.errorText}>{error}</p>
        ) : (
          <>
            <section className={styles.calendarSection}>
              <div className={styles.calendarContainer}>
                <Calendar
                  localizer={localizer}
                  events={upcomingEvents}
                  views={[Views.MONTH, Views.AGENDA]}
                  style={{ height: '100%' }}
                  popup
                  components={{
                    event: ({ event }) => (
                      <Link href={`/events/${event.id}`} className={styles.calendarEventLink}>
                        {event.title}
                      </Link>
                    ),
                  }}
                />
              </div>
              <div className={styles.eventListContainer}>
                <h3 className={styles.eventListTitle}>Upcoming Events</h3>
                <ul className={styles.eventList}>
                  {upcomingEvents.slice(0, 10).map(event => (
                    <li key={event.id} className={styles.eventListItem}>
                      <Link href={`/events/${event.id}`} className={styles.eventLink}>
                        <FaCalendarAlt className={styles.eventIcon} />
                        <div className={styles.eventDetails}>
                          <span className={styles.eventTitle}>{event.title}</span>
                          <span className={styles.eventDate}>{format(event.start, 'd MMMM yyyy')}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className={styles.uploadSection}>
              {!mediaPreviewUrl ? (
                <div className={styles.uploadInitiator}>
                  <h2>Bagikan Momen Festivalmu!</h2>
                  <p>Unggah foto atau video terbaikmu dan jadilah bagian dari komunitas.</p>
                  <button onClick={handleUploadClick} className={styles.uploadButton}>
                    <FaUpload /> Unggah Sekarang
                  </button>
                </div>
              ) : (
                <form className={styles.previewForm} onSubmit={handlePostSubmit}>
                  <h2>Pratinjau Unggahan</h2>
                  <div className={styles.previewContent}>
                    <div className={styles.mediaContainer}>
                      {mediaType === 'image' && <img src={mediaPreviewUrl} alt="Pratinjau" className={styles.previewMedia} />}
                      {mediaType === 'video' && <video controls src={mediaPreviewUrl} className={styles.previewMedia} />}
                      <button type="button" onClick={handleCancelPreview} className={styles.cancelButton}><FaTimes /></button>
                    </div>
                    <div className={styles.formFields}>
                      <textarea className={styles.captionInput} placeholder="Tambahkan caption..." value={caption} onChange={(e) => setCaption(e.target.value)} />
                      <button type="submit" className={styles.postButton} disabled={isUploading}>{isUploading ? 'Memposting...' : 'Posting Sekarang'}</button>
                    </div>
                  </div>
                </form>
              )}
            </section>

            <section className={styles.gallerySection}>
              <h2>Galeri Komunitas</h2>
              {galleryItems.length > 0 ? (
                <div className={styles.galleryGrid}>
                  {galleryItems.map((item) => (
                    <div key={item.id} className={styles.galleryItem}>
                      {item.imageUrl.endsWith('.mp4') ? (
                        <video controls className={styles.galleryMedia} src={item.imageUrl} />
                      ) : (
                        <img className={styles.galleryMedia} src={item.imageUrl} alt={item.caption || 'Moment'} loading="lazy" />
                      )}
                      <div className={styles.galleryOverlay}>
                        <div className={styles.galleryUserInfo}><span className={styles.galleryUsername}>{item.user?.username || 'Anonim'}</span></div>
                        {item.caption && <p className={styles.galleryCaption}>{item.caption}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.emptyText}>Belum ada momen yang dibagikan. Jadilah yang pertama!</p>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
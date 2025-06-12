'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { format } from 'date-fns';
import { FaCalendarAlt, FaCamera, FaRegComments, FaRegStar, FaImage } from 'react-icons/fa';
import ProfileReviewCard from '@/components/profile/ProfileReviewCard';
import ProfileThreadCard from '@/components/profile/ProfileThreadCard';
import Navbar from '@/components/layout/Navbar';
import styles from './page.module.css';

// --- Definisi Tipe Data ---
interface GalleryItem {
  id: number;
  imageUrl: string;
  caption?: string;
}

interface Review {
    id: number;
    comment: string;
    rating: number;
    createdAt: string;
    event: { id: number; title: string };
  }
  interface Thread {
    id: number;
    title: string;
    createdAt: string;
    event: { id: number; title: string };
  }
  interface UserProfile {
    name: string;
    email: string;
    createdAt: string;
    avatarUrl?: string;
    reviews: Review[];
    threads: Thread[];
  }

/**
 * Halaman Profil Pengguna (Client Component).
 * Menampilkan info pengguna, galeri, dan menyediakan fungsionalitas untuk mengubah foto profil.
 */
export default function ProfilePage() {
  const router = useRouter();
  
  // State untuk data, loading, dan error
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('gallery');

  // State untuk alur unggah foto profil
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Refs untuk Cloudinary
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();

  // Efek untuk memuat data awal pengguna dan galeri
  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/login'); // Arahkan ke login jika tidak ada token
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const [profileRes, galleryRes] = await Promise.all([
          fetch(`${apiUrl}/users`, { headers }),
          fetch(`${apiUrl}/users/me/gallery`, { headers }),
        ]);

        if (!profileRes.ok) throw new Error("Gagal memuat profil");

        const profileData = await profileRes.json();
        const galleryData = galleryRes.ok ? await galleryRes.json() : [];

        setProfile(profileData);
        setGallery(galleryData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [router]);

  // Efek untuk menginisialisasi widget Cloudinary
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.async = true;
    script.onload = () => {
      cloudinaryRef.current = (window as any).cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        cropping: true,
        croppingAspectRatio: 1,
        showCompletedButton: true,
        sources: ['local', 'camera', 'url'],
      }, (err: any, result: any) => {
        if (!err && result && result.event === 'success') {
          setPreviewAvatarUrl(result.info.secure_url);
        }
      });
    };
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);
  
  const handleAvatarUploadClick = () => {
    widgetRef.current?.open();
  };
  
  const handleSaveAvatar = async () => {
    if (!previewAvatarUrl) return;
    setIsUploading(true);
    const token = Cookies.get('token');
    
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/users/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ avatarUrl: previewAvatarUrl }),
        });
        if (!response.ok) throw new Error("Gagal menyimpan foto profil.");

        const updatedUser = await response.json();
        setProfile(prev => prev ? { ...prev, avatarUrl: updatedUser.avatarUrl } : null);
        setPreviewAvatarUrl(null);

    } catch (err: any) {
        setError(err.message);
    } finally {
        setIsUploading(false);
    }
  };

  if (isLoading) return <div className={styles.centeredMessage}>Loading...</div>;
  if (error) return <div className={styles.centeredMessage}>Error: {error}</div>;
  if (!profile) return null; // atau redirect ke login

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.mainContainer}>
        <header className={styles.profileHeader}>
          <div className={styles.avatarWrapper}>
            <Image
              key={previewAvatarUrl || profile.avatarUrl || 'default'}
              src={previewAvatarUrl || profile.avatarUrl || '/images/default-avatar.png'}
              alt="User Avatar"
              width={120}
              height={120}
              className={styles.avatar}
            />
            <button className={styles.uploadOverlay} onClick={handleAvatarUploadClick}>
              <FaCamera />
              <span>Ubah Foto</span>
            </button>
          </div>

          {previewAvatarUrl && (
              <div className={styles.actionButtons}>
                  <button onClick={handleSaveAvatar} className={styles.saveButton} disabled={isUploading}>
                      {isUploading ? 'Menyimpan...' : 'Simpan Foto'}
                  </button>
                  <button onClick={() => setPreviewAvatarUrl(null)} className={styles.cancelButton}>
                      Batal
                  </button>
              </div>
          )}

          <h1 className={styles.username}>{profile.name}</h1>
          <div className={styles.joinDate}>
            <FaCalendarAlt />
            Bergabung pada {format(new Date(profile.createdAt), 'MMMM yyyy')}
          </div>
        </header>
        
        <div className={styles.contentTabs}>
          <button
            className={`${styles.tabButton} ${activeTab === 'gallery' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            <FaImage /> Galeri
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <FaRegStar /> Ulasan
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'threads' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('threads')}
          >
            <FaRegComments /> Diskusi
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'gallery' && (
             <section className={styles.gallerySection}>
             {gallery.length > 0 ? (
               <div className={styles.galleryGrid}>
                 {gallery.map((item: GalleryItem) => (
                   <div key={item.id} className={styles.galleryItem}>
                     <Image
                       src={item.imageUrl}
                       alt={item.caption || 'User upload'}
                       fill
                       style={{ objectFit: 'cover' }}
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     />
                      {item.caption && (
                       <div className={styles.captionOverlay}><p>{item.caption}</p></div>
                     )}
                   </div>
                 ))}
               </div>
             ) : (
               <div className={styles.emptyContent}>
                 <p>Anda belum mengunggah momen apapun.</p>
                 <Link href="/discover" className={styles.uploadLink}>Unggah Sekarang</Link>
               </div>
             )}
           </section>
          )}

          {activeTab === 'reviews' && (
            <div className={styles.listContainer}>
                {profile.reviews.length > 0 ? (
                    profile.reviews.map((review) => <ProfileReviewCard key={review.id} review={review} />)
                ) : (
                    <div className={styles.emptyContent}><p>Anda belum membuat ulasan apapun.</p></div>
                )}
            </div>
          )}
          
          {activeTab === 'threads' && (
            <div className={styles.listContainer}>
                {profile.threads.length > 0 ? (
                    profile.threads.map((thread) => <ProfileThreadCard key={thread.id} thread={thread} />)
                ) : (
                    <div className={styles.emptyContent}><p>Anda belum memulai diskusi apapun.</p></div>
                )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
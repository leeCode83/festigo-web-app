'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { FaCommentAlt } from 'react-icons/fa';
import { format } from 'date-fns';

import ReviewSection from './ReviewSection';
import styles from '@/app/events/[id]/page.module.css';

// --- Definisi Tipe Data ---
interface Review {
  id: number;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Thread {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  username: string;
  replyCount: number;
}

interface EventInteractionsProps {
  eventId: string;
  initialReviews: Review[];
  initialThreads: Thread[];
}

/**
 * Komponen untuk menangani semua interaksi pengguna di halaman detail event.
 * Ini termasuk menampilkan ulasan, form ulasan, daftar diskusi, dan form diskusi.
 * Dibuat sebagai Client Component karena memerlukan state dan interaksi browser.
 * @param {EventInteractionsProps} props - Properti yang berisi data awal untuk ulasan dan diskusi.
 */
export default function EventInteractions({ eventId, initialReviews, initialThreads }: EventInteractionsProps) {
  const router = useRouter();
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const averageRating = initialReviews.length > 0
    ? initialReviews.reduce((acc, review) => acc + review.rating, 0) / initialReviews.length
    : 0;

  /**
   * Menangani pengiriman form diskusi baru.
   * @param e - Event dari form submission.
   */
  const handleDiscussionSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newDiscussion.title.trim() || !newDiscussion.content.trim()) return;

    const token = Cookies.get('token');
    if (!token) {
      alert('Anda harus login untuk memulai diskusi.');
      return;
    }

    setIsSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/discussions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          eventId: Number(eventId),
          title: newDiscussion.title,
          content: newDiscussion.content
        })
      });

      if (!response.ok) throw new Error('Gagal membuat diskusi');

      setNewDiscussion({ title: '', content: '' });
      // Memuat ulang data dari server setelah berhasil membuat diskusi baru
      router.refresh();
    } catch (err) {
      console.error('Error creating discussion:', err);
      alert('Gagal membuat diskusi. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ReviewSection
        eventId={eventId}
        reviews={initialReviews}
        averageRating={averageRating}
        totalReviews={initialReviews.length}
        onReviewSubmitted={() => router.refresh()} // Cukup refresh untuk mendapatkan ulasan baru
        eventStatus="past" // Asumsi event sudah lewat untuk bisa diulas
      />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Discussions</h2>
        
        <div className={styles.threadList}>
          {initialThreads.length === 0 ? (
            <p className={styles.noThreads}>Belum ada diskusi. Jadilah yang pertama!</p>
          ) : (
            initialThreads.map((thread) => (
              <Link href={`/discussions/${thread.id}`} key={thread.id} className={styles.threadLink}>
                <div className={styles.threadItem}>
                  <h3 className={styles.threadTitle}>{thread.title}</h3>
                  <p className={styles.threadContent}>{thread.content.length > 150 ? `${thread.content.substring(0, 150)}...` : thread.content}</p>
                  <div className={styles.threadMeta}>
                    <span><FaCommentAlt className={styles.threadIcon} /> {thread.replyCount || 0} replies</span>
                    <span>By {thread.username}</span>
                    <span>{format(new Date(thread.createdAt), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        <form className={styles.discussionForm} onSubmit={handleDiscussionSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Judul Diskusi"
              className={styles.input}
              value={newDiscussion.title}
              onChange={(e) => setNewDiscussion(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <textarea
              placeholder="Bagikan pemikiranmu..."
              className={styles.textarea}
              value={newDiscussion.content}
              onChange={(e) => setNewDiscussion(prev => ({ ...prev, content: e.target.value }))}
              required
              rows={4}
            />
          </div>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Mengirim...' : 'Mulai Diskusi'}
          </button>
        </form>
      </section>
    </>
  );
}
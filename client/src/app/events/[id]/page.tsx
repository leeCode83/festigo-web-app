import { notFound } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';
import { format } from 'date-fns';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTicketAlt } from 'react-icons/fa';
import Navbar from '@/components/layout/Navbar';
import EventInteractions from '@/components/events/EventInteractions';

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

interface EventData {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  ticketUrl: string;
  reviews: Review[];
  threads: Thread[];
}

/**
 * Mengambil detail lengkap sebuah event dari API.
 * @param id - ID dari event yang akan diambil.
 * @returns {Promise<EventData | null>} Data event atau null jika tidak ditemukan.
 */
async function getEventDetails(id: string): Promise<EventData | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/events/event/${id}`, { cache: 'no-store' });

    if (!res.ok) {
      return null; // Kembalikan null jika event tidak ditemukan (404) atau ada error server
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch event details:", error);
    return null;
  }
}

/**
 * Halaman Detail Event (Server Component).
 * Bertanggung jawab untuk mengambil data event dari server dan menampilkannya.
 * @param {object} props - Properti yang berisi parameter URL.
 * @param {object} props.params - Berisi `id` event.
 */
export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const event = await getEventDetails(params.id);

  // Jika event tidak ditemukan, tampilkan halaman 404
  if (!event) {
    notFound();
  }

  // Format tanggal dan waktu untuk ditampilkan
  const eventDate = new Date(event.date);
  const formattedDate = format(eventDate, 'EEEE, MMMM d, yyyy');
  const formattedTime = format(eventDate, 'HH:mm a');

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        {/* Bagian Hero dengan gambar event */}
        <div className={styles.heroSection}>
          <Image
            src={event.image}
            alt={event.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{event.title}</h1>
          </div>
        </div>

        <div className={styles.content}>
          {/* Konten Utama (Deskripsi & Interaksi) */}
          <div className={styles.mainContent}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>About This Event</h2>
              <p className={styles.description}>{event.description}</p>
            </section>

            {/* Komponen terpisah untuk bagian interaktif */}
            <EventInteractions 
              eventId={event.id}
              initialReviews={event.reviews || []}
              initialThreads={event.threads || []}
            />
          </div>

          {/* Sidebar dengan informasi ringkas event */}
          <aside className={styles.sidebar}>
            <div className={styles.eventInfo}>
              <div className={styles.infoItem}>
                <FaCalendarAlt className={styles.icon} />
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>Date</div>
                  <div className={styles.infoValue}>{formattedDate}</div>
                </div>
              </div>
              <div className={styles.infoItem}>
                <FaClock className={styles.icon} />
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>Time</div>
                  <div className={styles.infoValue}>{formattedTime}</div>
                </div>
              </div>
              <div className={styles.infoItem}>
                <FaMapMarkerAlt className={styles.icon} />
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>Location</div>
                  <div className={styles.infoValue}>{event.location}</div>
                </div>
              </div>
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bookButton}
              >
                <FaTicketAlt /> Get Tickets
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
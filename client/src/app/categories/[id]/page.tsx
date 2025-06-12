// Impor 'notFound' dari next/navigation untuk menangani halaman 404 secara programmatic
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import EventCard from '@/components/events/EventCard';
import styles from './page.module.css';

// --- Definisi Tipe Data ---
// Mendefinisikan struktur objek untuk data event agar kode lebih aman dan mudah dibaca.
interface CategoryEvent {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  likes: number;
  averageRating: number;
}

// --- Metadata untuk Setiap Kategori ---
// Objek ini menyimpan data statis untuk setiap halaman kategori,
// seperti judul, deskripsi, dan gambar hero.
const categoriesData = {
  music: {
    title: 'Music Events',
    description: 'Discover amazing concerts and musical performances',
    longDescription: 'From classical concerts to modern festivals, our music events bring together talented artists and passionate audiences. Experience live performances, music festivals, and concerts that will leave you inspired.',
    features: ['Live Performances', 'Music Festivals', 'Concert Tours', 'Album Launch Events'],
    icon: '🎵',
    heroImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&auto=format&fit=crop&q=80'
  },
  culinary: {
    title: 'Culinary Events',
    description: 'Explore food festivals and culinary experiences',
    longDescription: 'Immerse yourself in the world of gastronomy with our curated culinary events. From food festivals to cooking workshops, discover new flavors and culinary traditions.',
    features: ['Food Festivals', 'Cooking Workshops', 'Wine Tasting', 'Chef Meet & Greet'],
    icon: '🍲',
    heroImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&auto=format&fit=crop&q=80'
  },
  'pop-culture': {
    title: 'Pop Culture Events',
    description: 'Join conventions, cosplay events, and more',
    longDescription: 'Celebrate your favorite fandoms at our pop culture events. Meet fellow enthusiasts, participate in cosplay competitions, and immerse yourself in the world of entertainment.',
    features: ['Comic Conventions', 'Cosplay Events', 'Fan Meetups', 'Gaming Tournaments'],
    icon: '👾',
    heroImage: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=1600&auto=format&fit=crop&q=80'
  },
  art: {
    title: 'Art Events',
    description: 'Experience exhibitions, galleries, and art installations',
    longDescription: 'Explore the world of visual arts through our diverse art events. From contemporary exhibitions to traditional galleries, discover the beauty of artistic expression.',
    features: ['Art Exhibitions', 'Gallery Openings', 'Artist Talks', 'Workshop Sessions'],
    icon: '🎨',
    heroImage: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1600&auto=format&fit=crop&q=80'
  },
  sports: {
    title: 'Sports Events',
    description: 'Watch and participate in exciting sporting events',
    longDescription: 'Get your adrenaline pumping with our sports events. Whether you are a participant or spectator, experience the thrill of competition and athletic excellence.',
    features: ['Tournaments', 'Training Camps', 'Championship Games', 'Sports Workshops'],
    icon: '⚽',
    heroImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&auto=format&fit=crop&q=80'
  },
  education: {
    title: 'Educational Events',
    description: 'Attend workshops, seminars, and learning sessions',
    longDescription: 'Expand your knowledge and skills through our educational events. Join expert-led workshops, informative seminars, and interactive learning sessions.',
    features: ['Expert Workshops', 'Professional Seminars', 'Training Sessions', 'Career Development'],
    icon: '📚',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&auto=format&fit=crop&q=80'
  }
};

/**
 * Fungsi ini bertanggung jawab untuk mengambil data event untuk kategori tertentu dari API.
 * @param category - Nama kategori event yang akan diambil (misal: "music").
 * @returns {Promise<CategoryEvent[]>} Sebuah promise yang akan resolve menjadi array objek event.
 */
async function getCategoryEvents(category: string): Promise<CategoryEvent[]> {
  try {
    const res = await fetch(`http://localhost:3001/events/category/${category}`, {
      cache: 'no-store', // Memastikan data selalu baru
    });

    if (!res.ok) {
      // Jika respons dari server tidak "OK", kita lempar error.
      throw new Error(`Failed to fetch events for category: ${category}`);
    }
    return res.json();
  } catch (error) {
    console.error(error);
    // Mengembalikan array kosong jika terjadi error agar halaman tidak rusak.
    return [];
  }
}

/**
 * Halaman Detail Kategori (CategoryPage)
 * Ini adalah Server Component yang menampilkan detail dan daftar event untuk sebuah kategori.
 * Data diambil di server, sehingga halaman dimuat lebih cepat.
 * @param {object} props - Properti yang diterima oleh komponen.
 * @param {object} props.params - Parameter dinamis dari URL, berisi `id` kategori.
 */
export default async function CategoryPage({ params }: { params: { id: string } }) {
  const categoryId = params.id as keyof typeof categoriesData;

  // Mengambil informasi statis kategori dari objek 'categoriesData'
  const categoryInfo = categoriesData[categoryId];
  
  // Jika ID kategori dari URL tidak valid (tidak ada di 'categoriesData'),
  // tampilkan halaman 404.
  if (!categoryInfo) {
    notFound();
  }

  // Mengambil data event dari API secara asynchronous di server.
  const events = await getCategoryEvents(categoryId);

  return (
    <div>
      <Navbar />
      <main className={styles.main}>
        {/* Bagian Hero untuk menampilkan informasi utama kategori */}
        <div className={styles.categoryHero}>
          <div className={styles.heroImage} style={{ backgroundImage: `url(${categoryInfo.heroImage})` }} />
          <div className={styles.heroContent}>
            <span className={styles.categoryIcon}>{categoryInfo.icon}</span>
            <h1 className={styles.categoryTitle}>{categoryInfo.title}</h1>
            <p className={styles.categoryDescription}>{categoryInfo.description}</p>
          </div>
        </div>

        {/* Bagian informasi detail tentang kategori */}
        <section className={styles.categoryInfo}>
          <div className={styles.infoContainer}>
            <div className={styles.aboutCategory}>
              <h2>About {categoryInfo.title}</h2>
              <p>{categoryInfo.longDescription}</p>
            </div>
            <div className={styles.categoryFeatures}>
              <h3>What to Expect</h3>
              <ul className={styles.featuresList}>
                {categoryInfo.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    <span className={styles.featureIcon}>✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Bagian untuk menampilkan daftar event */}
        <section className={styles.eventsSection}>
          <div className={styles.sectionHeader}>
            <h2>Upcoming {categoryInfo.title}</h2>
            <p>Discover and book your next amazing experience</p>
          </div>

          <div className={styles.eventGrid}>
            {events.length > 0 ? (
              events.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`} className={styles.cardLink}>
                  <EventCard {...event} />
                </Link>
              ))
            ) : (
              <div className={styles.noEvents}>
                No upcoming events found for this category. Check back later!
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
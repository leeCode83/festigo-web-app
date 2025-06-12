import Navbar from '@/components/layout/Navbar';
import HomePageClient from '@/components/common/HomePageClient';
import styles from './page.module.css';

// Definisikan tipe data event
interface Event {
  id: string;
  image: string;
  title: string;
  date: string;
  location: string;
  likes: number;
  averageRating: number;
}

// Fungsi untuk mengambil data dari API
async function getEvents(url: string): Promise<Event[]> {
  try {
    const res = await fetch(url, { 
      // 'no-store' memastikan data selalu baru setiap kali halaman diakses
      cache: 'no-store' 
    });

    if (!res.ok) {
      console.error(`Failed to fetch ${url}: ${res.statusText}`);
      return []; // Kembalikan array kosong jika gagal
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return []; // Kembalikan array kosong jika ada error
  }
}

// Halaman utama sekarang menjadi Server Component (tanpa 'use client')
export default async function Home() {
  // Ambil data langsung di server
  const popularEvents = await getEvents('http://localhost:3001/events/popular');
  const upcomingEvents = await getEvents('http://localhost:3001/events/upcoming');

  return (
    <main className={styles.main}>
      <Navbar />
      <HomePageClient 
        initialPopularEvents={popularEvents} 
        initialUpcomingEvents={upcomingEvents} 
      />
    </main>
  );
}
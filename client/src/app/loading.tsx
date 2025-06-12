import styles from '@/styles/components/common/GlobalLoader.module.css';

/**
 * Komponen Loading Global.
 * Next.js secara otomatis akan menampilkan komponen ini menggunakan React Suspense
 * setiap kali ada data atau segmen rute yang sedang dimuat.
 * Dengan menempatkannya di root `app`, ini akan menjadi fallback untuk seluruh aplikasi.
 */
export default function Loading() {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loaderContainer}>
        <div className={styles.ticket}>
          <div className={styles.ticketRip}></div>
          <span className={styles.ticketText}>FestiGo</span>
        </div>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    </div>
  );
}
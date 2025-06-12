'use client';

import { FaTimes, FaUserCircle } from 'react-icons/fa';
import styles from '@/styles/components/common/GalleryModal.module.css';

interface GalleryItem {
  id: number;
  imageUrl: string;
  caption?: string;
  user?: {
    username: string;
  };
  createdAt: string;
}

interface GalleryModalProps {
  item: GalleryItem;
  onClose: () => void;
}

export default function GalleryModal({ item, onClose }: GalleryModalProps) {
  // Fungsi untuk menghentikan propagasi event, agar saat klik konten modal, modal tidak tertutup
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const isVideo = item.imageUrl.endsWith('.mp4') || item.imageUrl.endsWith('.mov') || item.imageUrl.endsWith('.avi');

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={handleContentClick}>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        <div className={styles.mediaContainer}>
          {isVideo ? (
            <video controls autoPlay className={styles.media} src={item.imageUrl} />
          ) : (
            <img className={styles.media} src={item.imageUrl} alt={item.caption || 'Gallery item'} />
          )}
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.userInfo}>
            <FaUserCircle className={styles.userIcon} />
            <span className={styles.username}>{item.user?.username || 'Anonim'}</span>
          </div>
          {item.caption && <p className={styles.caption}>{item.caption}</p>}
          <p className={styles.date}>
            Diunggah pada {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
}
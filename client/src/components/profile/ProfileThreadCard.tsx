import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import styles from '@/styles/components/profile/ProfileCard.module.css';

interface Thread {
  id: number;
  title: string;
  createdAt: string;
  event: {
    id: number;
    title: string;
  };
}

export default function ProfileThreadCard({ thread }: { thread: Thread }) {
  return (
    <Link href={`/discussions/${thread.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <h4 className={styles.cardTitle}>{thread.title}</h4>
        <div className={styles.cardFooter}>
          Diskusi di event{' '}
          <span className={styles.eventLink}>{thread.event.title}</span>
          <span className={styles.date}>
            - {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
          </span>
        </div>
      </div>
    </Link>
  );
}
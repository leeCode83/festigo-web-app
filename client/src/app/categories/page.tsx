import styles from '../../styles/categories.module.css';
import Link from 'next/link';
import { FaMusic, FaGraduationCap, FaTheaterMasks, FaGamepad } from 'react-icons/fa';
import { MdFestival } from 'react-icons/md';
import { IoTrendingUp } from 'react-icons/io5';

export default function Categories() {
  const categories = [
    {
      title: 'Konser & Musik',
      image: '/images/concert.jpg',
      icon: <FaMusic className={styles.categoryIcon} />,
      href: '/categories/music'
    },
    {
      title: 'Pensi & Acara Kampus',
      image: '/images/campus.jpg',
      icon: <FaGraduationCap className={styles.categoryIcon} />,
      href: '/categories/campus'
    },
    {
      title: 'Festival & Expo',
      image: '/images/expo.jpg',
      icon: <MdFestival className={styles.categoryIcon} />,
      href: '/categories/festival'
    },
    {
      title: 'Pop Culture',
      image: '/images/popculture.jpg',
      icon: <IoTrendingUp className={styles.categoryIcon} />,
      href: '/categories/popculture'
    },
    {
      title: 'Pertunjukan Seni',
      image: '/images/arts.jpg',
      icon: <FaTheaterMasks className={styles.categoryIcon} />,
      href: '/categories/arts'
    },
    {
      title: 'Sport & Esports',
      image: '/images/sports.jpg',
      icon: <FaGamepad className={styles.categoryIcon} />,
      href: '/categories/sports'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Categories</h1>
        <p className={styles.subtitle}>Discover events that match your interests</p>
      </div>
      
      <div className={styles.categoryGrid}>
        {categories.map((category, index) => (
          <Link href={category.href} key={index} className={styles.categoryCard}>
            <div className={styles.cardOverlay} />
            <div className={styles.cardImage} style={{
              backgroundImage: `url(${category.image})`
            }} />
            <div className={styles.cardContent}>
              {category.icon}
              <h2 className={styles.cardTitle}>{category.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

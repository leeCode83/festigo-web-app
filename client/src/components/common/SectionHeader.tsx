'use client';

import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import styles from '@/styles/components/common/SectionHeader.module.css';

interface SectionHeaderProps {
  title: string;
  linkText: string;
  linkHref: string;
}

export default function SectionHeader({ title, linkText, linkHref }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <Link href={linkHref} className={styles.sectionLink}>
        {linkText} <FaArrowRight />
      </Link>
    </div>
  );
}

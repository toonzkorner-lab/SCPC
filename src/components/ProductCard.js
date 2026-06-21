import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.css';

export default function ProductCard({ title, description, link, imageUrl }) {
  // Use placeholder image if no URL is provided (since we are scraping them now, some might be missing)
  const imageSrc = imageUrl || 'https://placehold.co/400x300?text=SCPC+Precast';
  
  return (
    <Link href={link} className={styles.card}>
      <div className={styles.imageContainer}>
        {/* We use standard img for now since external URLs or dynamically scraped ones might need config for Next Image */}
        <img src={imageSrc} alt={title} className={styles.image} loading="lazy" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        <span className={styles.readMore}>View Details &rarr;</span>
      </div>
    </Link>
  );
}

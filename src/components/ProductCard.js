import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.css';

export default function ProductCard({ title, description, link, imageUrl }) {
  // Use placeholder image if no URL is provided (since we are scraping them now, some might be missing)
  const imageSrc = imageUrl || 'https://placehold.co/400x300?text=SCPC+Precast';
  
  return (
    <Link href={link} className={styles.card}>
      <div className={styles.imageContainer} style={{ position: 'relative', width: '100%', height: '200px' }}>
        <Image 
          src={imageSrc} 
          alt={title} 
          fill
          className={styles.image}
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        <span className={styles.readMore}>View Details &rarr;</span>
      </div>
    </Link>
  );
}

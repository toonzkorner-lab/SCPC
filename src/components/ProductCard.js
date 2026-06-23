'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.css';
import { useQuote } from '../context/QuoteContext';

export default function ProductCard({ title, description, link, imageUrl, product }) {
  // Use placeholder image if no URL is provided (since we are scraping them now, some might be missing)
  const imageSrc = imageUrl || 'https://placehold.co/400x300?text=SCPC+Precast';
  
  const { addToQuote } = useQuote();
  const isProduct = link.includes('/products/');

  const handleAdd = (e) => {
    e.preventDefault(); // Prevent navigating to the product page
    e.stopPropagation();
    if (product) {
      addToQuote({
        id: product.id,
        name: product.name,
        image: product.image,
        categorySlug: product.categoryId // Close enough for a category slug if needed
      });
      alert(`Added ${product.name} to quote!`);
    }
  };

  return (
    <Link href={link} className={styles.card} style={{ display: 'flex', flexDirection: 'column' }}>
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
      <div className={styles.content} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description} style={{ flexGrow: 1 }}>{description}</p>}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <span className={styles.readMore}>View Details &rarr;</span>
          {isProduct && product && (
            <button 
              onClick={handleAdd}
              style={{ padding: '0.4rem 0.8rem', backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              + Add to Quote
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}

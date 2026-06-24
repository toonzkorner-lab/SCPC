'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import { useQuote } from '../context/QuoteContext';

export default function Navbar({ categories = [], products = [] }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { quoteItems, isLoaded } = useQuote();

  const galleryCats = new Set(products.filter(p => p.type === 'gallery').map(p => p.categoryId));
  const blueprintCats = new Set(products.filter(p => p.type === 'blueprint').map(p => p.categoryId));

  const handleLinkClick = (targetPath) => {
    if (pathname === targetPath) {
      window.scrollTo(0, 0);
    }
    setIsOpen(false);
  };

  return (
    <header className={styles.navbar}>
      <div className={`container ${styles.container}`}>
        <a href="/" onClick={() => handleLinkClick('/')} className={styles.logo} style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/images/logo.png" alt="SCPC Precast Logo" style={{ height: '80px', width: 'auto', maxWidth: '100%', objectFit: 'contain' }} />
        </a>
        
        <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        <nav className={`${styles.navLinks} ${isOpen ? styles.navLinksOpen : ''}`}>
          <SearchBar />
          <Link href="/" onClick={() => handleLinkClick('/')}>Home</Link>
          <div className={styles.dropdown}>
            <Link href="/products" onClick={() => handleLinkClick('/products')} className={styles.dropbtn}>Products ▾</Link>
            <div className={styles.dropdownContent}>
              {categories.filter(c => blueprintCats.has(c.id)).map((cat) => (
                <Link key={`products-${cat.id}`} href={`/products/${cat.slug}`} onClick={() => handleLinkClick(`/products/${cat.slug}`)}>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/best-sellers" onClick={() => handleLinkClick('/best-sellers')}>Best Sellers</Link>
          <div className={styles.dropdown}>
            <Link href="/gallery" onClick={() => handleLinkClick('/gallery')} className={styles.dropbtn}>Gallery ▾</Link>
            <div className={styles.dropdownContent}>
              {categories.filter(c => galleryCats.has(c.id)).map((cat) => (
                <Link key={`gallery-${cat.id}`} href={`/gallery/${cat.slug}`} onClick={() => handleLinkClick(`/gallery/${cat.slug}`)}>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/blog" onClick={() => handleLinkClick('/blog')}>Blog</Link>
          <Link href="/about" onClick={() => handleLinkClick('/about')}>About Us</Link>
          <Link href="/reviews" onClick={() => handleLinkClick('/reviews')}>Reviews</Link>
          <Link href="/professionals" onClick={() => handleLinkClick('/professionals')}>Professionals</Link>
          <Link href="/contact" onClick={() => handleLinkClick('/contact')} className="btn btn-accent" style={{ position: 'relative' }}>
            Quote
            {isLoaded && quoteItems.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: '#e74c3c',
                color: 'white',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                border: '2px solid white'
              }}>
                {quoteItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}


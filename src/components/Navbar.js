'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import categories from '../data/categories.json';
import products from '../data/products.json';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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
        <a href="/" onClick={() => handleLinkClick('/')} className={styles.logo}>
          <img src="/images/logo.jpg" alt="SCPC Precast Logo" style={{ height: '60px', width: 'auto' }} />
        </a>
        
        <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        <nav className={`${styles.navLinks} ${isOpen ? styles.navLinksOpen : ''}`}>
          <SearchBar />
          <Link href="/" onClick={() => handleLinkClick('/')}>Home</Link>
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
          <Link href="/about" onClick={() => handleLinkClick('/about')}>About Us</Link>
          <Link href="/best-sellers" onClick={() => handleLinkClick('/best-sellers')}>Best Sellers</Link>
          <Link href="/blog" onClick={() => handleLinkClick('/blog')}>Blog</Link>
          <Link href="/contact" onClick={() => handleLinkClick('/contact')} className="btn btn-accent">Contact</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}


import Link from 'next/link';
import styles from './Navbar.module.css';
import categories from '../data/categories.json';

import products from '../data/products.json';

export default function Navbar() {
  const galleryCats = new Set(products.filter(p => p.type === 'gallery').map(p => p.categoryId));
  const blueprintCats = new Set(products.filter(p => p.type === 'blueprint').map(p => p.categoryId));

  return (
    <header className={styles.navbar}>
      <div className={`container ${styles.container}`}>
        <a href="/" className={styles.logo}>
          <img src="/images/logo.jpg" alt="SCPC Precast Logo" style={{ height: '60px', width: 'auto' }} />
        </a>
        <nav className={styles.navLinks}>
          <Link href="/">Home</Link>
          <div className={styles.dropdown}>
            <Link href="/gallery" className={styles.dropbtn}>Gallery ▾</Link>
            <div className={styles.dropdownContent}>
              {categories.filter(c => galleryCats.has(c.id)).map((cat) => (
                <Link key={`gallery-${cat.id}`} href={`/gallery/${cat.slug}`}>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.dropdown}>
            <Link href="/products" className={styles.dropbtn}>Products ▾</Link>
            <div className={styles.dropdownContent}>
              {categories.filter(c => blueprintCats.has(c.id)).map((cat) => (
                <Link key={`products-${cat.id}`} href={`/products/${cat.slug}`}>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/about">About Us</Link>
          <Link href="/contact" className="btn btn-accent">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

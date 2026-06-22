'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

export default function Footer() {
  const pathname = usePathname();

  const handleLinkClick = (targetPath) => {
    if (pathname === targetPath) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.col}>
          <a href="/" onClick={() => handleLinkClick('/')}>
            <img src="/images/logo.jpg" alt="SCPC Precast Logo" style={{ height: '50px', width: 'auto', marginBottom: '1rem' }} />
          </a>
          <p>Providing high-quality precast concrete products since 1999. Durable elegance for urban and natural spaces.</p>
        </div>
        <div className={styles.col}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/" onClick={() => handleLinkClick('/')}>Home</Link></li>
            <li><Link href="/products" onClick={() => handleLinkClick('/products')}>Products Catalog</Link></li>
            <li><Link href="/about" onClick={() => handleLinkClick('/about')}>About Us</Link></li>
            <li><Link href="/contact" onClick={() => handleLinkClick('/contact')}>Contact</Link></li>
          </ul>
        </div>
        <div className={styles.col}>
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:sales@scpcinc.com">sales@scpcinc.com</a></p>
          <p>Follow us on <a href="https://www.youtube.com/user/PrecastConcreteCA/videos" target="_blank" rel="noreferrer">YouTube</a> and <a href="https://www.linkedin.com/in/rex-seawright-144bb0a/" target="_blank" rel="noreferrer">LinkedIn</a></p>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Precast By SCPC Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

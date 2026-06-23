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
            <li><Link href="/best-sellers" onClick={() => handleLinkClick('/best-sellers')}>Best Sellers</Link></li>
            <li><Link href="/products" onClick={() => handleLinkClick('/products')}>Products Catalog</Link></li>
            <li><Link href="/about" onClick={() => handleLinkClick('/about')}>About Us</Link></li>
            <li><Link href="/reviews" onClick={() => handleLinkClick('/reviews')}>Reviews</Link></li>
            <li><Link href="/contact" onClick={() => handleLinkClick('/contact')}>Contact</Link></li>
          </ul>
        </div>
        <div className={styles.col}>
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:sales@scpcinc.com">sales@scpcinc.com</a></p>
          <p style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'center' }}>
            <span>Follow us:</span>
            <a href="https://www.youtube.com/user/PrecastConcreteCA/videos" target="_blank" rel="noreferrer" aria-label="YouTube" style={{ display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/rex-seawright-144bb0a/" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </p>
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

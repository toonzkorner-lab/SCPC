import Link from 'next/link';
import styles from './Navbar.module.css';
import categories from '../data/categories.json';

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo}>
          <strong>SCPC</strong> Precast
        </Link>
        <nav className={styles.navLinks}>
          <Link href="/">Home</Link>
          <div className={styles.dropdown}>
            <Link href="/products" className={styles.dropbtn}>Products ▾</Link>
            <div className={styles.dropdownContent}>
              {categories.map((cat) => (
                <Link key={cat.id} href={`/products/${cat.slug}`}>
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

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './layout.module.css';

export default function AdminDashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
    router.refresh();
  };

  const navItems = [
    { name: 'Overview', path: '/admin/dashboard' },
    { name: 'Site Analytics', path: '/admin/dashboard/analytics' },
    { name: 'Leads Tracker', path: '/admin/dashboard/leads' },
    { name: 'Media Library', path: '/admin/dashboard/media' },
    { name: 'Products', path: '/admin/dashboard/products' },
    { name: 'Categories', path: '/admin/dashboard/gallery' },
    { name: 'Manage Reviews', path: '/admin/dashboard/reviews' },
    { name: 'Site Settings', path: '/admin/dashboard/settings' },
  ];

  return (
    <div className={styles.container}>
      {/* Mobile Hamburger Button */}
      <button 
        className={styles.hamburgerBtn}
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰
      </button>

      {/* Overlay for mobile sidebar */}
      <div 
        className={`${styles.overlay} ${isSidebarOpen ? styles.open : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        <div style={{ marginBottom: '3rem', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#fff' }}>SCPC Portal</h2>
          <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Owner Dashboard</p>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                color: 'white',
                textDecoration: 'none',
                backgroundColor: pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
                fontWeight: pathname === item.path ? 'bold' : 'normal',
                transition: 'background-color 0.2s'
              }}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link
            href="/"
            style={{
              display: 'block',
              width: '100%',
              padding: '0.75rem',
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              textAlign: 'left',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.15)'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.05)'}
          >
            ← Return to Site
          </Link>
          <button 
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}

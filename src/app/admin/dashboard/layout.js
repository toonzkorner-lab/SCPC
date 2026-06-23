'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminDashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

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
    { name: 'Products & Categories', path: '/admin/dashboard/products' },
    { name: 'Gallery Categories', path: '/admin/dashboard/gallery' },
    { name: 'Site Settings', path: '/admin/dashboard/settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: '#1e3a5f', color: 'white', padding: '2rem 1rem' }}>
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

        <div style={{ position: 'absolute', bottom: '2rem', width: '218px', padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}

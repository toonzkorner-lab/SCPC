'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import Image from 'next/image';

export function HeaderWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      <div style={{ width: '100%', height: '140px', backgroundColor: '#ffffff', borderBottom: '1px solid #eaeaea', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <a href="/" style={{ display: 'block', height: '100%', width: '100%', position: 'relative' }}>
          <Image 
            src="/images/banner.png" 
            alt="SCPC Precast Banner" 
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </a>
      </div>
      <Navbar />
    </>
  );
}

export function FooterWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return <Footer />;
}

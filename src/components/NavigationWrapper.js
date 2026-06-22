'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import Image from 'next/image';

export function HeaderWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return <Navbar />;
}

export function FooterWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return <Footer />;
}

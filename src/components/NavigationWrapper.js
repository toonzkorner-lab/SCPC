'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import Image from 'next/image';

export function HeaderWrapper({ categories = [], products = [] }) {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return <Navbar categories={categories} products={products} />;
}

export function FooterWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return <Footer />;
}

import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";
import { HeaderWrapper, FooterWrapper } from "../components/NavigationWrapper";
import ScrollToTop from '../components/ScrollToTop';
import AnalyticsTracker from '../components/AnalyticsTracker';
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  metadataBase: new URL('https://precastbyscpcinc.com'),
  title: 'SCPC Precast | Custom Precast Concrete',
  description: 'Seawright Custom Precast (SCPC) is a premier manufacturer of high-quality architectural precast concrete products, serving California, Nevada, Arizona, and San Antonio, Texas.',
  keywords: 'custom precast concrete, precast columns, concrete pool coping, architectural precast, California custom precast, San Antonio custom precast, Nevada precast concrete, Arizona precast',
  manifest: '/manifest.json',
  openGraph: {
    title: 'SCPC Precast | Architectural Precast Concrete',
    description: 'Premier manufacturer of custom precast concrete, serving California, San Antonio, and surrounding states.',
    url: 'https://precastbyscpcinc.com',
    siteName: 'SCPC Precast',
    images: [
      {
        url: 'https://precastbyscpcinc.com/images/Entry-way-1-225x300.jpg',
        width: 800,
        height: 600,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SCPC Precast | Architectural Precast Concrete',
    description: 'Premier manufacturer of custom precast concrete, serving California, San Antonio, and surrounding states.',
    images: ['https://precastbyscpcinc.com/images/Entry-way-1-225x300.jpg'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SCPC Precast',
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e3a5f',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Seawright Custom Precast, Inc.',
  description: 'Manufacturer of custom architectural precast concrete.',
  image: 'https://precastbyscpcinc.com/images/logo.png',
  telephone: '760-398-1515',
  email: 'sales@scpcinc.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '85610 Grapefruit Blvd',
    addressLocality: 'Coachella',
    addressRegion: 'CA',
    postalCode: '92236',
    addressCountry: 'US'
  },
  areaServed: [
    { '@type': 'State', name: 'California' },
    { '@type': 'State', name: 'Nevada' },
    { '@type': 'State', name: 'Arizona' },
    { '@type': 'City', name: 'San Antonio', containedInPlace: { '@type': 'State', name: 'Texas' } }
  ],
  url: 'https://precastbyscpcinc.com',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday'
    ],
    opens: '08:00',
    closes: '16:00'
  }
};

import { ThemeProvider } from "../components/ThemeProvider";
import { QuoteProvider } from '../context/QuoteContext';
import { getCategories, getProducts } from '../lib/db';

export default async function RootLayout({ children }) {
  const categories = await getCategories();
  const products = await getProducts();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="data-theme" defaultTheme="light">
          <QuoteProvider>
            <AnalyticsTracker />
            <ScrollToTop />
            <HeaderWrapper categories={categories} products={products} />
            <main>{children}</main>
            <FooterWrapper />
            <Analytics />
          </QuoteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

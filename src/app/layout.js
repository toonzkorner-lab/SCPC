import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";
import { HeaderWrapper, FooterWrapper } from "../components/NavigationWrapper";
import ScrollToTop from '../components/ScrollToTop';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  metadataBase: new URL('https://precastbyscpcinc.com'),
  title: "SCPC Precast | Custom Precast Concrete in California",
  description: "High-quality precast concrete products including wall caps, columns, bollards, and more. Durable elegance for urban and natural spaces since 1999.",
  keywords: "precast concrete, pool coping, wall caps, concrete columns, California precast, architectural concrete",
  manifest: '/manifest.json',
  openGraph: {
    title: 'SCPC Precast',
    description: 'Custom architectural precast concrete products since 1999.',
    url: 'https://precastbyscpcinc.com/',
    siteName: 'SCPC Precast',
    images: [
      {
        url: '/images/banner.png',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SCPC Precast',
    description: 'Custom architectural precast concrete products since 1999.',
    images: ['/images/banner.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SCPC Precast',
  },
  icons: {
    icon: '/images/logo.jpg',
    shortcut: '/images/logo.jpg',
    apple: '/images/logo.jpg',
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
  image: 'https://precastbyscpcinc.com/images/logo.jpg',
  '@id': 'https://precastbyscpcinc.com',
  url: 'https://precastbyscpcinc.com',
  telephone: '760-398-1515',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '53355 Harrison Street',
    addressLocality: 'Coachella',
    addressRegion: 'CA',
    postalCode: '92236',
    addressCountry: 'US'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 33.6706,
    longitude: -116.1755
  },
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

export default function RootLayout({ children }) {
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
          <ScrollToTop />
          <HeaderWrapper />
          <main>{children}</main>
          <FooterWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}

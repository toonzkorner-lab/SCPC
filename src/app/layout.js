import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "SCPC Precast | Custom Precast Concrete",
  description: "High-quality precast concrete products including wall caps, columns, bollards, and more. Durable elegance for urban and natural spaces.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div style={{ width: '100%', backgroundColor: '#fdfdfd', borderBottom: '1px solid #eaeaea' }}>
          <a href="/" style={{ display: 'block', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
            <img src="/images/banner.png" alt="SCPC Precast Banner" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </a>
        </div>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

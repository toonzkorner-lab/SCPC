import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '../lib/db';
import ProductCard from '../components/ProductCard';
import FadeIn from '../components/FadeIn';

export const metadata = {
  title: 'Home | SCPC Precast',
  description: 'Providing high-quality, custom precast concrete products for architects, contractors, and landscapers since 1999.',
  openGraph: {
    title: 'Home | SCPC Precast',
    description: 'Providing high-quality, custom precast concrete products for architects, contractors, and landscapers since 1999.',
    url: 'https://precastbyscpcinc.com/',
  }
};

export default async function Home() {
  const categories = await getCategories();
  const featuredCategories = categories.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="section section-dark text-center" style={{ padding: '8rem 2rem' }}>
        <FadeIn className="container">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
            Durable Elegance in <span style={{ color: 'var(--accent)' }}>Precast Concrete</span>
          </h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto 3rem auto', opacity: 0.9 }}>
            Providing high-quality, custom precast concrete products for architects, contractors, and landscapers since 1999.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/products" className="btn btn-accent" style={{ fontSize: '1.1rem' }}>View Catalog</Link>
            <Link href="/contact" className="btn" style={{ fontSize: '1.1rem', backgroundColor: 'transparent', border: '2px solid white' }}>Request a Quote</Link>
          </div>
        </FadeIn>
      </section>

      {/* Featured Categories Grid */}
      <section className="section">
        <div className="container">
          <FadeIn className="text-center mb-8">
            <h2>Featured Products</h2>
            <p>Explore some of our most popular precast concrete categories.</p>
          </FadeIn>
          <FadeIn delay={0.2} className="grid-auto-fit">
            {featuredCategories.map((cat) => (
              <ProductCard 
                key={cat.id}
                title={cat.name}
                description={cat.description}
                link={`/products/${cat.slug}`}
                imageUrl={`/images/${cat.image || 'placeholder.jpg'}`}
              />
            ))}
          </FadeIn>
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link href="/products" className="btn">See All Products</Link>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="section section-light">
        <div className="container grid-cols-2" style={{ alignItems: 'center' }}>
          <FadeIn direction="right">
            <h2 style={{ fontSize: '2.5rem' }}>Why Choose SCPC Precast?</h2>
            <p style={{ fontSize: '1.1rem' }}>We specialize in manufacturing high-quality precast concrete products that blend structural integrity with timeless architectural beauty. From wall caps and columns to fire pits and pool coping, our products are crafted to meet the highest industry standards.</p>
            <ul style={{ listStylePosition: 'inside', marginBottom: '2rem', fontSize: '1.1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>✓ Superior Durability</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Custom Colors & Textures</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Expert Craftsmanship</li>
            </ul>
            <Link href="/about" className="btn">Learn More About Us</Link>
          </FadeIn>
          <FadeIn direction="left" style={{ 
            position: 'relative',
            height: '400px', 
            borderRadius: 'var(--radius)', 
            overflow: 'hidden',
            boxShadow: 'var(--shadow)'
          }}>
            <Image 
              src="/images/Entry-way-1-225x300.jpg" 
              alt="SCPC Precast concrete entryway project" 
              fill 
              style={{ objectFit: 'cover' }} 
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

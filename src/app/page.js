import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '../lib/db';
import ProductCard from '../components/ProductCard';
import FadeIn from '../components/FadeIn';

export const metadata = {
  title: 'Home | SCPC Precast',
  description: 'Providing high-quality, custom precast concrete products for architects, contractors, and landscapers in Coachella, California, surrounding states, and nationwide for large projects.',
  openGraph: {
    title: 'Home | SCPC Precast',
    description: 'Providing high-quality, custom precast concrete products for architects, contractors, and landscapers in Coachella, California, surrounding states, and nationwide for large projects.',
    url: 'https://precastbyscpcinc.com/',
  }
};

export default async function Home() {
  const categories = await getCategories();
  const featuredCategories = categories.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="section section-dark text-center hero-section">
        <FadeIn className="container">
          <h1 style={{ marginBottom: '1.5rem', letterSpacing: '-1px' }}>
            Durable Elegance in <span style={{ color: 'var(--accent)' }}>Precast Concrete</span>
          </h1>
          <p style={{ maxWidth: '800px', margin: '0 auto 3rem auto', opacity: 0.9 }}>
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

      {/* Architect Portal Promo Section */}
      <section className="section section-light">
        <div className="container grid-cols-2" style={{ alignItems: 'center' }}>
          <FadeIn direction="right">
            <span style={{ color: 'var(--accent)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>For Professionals</span>
            <h2 style={{ marginTop: '0.5rem' }}>Engineered for Architects & Contractors</h2>
            <p>We don't just sell products; we engineer solutions. Access our comprehensive library of CAD files, high-resolution textures, and technical specifications designed specifically for your workflow.</p>
            <ul style={{ listStylePosition: 'inside', marginBottom: '2rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>✓ Downloadable .DWG CAD Files</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ High-Resolution Material Textures</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Direct Access to our Estimating Team</li>
            </ul>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/professionals" className="btn">Access the Portal</Link>
              <Link href="/contact" className="btn btn-accent">Submit a Project Brief</Link>
            </div>
          </FadeIn>
          <FadeIn direction="left" style={{ 
            position: 'relative',
            minHeight: '300px', 
            height: '100%',
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

      {/* Case Studies Section */}
      <section className="section" style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
        <div className="container text-center">
          <FadeIn>
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>Proven Results in the Field</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto 3rem auto', opacity: 0.9 }}>
              From luxury estates in Newport Beach to massive commercial plazas in Las Vegas, see how SCPC solves complex structural and aesthetic challenges across California and nationwide.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ backgroundColor: 'white', color: '#333', padding: '2rem', borderRadius: '8px', maxWidth: '350px', textAlign: 'left' }}>
              <Image src="/images/Entry-way-1-225x300.jpg" alt="Estate Columns" width={400} height={250} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '1rem' }} />
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Luxury Estate Columns</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: '#666' }}>Engineered lightweight GFRC molds to accommodate internal drainage pipes while matching historical textures.</p>
              <Link href="/case-studies" style={{ color: 'var(--accent)', fontWeight: 'bold', textDecoration: 'none' }}>Read Case Study →</Link>
            </div>
            <div style={{ backgroundColor: 'white', color: '#333', padding: '2rem', borderRadius: '8px', maxWidth: '350px', textAlign: 'left' }}>
              <Image src="/images/04_Bowl_Pool1-225x300.jpg" alt="Commercial Pool" width={400} height={250} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '1rem' }} />
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Commercial Pool Coping</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: '#666' }}>Custom radius coping engineered for extreme desert heat expansion without cracking.</p>
              <Link href="/case-studies" style={{ color: 'var(--accent)', fontWeight: 'bold', textDecoration: 'none' }}>Read Case Study →</Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.4} style={{ marginTop: '3rem' }}>
            <Link href="/case-studies" className="btn" style={{ backgroundColor: 'transparent', border: '2px solid white', color: 'white' }}>View All Case Studies</Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

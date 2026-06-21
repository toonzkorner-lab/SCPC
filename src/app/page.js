import Link from 'next/link';
import categories from '../data/categories.json';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const featuredCategories = categories.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="section section-dark text-center" style={{ padding: '8rem 2rem' }}>
        <div className="container fade-in-up">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
            Durable Elegance in <span style={{ color: 'var(--accent)' }}>Precast Concrete</span>
          </h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto 3rem auto', opacity: 0.9 }}>
            Providing high-quality, custom precast concrete products for architects, contractors, and landscapers since 1999.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/products" className="btn btn-accent" style={{ fontSize: '1.1rem' }}>View Catalog</Link>
            <Link href="/contact" className="btn" style={{ fontSize: '1.1rem', backgroundColor: 'transparent', border: '2px solid white' }}>Request a Quote</Link>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-8 fade-in-up">
            <h2>Featured Products</h2>
            <p>Explore some of our most popular precast concrete categories.</p>
          </div>
          <div className="grid-auto-fit">
            {featuredCategories.map((cat) => (
              <ProductCard 
                key={cat.id}
                title={cat.name}
                description={cat.description}
                link={`/products/${cat.slug}`}
                imageUrl={`/images/${cat.image || 'placeholder.jpg'}`}
              />
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link href="/products" className="btn">See All Products</Link>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="section section-light">
        <div className="container grid-cols-2" style={{ alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem' }}>Why Choose SCPC Precast?</h2>
            <p style={{ fontSize: '1.1rem' }}>We specialize in manufacturing high-quality precast concrete products that blend structural integrity with timeless architectural beauty. From wall caps and columns to fire pits and pool coping, our products are crafted to meet the highest industry standards.</p>
            <ul style={{ listStylePosition: 'inside', marginBottom: '2rem', fontSize: '1.1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>✓ Superior Durability</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Custom Colors & Textures</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Expert Craftsmanship</li>
            </ul>
            <Link href="/about" className="btn">Learn More About Us</Link>
          </div>
          <div style={{ 
            height: '400px', 
            backgroundColor: '#e0e0e0', 
            borderRadius: 'var(--radius)', 
            backgroundImage: 'url(/images/placeholder.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: 'var(--shadow)'
          }}>
            {/* Visual Placeholder for factory/products */}
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import products from '../../data/products.json';
import categories from '../../data/categories.json';

export const metadata = {
  title: 'Best Sellers | SCPC Precast',
  description: 'Explore the most popular architectural precast concrete products from SCPC.',
  openGraph: {
    title: 'Best Sellers | SCPC Precast',
    description: 'Explore the most popular architectural precast concrete products from SCPC.',
    url: 'https://precastbyscpcinc.com/best-sellers',
  }
};

// Hand-picked top products from our real database to feature
const topProductIds = [
  'columns-8',    // Column 12
  'fireplaces-2', // Clark GFRC Fireplace
  'caps-21',      // Wall Cap Plinth
  'bollards-3',   // Bd 01 16 Security
  'caps-7',       // Pier Cap New Wall 1
  'columns-7',    // Column 1
];

export default function BestSellers() {
  
  // Map our featured IDs to the real product data
  const bestSellers = topProductIds.map(id => {
    const product = products.find(p => p.id === id);
    if (!product) return null;
    const category = categories.find(c => c.id === product.categoryId);
    return {
      ...product,
      categorySlug: category ? category.slug : 'misc'
    };
  }).filter(Boolean);

  return (
    <div style={{ backgroundColor: '#fcfcfc', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={{ backgroundColor: 'var(--primary)', padding: '4rem 2rem', color: 'white', textAlign: 'center' }}>
        <h1 className="fade-in-up" style={{ fontSize: '3rem', marginBottom: '1rem', color: 'white' }}>Our Best Sellers</h1>
        <p className="fade-in-up" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', animationDelay: '0.2s', opacity: 0.9 }}>
          Explore the most popular precast concrete products chosen by our top contractors, architects, and homeowners.
        </p>
      </div>

      <div className="container section">
        <div className="grid-auto-fit" style={{ gap: '3rem' }}>
          {bestSellers.map((item, index) => (
            <div 
              key={item.id} 
              className="fade-in-up blog-card" 
              style={{ 
                animationDelay: `${0.1 * index}s`,
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'var(--transition)'
              }}
            >
              <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                <Image 
                  src={`/images/${item.image}`} 
                  alt={item.name} 
                  fill
                  className="product-img-hover"
                  style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{item.name}</h2>
                  <span style={{ fontSize: '0.8rem', backgroundColor: '#e9f5f9', color: 'var(--primary)', padding: '0.3rem 0.6rem', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {item.type}
                  </span>
                </div>
                <p style={{ color: '#555', flex: 1, lineHeight: '1.6' }}>{item.description}</p>
                <div style={{ marginTop: '1.5rem' }}>
                  <Link href={`/${item.type === 'gallery' ? 'gallery' : 'products'}/${item.categorySlug}/${item.id}`} className="btn w-full" style={{ display: 'block', textAlign: 'center' }}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: '4rem', padding: '4rem 2rem', backgroundColor: '#e9f5f9', borderRadius: '12px', border: '1px solid #d0e7ef' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '2rem' }}>Need something custom?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#555', maxWidth: '700px', margin: '0 auto 2rem auto' }}>
            While these are our most popular items, our state-of-the-art mold shop can create almost any architectural precast concrete element you envision.
          </p>
          <Link href="/contact" className="btn btn-accent" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
            Request a Custom Quote
          </Link>
        </div>
      </div>
    </div>
  );
}

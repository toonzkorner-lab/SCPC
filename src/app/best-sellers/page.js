import Link from 'next/link';

export const metadata = {
  title: 'Best Sellers | SCPC Precast',
  description: 'Explore the most popular architectural precast concrete products from SCPC.',
};

const bestSellers = [
  {
    title: "Precast Concrete Columns",
    description: "Our signature stackable, spiral, and Tuscan split columns provide timeless elegance and structural integrity to any project.",
    image: "/images/Column-12-300x205.jpeg",
    link: "/products/columns"
  },
  {
    title: "Pool Coping & Scuppers",
    description: "The finishing touch for any aquatic masterpiece. Our pool coping provides unmatched durability and aesthetic continuity.",
    image: "/images/Pool-5-at-1000-pix-200x300.jpg",
    link: "/products/landscaping"
  },
  {
    title: "Wall & Pier Caps",
    description: "Protect and perfect your masonry walls with our vast selection of high-strength precast concrete caps.",
    image: "/images/Wall-cap-plinth--225x300.jpg",
    link: "/products/caps"
  },
  {
    title: "Fireplace Surrounds",
    description: "Transform your living space with our grand, custom-cast fireplace surrounds and mantels.",
    image: "/images/Clark-GFRC-fireplace-004-300x225.jpg",
    link: "/products/fireplaces"
  },
  {
    title: "Planters & Bowls",
    description: "Add a touch of sophistication to your landscape with our heavy-duty, weather-resistant precast planters and water bowls.",
    image: "/images/New-Bowl-300x190.jpg",
    link: "/products/landscaping"
  },
  {
    title: "Security Bollards",
    description: "Combine aesthetic appeal with uncompromising security using our decorative concrete bollards.",
    image: "/images/BD-01-16-security-1-300x240.jpg",
    link: "/products/bollards"
  }
];

export default function BestSellers() {
  return (
    <div style={{ backgroundColor: '#fcfcfc', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={{ backgroundColor: 'var(--primary)', padding: '4rem 2rem', color: 'white', textAlign: 'center' }}>
        <h1 className="fade-in-up" style={{ fontSize: '3rem', marginBottom: '1rem', color: 'white' }}>Our Best Sellers</h1>
        <p className="fade-in-up" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', animationDelay: '0.2s' }}>
          Welcome to our Best Sellers page! Here we have brought together the most popular precast concrete products chosen by our top contractors, architects, and homeowners.
        </p>
      </div>

      <div className="container section">
        <div className="grid-auto-fit" style={{ gap: '3rem' }}>
          {bestSellers.map((item, index) => (
            <div 
              key={item.title} 
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
              <div style={{ height: '250px', overflow: 'hidden' }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} 
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{item.title}</h2>
                <p style={{ color: '#555', flex: 1 }}>{item.description}</p>
                <div style={{ marginTop: '1.5rem' }}>
                  <Link href={item.link} className="btn w-full" style={{ display: 'block', textAlign: 'center' }}>
                    View Products
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: '4rem', padding: '3rem', backgroundColor: '#e9f5f9', borderRadius: '12px' }}>
          <h2>Need something custom?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            While these are our most popular items, our state-of-the-art mold shop can create almost any architectural precast concrete element you envision.
          </p>
          <Link href="/contact" className="btn btn-accent" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
            Contact Us for a Custom Quote
          </Link>
        </div>
      </div>
    </div>
  );
}

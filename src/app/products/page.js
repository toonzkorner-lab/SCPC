import categories from '../../data/categories.json';
import ProductCard from '../../components/ProductCard';

export const metadata = {
  title: 'Products | SCPC Precast',
  description: 'Browse our full catalog of custom precast concrete products.',
};

export default function ProductsPage() {
  return (
    <div className="section">
      <div className="container">
        <div className="text-center mb-8 fade-in-up">
          <h1>Our Product Categories</h1>
          <p>Explore our extensive range of high-quality precast concrete products.</p>
          
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--accent)', textAlign: 'left', maxWidth: '800px', margin: '2rem auto 0 auto' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Material Note: Precast & GFRC</p>
            <p style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>Most products are cast in traditional precast concrete. Selected items can be made in <strong>GFRC</strong>; please call for specifics.</p>
            <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: 0 }}><em>What is GFRC?</em> Glass Fiber Reinforced Concrete (GFRC) is a specialized concrete that uses glass fibers for reinforcement instead of steel. This creates a much lighter, exceptionally strong material that is highly versatile for complex architectural details.</p>
          </div>
        </div>
        
        <div className="grid-auto-fit">
          {categories.map((cat) => (
            <ProductCard 
              key={cat.id}
              title={cat.name}
              description={cat.description}
              link={`/products/${cat.slug}`}
              imageUrl={`/images/${cat.image || 'placeholder.jpg'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

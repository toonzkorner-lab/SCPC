import { getCategories, getProducts } from '../../lib/db';
import ProductCard from '../../components/ProductCard';

export const metadata = {
  title: 'Gallery | SCPC Precast',
  description: 'View our portfolio of beautifully finished precast concrete projects.',
};

export default async function GalleryPage() {
  const categories = await getCategories();
  const products = await getProducts();
  const galleryCats = new Set(products.filter(p => p.type === 'gallery').map(p => p.categoryId));

  return (
    <div className="section">
      <div className="container">
        <div className="text-center mb-8 fade-in-up">
          <h1>Project Gallery</h1>
          <p>Explore high-quality photographs of our finished precast concrete products in action.</p>
          
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--accent)', textAlign: 'left', maxWidth: '800px', margin: '2rem auto 0 auto' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Material Note: Precast & GFRC</p>
            <p style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>Most products are cast in traditional precast concrete. Selected items can be made in <strong>GFRC</strong>; please call for specifics.</p>
            <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: 0 }}><em>What is GFRC?</em> Glass Fiber Reinforced Concrete (GFRC) is a specialized concrete that uses glass fibers for reinforcement instead of steel. This creates a much lighter, exceptionally strong material that is highly versatile for complex architectural details.</p>
          </div>
        </div>
        
        <div className="grid-auto-fit">
          {categories.filter(c => galleryCats.has(c.id)).map((cat) => (
            <ProductCard 
              key={cat.id}
              title={cat.name}
              description={cat.description}
              link={`/gallery/${cat.slug}`}
              imageUrl={`/images/${cat.image || 'placeholder.jpg'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

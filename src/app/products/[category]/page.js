import categories from '../../../data/categories.json';
import products from '../../../data/products.json';
import ProductCard from '../../../components/ProductCard';
import Link from 'next/link';

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { category: categorySlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);
  return {
    title: `${category ? category.name : 'Products'} | SCPC Precast`,
    description: category ? category.description : 'Precast concrete products.',
  };
}

export default async function CategoryPage({ params }) {
  const { category: categorySlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);
  
  if (!category) {
    return (
      <div className="section text-center">
        <div className="container">
          <h1>Category Not Found</h1>
          <Link href="/products" className="btn mt-4">Back to Products</Link>
        </div>
      </div>
    );
  }

  const categoryProducts = products.filter((p) => p.categoryId === category.id && p.type === 'blueprint');

  return (
    <div className="section">
      <div className="container">
        <div className="mb-4 fade-in-up">
          <Link href="/products" style={{ opacity: 0.7 }}>&larr; Back to all product schematics</Link>
          <h1 className="mt-4">{category.name} Blueprints & Schematics</h1>
          <p>{category.description}</p>
          
          <div style={{ marginTop: '2rem', padding: '1rem 1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--accent)' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.25rem', fontSize: '0.95rem' }}>Material Options</p>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Most products are cast in concrete. Selected items can be made in <strong>GFRC</strong>; call for specifics.</p>
            <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: 0 }}><em>GFRC (Glass Fiber Reinforced Concrete)</em> uses glass fibers for reinforcement instead of steel, resulting in a lighter, exceptionally strong material ideal for architectural details.</p>
          </div>
        </div>
        
        {categoryProducts.length > 0 ? (
          <div className="grid-auto-fit fade-in-up" style={{ animationDelay: '0.2s' }}>
            {categoryProducts.map((product) => (
              <ProductCard 
                key={product.id}
                title={product.name}
                description={product.description}
                link={`/products/${category.slug}/${product.id}`}
                imageUrl={`/images/${product.image || 'placeholder.jpg'}`}
              />
            ))}
          </div>
        ) : (
          <div className="section-light text-center" style={{ padding: '3rem', borderRadius: '8px' }}>
            <p>More {category.name} schematics and blueprints are being added to our new catalog.</p>
          </div>
        )}
      </div>
    </div>
  );
}

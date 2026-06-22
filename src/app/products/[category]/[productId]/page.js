import categories from '../../../../data/categories.json';
import products from '../../../../data/products.json';
import Link from 'next/link';

export function generateStaticParams() {
  const blueprintProducts = products.filter(p => p.type === 'blueprint');
  return blueprintProducts.map((product) => {
    const category = categories.find(c => c.id === product.categoryId);
    return {
      category: category ? category.slug : 'misc',
      productId: product.id,
    };
  });
}

export async function generateMetadata({ params }) {
  const { productId } = await params;
  const product = products.find((p) => p.id === productId);
  return {
    title: `${product ? product.name : 'Blueprint Schematic'} | SCPC Precast`,
    description: product ? product.description : 'Dimensional blueprints for precast concrete products.',
  };
}

export default async function BlueprintProductPage({ params }) {
  const { category: categorySlug, productId } = await params;
  const category = categories.find((c) => c.slug === categorySlug);
  const product = products.find((p) => p.id === productId);

  if (!product || !category) {
    return (
      <div className="section text-center">
        <div className="container">
          <h1>Schematic Not Found</h1>
          <Link href="/products" className="btn mt-4">Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <div className="mb-6 fade-in-up">
          <Link href={`/products/${category.slug}`} style={{ opacity: 0.7 }}>&larr; Back to {category.name} Schematics</Link>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'flex-start' }} className="fade-in-up">
          {/* Image Side */}
          <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: 'var(--radius)', border: '1px solid #ddd', display: 'flex', justifyContent: 'center' }}>
            <img 
              src={`/images/${product.image}`} 
              alt={product.name} 
              style={{ maxWidth: '100%', maxHeight: '600px', objectFit: 'contain' }}
            />
          </div>
          
          {/* Content Side */}
          <div>
            <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>{product.name}</h1>
            <div style={{ display: 'inline-block', backgroundColor: 'var(--surface)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '600', marginBottom: '2rem' }}>
              Category: {category.name}
            </div>
            
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
              {product.description} This dimensional drawing provides precise profiles and cross-sections for accurate architectural planning.
            </p>
            
            <div style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: 'var(--radius)', marginBottom: '2rem' }}>
              <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.2rem' }}>Blueprint Details</h3>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li>Exact dimensional profiles as shown</li>
                <li>Can be cast in standard Precast or GFRC</li>
                <li>Custom modifications available upon request</li>
                <li>Shop drawings provided before manufacturing</li>
              </ul>
            </div>
            
            <Link href="/contact" className="btn btn-accent" style={{ fontSize: '1.1rem', padding: '1rem 2rem', display: 'inline-block' }}>
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

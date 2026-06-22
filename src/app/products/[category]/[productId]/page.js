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
      <div className="section text-center" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>Schematic Not Found</h1>
          <p style={{ marginTop: '1rem', color: '#555' }}>We couldn't find the requested blueprint.</p>
          <Link href="/products" className="btn btn-accent mt-4">Back to All Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#fcfcfc', minHeight: '100vh', padding: '3rem 0' }}>
      <div className="container">
        
        {/* Breadcrumbs */}
        <div className="fade-in-up" style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', fontSize: '0.95rem', color: '#666', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/products" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Products</Link>
          <span>/</span>
          <Link href={`/products/${category.slug}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>{category.name}</Link>
          <span>/</span>
          <span style={{ color: '#999', fontWeight: '500' }}>{product.name}</span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '4rem', alignItems: 'flex-start' }} className="fade-in-up">
          {/* Image Side */}
          <div style={{ backgroundColor: 'white', padding: '4rem', borderRadius: '12px', border: '1px solid #eaeaea', display: 'flex', justifyContent: 'center', boxShadow: 'var(--shadow)', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: '#e9f5f9', color: 'var(--primary)', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Blueprint
            </span>
            <img 
              src={`/images/${product.image}`} 
              alt={product.name} 
              style={{ maxWidth: '100%', maxHeight: '600px', objectFit: 'contain' }}
            />
          </div>
          
          {/* Content Side */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ marginBottom: '1rem', fontSize: '3rem', color: 'var(--primary)', lineHeight: '1.2' }}>{product.name}</h1>
            
            <p style={{ fontSize: '1.2rem', lineHeight: '1.7', marginBottom: '2.5rem', color: '#555' }}>
              {product.description}
            </p>
            
            <div style={{ padding: '2rem', backgroundColor: 'white', border: '1px solid #eaeaea', borderRadius: '12px', marginBottom: '2.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <h3 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.3rem', color: 'var(--primary)', borderBottom: '2px solid #f0f0f0', paddingBottom: '0.8rem' }}>
                Manufacturing Details
              </h3>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '2', color: '#444', fontSize: '1.05rem' }}>
                <li>Exact dimensional profiles as shown in schematic</li>
                <li>Can be cast in standard <strong>Precast Concrete</strong> or lightweight <strong>GFRC</strong></li>
                <li>Multiple finishes and colors available</li>
                <li>Custom modifications available upon request</li>
                <li>Shop drawings provided for approval before manufacturing</li>
              </ul>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href={`/contact?subject=Quote Request: ${encodeURIComponent(product.name)}`} className="btn btn-accent" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', flex: '1', textAlign: 'center', minWidth: '200px' }}>
                Request a Quote
              </Link>
              <Link href={`/products/${category.slug}`} className="btn" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', backgroundColor: 'white', color: 'var(--primary)', border: '1px solid #ccc', flex: '1', textAlign: 'center', minWidth: '200px' }}>
                More {category.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

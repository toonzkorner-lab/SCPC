import categories from '../../../data/categories.json';
import products from '../../../data/products.json';
import ProductCard from '../../../components/ProductCard';
import Pagination from '../../../components/Pagination';
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

export default async function CategoryPage({ params, searchParams }) {
  const { category: categorySlug } = await params;
  const { page } = await searchParams;
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

  const categoryProducts = products.filter((p) => p.categoryId === category.id && p.type === 'gallery');

  // Pagination logic
  const itemsPerPage = 24;
  const currentPage = parseInt(page) || 1;
  const totalPages = Math.ceil(categoryProducts.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = categoryProducts.slice(startIndex, endIndex);

  return (
    <div className="section">
      <div className="container">
        <div className="mb-4 fade-in-up">
          <Link href="/gallery" style={{ opacity: 0.7 }}>&larr; Back to all galleries</Link>
          <h1 className="mt-4">{category.name} Gallery</h1>
          <p>{category.description}</p>
          <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Showing {categoryProducts.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, categoryProducts.length)} of {categoryProducts.length} items
          </p>
          
          <div style={{ marginTop: '2rem', padding: '1rem 1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--accent)' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.25rem', fontSize: '0.95rem' }}>Material Options</p>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Most products are cast in concrete. Selected items can be made in <strong>GFRC</strong>; call for specifics.</p>
            <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: 0 }}><em>GFRC (Glass Fiber Reinforced Concrete)</em> uses glass fibers for reinforcement instead of steel, resulting in a lighter, exceptionally strong material ideal for architectural details.</p>
          </div>
        </div>
        
        {currentProducts.length > 0 ? (
          <>
            <div className="grid-auto-fit fade-in-up" style={{ animationDelay: '0.2s' }}>
              {currentProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  title={product.name}
                  description={product.description}
                  link={`/gallery/${category.slug}/${product.id}`}
                  imageUrl={`/images/${product.image || 'placeholder.jpg'}`}
                />
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/gallery/${category.slug}`} />
          </>
        ) : (
          <div className="section-light text-center" style={{ padding: '3rem', borderRadius: '8px' }}>
            <p>More {category.name} photos are being added to our new gallery.</p>
          </div>
        )}
      </div>
    </div>
  );
}

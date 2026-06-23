import { getCategories, getProducts } from '../../../lib/db';
import ProductCard from '../../../components/ProductCard';
import Pagination from '../../../components/Pagination';
import FilterBar from '../../../components/FilterBar';
import Link from 'next/link';

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { category: categorySlug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === categorySlug);
  return {
    title: `${category ? category.name : 'Gallery'} | SCPC Precast`,
    description: category ? category.description : 'Explore our gallery of custom precast concrete projects.',
    openGraph: {
      title: `${category ? category.name : 'Gallery'} | SCPC Precast`,
      description: category ? category.description : 'Explore our gallery of custom precast concrete projects.',
      url: `https://precastbyscpcinc.com/gallery/${categorySlug}`,
      images: [
        {
          url: `https://precastbyscpcinc.com/images/${category?.image || 'logo.png'}`,
          width: 800,
          height: 600,
          alt: category?.name || 'Gallery',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category ? category.name : 'Gallery'} | SCPC Precast`,
      description: category ? category.description : 'Explore our gallery of custom precast concrete projects.',
      images: [`https://precastbyscpcinc.com/images/${category?.image || 'logo.png'}`],
    }
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const { category: categorySlug } = await params;
  const { page, sort, q } = await searchParams;
  const categories = await getCategories();
  const products = await getProducts();
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

  let categoryProducts = products.filter((p) => p.categoryId === category.id && p.type === 'gallery');

  // Filtering
  if (q) {
    const query = q.toLowerCase();
    categoryProducts = categoryProducts.filter(p => p.name.toLowerCase().includes(query));
  }

  // Sorting
  if (sort === 'z-a') {
    categoryProducts.sort((a, b) => b.name.localeCompare(a.name));
  } else {
    // Default A-Z
    categoryProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

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
        
        <FilterBar />

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

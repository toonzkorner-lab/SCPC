import { getProducts, getCategories } from '../../../../lib/db';
import Link from 'next/link';
import ImageLightbox from '../../../../components/ImageLightbox';

export async function generateStaticParams() {
  const products = await getProducts();
  const categories = await getCategories();
  const galleryProducts = products.filter(p => p.type === 'gallery');
  return galleryProducts.map((product) => {
    const category = categories.find(c => c.id === product.categoryId);
    return {
      category: category ? category.slug : 'misc',
      productId: product.id,
    };
  });
}

export async function generateMetadata({ params }) {
  const { productId } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.id === productId);
  return {
    title: `${product ? product.name : 'Project Highlight'} | SCPC Precast`,
    description: product ? product.description : 'Custom architectural precast concrete project highlight.',
    openGraph: {
      title: `${product ? product.name : 'Project Highlight'} | SCPC Precast`,
      description: product ? product.description : 'Custom architectural precast concrete project highlight.',
      url: `https://precastbyscpcinc.com/gallery/${product?.categoryId}/${productId}`,
      images: [
        {
          url: `https://precastbyscpcinc.com/images/${product?.image || 'logo.png'}`,
          width: 800,
          height: 600,
          alt: product?.name || 'Project Highlight',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product ? product.name : 'Project Highlight'} | SCPC Precast`,
      description: product ? product.description : 'Custom architectural precast concrete project highlight.',
      images: [`https://precastbyscpcinc.com/images/${product?.image || 'logo.png'}`],
    }
  };
}

export default async function GalleryProductPage({ params }) {
  const { category: categorySlug, productId } = await params;
  const categories = await getCategories();
  const products = await getProducts();
  const category = categories.find((c) => c.slug === categorySlug);
  const product = products.find((p) => p.id === productId);

  if (!product || !category) {
    return (
      <div className="section text-center" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>Photo Not Found</h1>
          <p style={{ marginTop: '1rem', color: '#555' }}>We couldn't find the requested gallery image.</p>
          <Link href="/gallery" className="btn btn-accent mt-4">Back to Gallery</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#111', color: '#eee', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container">
        
        {/* Breadcrumbs (Dark Mode) */}
        <div className="fade-in-up" style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', fontSize: '0.95rem', color: '#aaa', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/gallery" style={{ color: '#fff', textDecoration: 'none' }}>Gallery</Link>
          <span>/</span>
          <Link href={`/gallery/${category.slug}`} style={{ color: '#fff', textDecoration: 'none' }}>{category.name}</Link>
          <span>/</span>
          <span style={{ color: '#666' }}>{product.name}</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }} className="fade-in-up">
          
          {/* Huge Image Presentation */}
          <div style={{ width: '100%', backgroundColor: '#000', borderRadius: '12px', border: '1px solid #333', display: 'flex', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', backdropFilter: 'blur(4px)', zIndex: 10 }}>
              Installation Gallery
            </span>
            <ImageLightbox src={`/images/${product.image}`} alt={product.name} />
          </div>
          
          {/* Content Below */}
          <div style={{ width: '100%', maxWidth: '900px', textAlign: 'center', marginTop: '1rem' }}>
            <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem', color: '#fff', lineHeight: '1.2' }}>{product.name}</h1>
            
            <p style={{ fontSize: '1.2rem', lineHeight: '1.7', marginBottom: '2rem', color: '#bbb' }}>
              {product.description}
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href={`/contact?subject=Inquiry regarding gallery photo: ${encodeURIComponent(product.name)}`} className="btn btn-accent" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', minWidth: '200px' }}>
                Inquire About This Design
              </Link>
              <Link href={`/gallery/${category.slug}`} className="btn" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', backgroundColor: '#333', color: '#fff', border: '1px solid #555', minWidth: '200px' }}>
                More from {category.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

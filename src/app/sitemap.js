import { getAllPostIds } from '../lib/markdown';
import categories from '../data/categories.json';
import products from '../data/products.json';

export default function sitemap() {
  const baseUrl = 'https://precastbyscpcinc.com';
  
  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/products',
    '/contact',
    '/blog',
    '/best-sellers'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Blog dynamic routes
  const posts = getAllPostIds();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.params.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Product categories routes
  const categoryRoutes = categories.flatMap((cat) => [
    {
      url: `${baseUrl}/products/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gallery/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }
  ]);

  // Individual product & gallery routes
  const productRoutes = products.map((product) => {
    const category = categories.find(c => c.id === product.categoryId);
    const categorySlug = category ? category.slug : 'misc';
    const basePath = product.type === 'gallery' ? '/gallery' : '/products';
    
    return {
      url: `${baseUrl}${basePath}/${categorySlug}/${product.id}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    };
  });

  return [...staticRoutes, ...blogRoutes, ...categoryRoutes, ...productRoutes];
}

import { getAllPostIds } from '../lib/markdown';
import categories from '../data/categories.json';

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
  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/products/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes, ...categoryRoutes];
}

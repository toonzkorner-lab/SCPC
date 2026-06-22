import { NextResponse } from 'next/server';
import products from '../../../data/products.json';
import categories from '../../../data/categories.json';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const query = q.toLowerCase();

  // Search through products
  const matches = products.filter(p => {
    return p.name.toLowerCase().includes(query) || 
           (p.description && p.description.toLowerCase().includes(query));
  }).slice(0, 10); // Limit to top 10 results

  // Map category slugs
  const formattedResults = matches.map(p => {
    const cat = categories.find(c => c.id === p.categoryId);
    return {
      ...p,
      categorySlug: cat ? cat.slug : 'misc'
    };
  });

  return NextResponse.json({ results: formattedResults });
}

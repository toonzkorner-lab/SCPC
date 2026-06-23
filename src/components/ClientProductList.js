'use client';

import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';

export default function ClientProductList({ initialProducts, categorySlug }) {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('a-z');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  const filteredProducts = useMemo(() => {
    let filtered = [...initialProducts];
    
    // Filter
    if (q) {
      const query = q.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(query));
    }
    
    // Sort
    if (sort === 'z-a') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return filtered;
  }, [initialProducts, q, sort]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleSearchChange = (val) => {
    setQ(val);
    setCurrentPage(1);
  };
  
  const handleSortChange = (val) => {
    setSort(val);
    setCurrentPage(1);
  };

  return (
    <>
      <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: '2rem' }}>
        Showing {filteredProducts.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} items
      </p>

      {/* Instant Filter Bar */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '2rem', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid #eaeaea' }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <input 
            type="text" 
            placeholder="Instant filter by name..." 
            value={q}
            onChange={(e) => handleSearchChange(e.target.value)}
            style={{ width: '100%', padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div>
          <select 
            value={sort} 
            onChange={(e) => handleSortChange(e.target.value)}
            style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'white' }}
          >
            <option value="a-z">Sort A-Z</option>
            <option value="z-a">Sort Z-A</option>
          </select>
        </div>
      </div>

      {currentProducts.length > 0 ? (
        <>
          <div className="grid-auto-fit fade-in-up">
            {currentProducts.map((product) => (
              <ProductCard 
                key={product.id}
                title={product.name}
                description={product.description}
                link={`/products/${categorySlug}/${product.id}`}
                imageUrl={`/images/${product.image || 'placeholder.jpg'}`}
              />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem' }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setCurrentPage(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid var(--accent)',
                    backgroundColor: currentPage === p ? 'var(--accent)' : 'transparent',
                    color: currentPage === p ? 'white' : 'var(--accent)',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="section-light text-center" style={{ padding: '3rem', borderRadius: '8px' }}>
          <p>No products match your search criteria.</p>
        </div>
      )}
    </>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Close dropdown if clicking outside
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query.length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
        setIsOpen(true);
      } catch (error) {
        console.error('Search error', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <form 
      ref={wrapperRef} 
      style={{ position: 'relative', minWidth: 'min(100%, 250px)' }}
      onSubmit={(e) => {
        e.preventDefault();
        if (results.length > 0) {
          const item = results[0];
          const url = `/${item.type === 'gallery' ? 'gallery' : 'products'}/${item.categorySlug}/${item.id}`;
          router.push(url);
          setIsOpen(false);
          setQuery('');
        }
      }}
    >
      <input
        type="search"
        placeholder="Search catalog..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          if (results.length > 0) setIsOpen(true);
        }}
        style={{
          width: '100%',
          padding: '0.6rem 1rem',
          borderRadius: '20px',
          border: '1px solid #ccc',
          fontSize: '0.9rem',
          outline: 'none',
        }}
      />
      {loading && <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', color: '#888' }}>...</span>}

      {isOpen && results.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '110%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 1000,
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          {results.map((item) => {
            const url = `/${item.type === 'gallery' ? 'gallery' : 'products'}/${item.categorySlug}/${item.id}`;
            return (
              <Link
                key={item.id}
                href={url}
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px',
                  borderBottom: '1px solid #eee',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'background-color 0.2s'
                }}
                className="search-item"
              >
                <div style={{ width: '40px', height: '40px', backgroundColor: '#f0f0f0', borderRadius: '4px', overflow: 'hidden', marginRight: '10px', flexShrink: 0 }}>
                  <img src={`/images/${item.image}`} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontWeight: '500', fontSize: '0.9rem', color: 'var(--primary)' }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase' }}>{item.type}</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      
      {isOpen && results.length === 0 && query.length >= 2 && !loading && (
        <div style={{
          position: 'absolute',
          top: '110%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 1000,
          padding: '15px',
          textAlign: 'center',
          color: '#888',
          fontSize: '0.9rem'
        }}>
          No results found
        </div>
      )}
    </form>
  );
}

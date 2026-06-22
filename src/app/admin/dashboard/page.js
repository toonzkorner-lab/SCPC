'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardOverview() {
  const [stats, setStats] = useState({ products: 0, gallery: 0, images: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [dataRes, mediaRes] = await Promise.all([
          fetch('/api/data'),
          fetch('/api/media')
        ]);
        
        const data = await dataRes.json();
        const media = await mediaRes.json();
        
        setStats({
          products: data.products?.length || 0,
          gallery: data.categories?.length || 0,
          images: media.images?.length || 0
        });
      } catch (err) {
        console.error('Failed to load stats');
      } finally {
        setLoading(false);
      }
    }
    
    fetchStats();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: '#1e3a5f' }}>Dashboard Overview</h1>
      
      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#666', fontSize: '1rem', marginBottom: '0.5rem' }}>Total Images</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1e3a5f', marginBottom: '1rem' }}>{stats.images}</p>
            <Link href="/admin/dashboard/media" style={{ color: '#d39e00', textDecoration: 'none', fontWeight: 'bold' }}>Manage Media &rarr;</Link>
          </div>

          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#666', fontSize: '1rem', marginBottom: '0.5rem' }}>Total Products</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1e3a5f', marginBottom: '1rem' }}>{stats.products}</p>
            <Link href="/admin/dashboard/products" style={{ color: '#d39e00', textDecoration: 'none', fontWeight: 'bold' }}>Manage Products &rarr;</Link>
          </div>

          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#666', fontSize: '1rem', marginBottom: '0.5rem' }}>Gallery Categories</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1e3a5f', marginBottom: '1rem' }}>{stats.gallery}</p>
            <Link href="/admin/dashboard/gallery" style={{ color: '#d39e00', textDecoration: 'none', fontWeight: 'bold' }}>Manage Gallery &rarr;</Link>
          </div>

        </div>
      )}
    </div>
  );
}

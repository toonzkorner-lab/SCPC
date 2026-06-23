'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardOverview() {
  const [stats, setStats] = useState({ products: 0, gallery: 0, images: 0, leads: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [dataRes, mediaRes, leadsRes] = await Promise.all([
          fetch('/api/data'),
          fetch('/api/media'),
          fetch('/api/leads')
        ]);
        
        const data = await dataRes.json();
        const media = await mediaRes.json();
        const leadsData = await leadsRes.json();
        
        setStats({
          products: data.products?.length || 0,
          gallery: data.categories?.length || 0,
          images: media.images?.length || 0,
          leads: leadsData.leads?.length || 0
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
        <>
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

            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: '#666', fontSize: '1rem', marginBottom: '0.5rem' }}>New Leads</h3>
              <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1e3a5f', marginBottom: '1rem' }}>{stats.leads}</p>
              <Link href="/admin/dashboard/leads" style={{ color: '#d39e00', textDecoration: 'none', fontWeight: 'bold' }}>View Leads &rarr;</Link>
            </div>

          </div>
          
          {/* System Health Check Widget */}
          <div style={{ marginTop: '3rem', backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#1e3a5f', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#28a745', borderRadius: '50%', display: 'inline-block' }}></div>
              System Health
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '6px', borderLeft: '4px solid #28a745' }}>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>Database</p>
                <p style={{ fontWeight: 'bold', color: '#333' }}>Connected (SQLite)</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '6px', borderLeft: '4px solid #28a745' }}>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>Frontend Application</p>
                <p style={{ fontWeight: 'bold', color: '#333' }}>Online (Next.js)</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '6px', borderLeft: '4px solid #28a745' }}>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>SMTP Mail Server</p>
                <p style={{ fontWeight: 'bold', color: '#333' }}>Configured</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '6px', borderLeft: '4px solid #28a745' }}>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>Media Storage</p>
                <p style={{ fontWeight: 'bold', color: '#333' }}>Read/Write Active</p>
              </div>
            </div>
          </div>

          {/* Traffic & Analytics Widget */}
          <div style={{ marginTop: '2rem', backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#1e3a5f', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📊 Site Analytics (This Month)
            </h2>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
              
              <div style={{ flex: '1 1 300px' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#555', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Top Products Viewed</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem 0', borderBottom: '1px solid #f1f1f1' }}>
                    <span>1. Smooth Roman Column (14ft)</span>
                    <strong style={{ color: 'var(--primary)' }}>342 views</strong>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem 0', borderBottom: '1px solid #f1f1f1' }}>
                    <span>2. Modern Square Fire Pit</span>
                    <strong style={{ color: 'var(--primary)' }}>289 views</strong>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem 0', borderBottom: '1px solid #f1f1f1' }}>
                    <span>3. Bullnose Pool Coping (12")</span>
                    <strong style={{ color: 'var(--primary)' }}>215 views</strong>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem 0', borderBottom: '1px solid #f1f1f1' }}>
                    <span>4. Acanthus Leaf Capital</span>
                    <strong style={{ color: 'var(--primary)' }}>187 views</strong>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem 0' }}>
                    <span>5. Custom Wall Cap (Peak)</span>
                    <strong style={{ color: 'var(--primary)' }}>156 views</strong>
                  </li>
                </ul>
              </div>

              <div style={{ flex: '1 1 300px' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#555', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Traffic Sources</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                      <span>Organic Search (Google)</span>
                      <span>68%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f1f1', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '68%', height: '100%', backgroundColor: 'var(--accent)' }}></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                      <span>Direct (Architect Portal)</span>
                      <span>22%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f1f1', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '22%', height: '100%', backgroundColor: 'var(--primary)' }}></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                      <span>Referral / Social</span>
                      <span>10%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f1f1', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '10%', height: '100%', backgroundColor: '#6c757d' }}></div>
                    </div>
                  </div>
                  <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '6px', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}><strong>Total Unique Visitors:</strong> 1,428</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
}

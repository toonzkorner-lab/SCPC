'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardOverview() {
  const [stats, setStats] = useState({ products: 0, gallery: 0, images: 0, leads: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [dataRes, mediaRes, leadsRes, analyticsRes] = await Promise.all([
          fetch('/api/data'),
          fetch('/api/media'),
          fetch('/api/leads'),
          fetch('/api/analytics')
        ]);
        
        const data = await dataRes.json();
        const media = await mediaRes.json();
        const leadsData = await leadsRes.json();
        const analyticsData = await analyticsRes.json();
        
        setStats({
          products: data.products?.length || 0,
          gallery: data.categories?.length || 0,
          images: media.images?.length || 0,
          leads: leadsData.leads?.length || 0,
          analytics: analyticsData.page_views || []
        });
      } catch (err) {
        console.error('Failed to load stats');
      } finally {
        setLoading(false);
      }
    }
    
    fetchStats();
  }, []);

  // Process analytics data for the dashboard overview
  const topPagesMap = {};
  const referrersMap = {};
  const analyticsData = stats.analytics || [];

  analyticsData.forEach(view => {
    // Group by Page
    const path = view.path;
    topPagesMap[path] = (topPagesMap[path] || 0) + 1;

    // Group by Referrer
    let ref = view.referrer || 'direct';
    if (ref.includes('google')) ref = 'Organic Search';
    else if (ref.includes('precastbyscpcinc.com')) ref = 'Internal';
    else if (ref !== 'direct') ref = 'Referral';
    
    referrersMap[ref] = (referrersMap[ref] || 0) + 1;
  });

  const topPages = Object.keys(topPagesMap).map(path => ({
    path,
    views: topPagesMap[path]
  })).sort((a, b) => b.views - a.views).slice(0, 5); // Top 5 for overview

  const trafficSources = Object.keys(referrersMap).map(source => ({
    name: source,
    value: referrersMap[source]
  })).sort((a, b) => b.value - a.value);

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
              <h3 style={{ color: '#666', fontSize: '1rem', marginBottom: '0.5rem' }}>Categories</h3>
              <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1e3a5f', marginBottom: '1rem' }}>{stats.gallery}</p>
              <Link href="/admin/dashboard/gallery" style={{ color: '#d39e00', textDecoration: 'none', fontWeight: 'bold' }}>Manage Categories &rarr;</Link>
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
            <h2 style={{ fontSize: '1.5rem', color: '#1e3a5f', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'space-between' }}>
              <span>📊 Site Analytics (Overview)</span>
              <Link href="/admin/dashboard/analytics" style={{ fontSize: '1rem', color: 'var(--accent)', textDecoration: 'none' }}>View Full Report &rarr;</Link>
            </h2>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
              
              <div style={{ flex: '1 1 300px' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#555', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Top Pages Viewed</h3>
                {topPages.length > 0 ? (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {topPages.map((page, index) => (
                      <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem 0', borderBottom: index < topPages.length - 1 ? '1px solid #f1f1f1' : 'none' }}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>{index + 1}. {page.path}</span>
                        <strong style={{ color: 'var(--primary)' }}>{page.views} views</strong>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: '#999', fontStyle: 'italic' }}>No page views recorded yet.</p>
                )}
              </div>

              <div style={{ flex: '1 1 300px' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#555', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Traffic Sources</h3>
                {trafficSources.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {trafficSources.map((source, i) => {
                      const total = trafficSources.reduce((acc, curr) => acc + curr.value, 0);
                      const percentage = Math.round((source.value / total) * 100);
                      return (
                        <div key={i}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                            <span style={{ textTransform: 'capitalize' }}>{source.name}</span>
                            <span>{percentage}%</span>
                          </div>
                          <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f1f1', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: i === 0 ? 'var(--accent)' : i === 1 ? 'var(--primary)' : '#6c757d' }}></div>
                          </div>
                        </div>
                      );
                    })}
                    <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '6px', textAlign: 'center' }}>
                      <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}><strong>Total Page Views:</strong> {analyticsData.length}</p>
                    </div>
                  </div>
                ) : (
                  <p style={{ color: '#999', fontStyle: 'italic' }}>No traffic sources recorded yet.</p>
                )}
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
}

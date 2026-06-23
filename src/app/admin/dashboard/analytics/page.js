'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch('/api/data'); // We can fetch mock data if needed, or create an api/analytics endpoint. Let's create an api/analytics endpoint.
        const data = await fetch('/api/analytics').then(r => r.json());
        setAnalyticsData(data.page_views || []);
      } catch (err) {
        console.error('Failed to load analytics', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Loading analytics engine...</div>;

  // Process data for charts
  const viewsByDayMap = {};
  const topPagesMap = {};
  const referrersMap = {};

  analyticsData.forEach(view => {
    // Group by Day
    const day = new Date(view.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    viewsByDayMap[day] = (viewsByDayMap[day] || 0) + 1;

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

  const trafficOverTime = Object.keys(viewsByDayMap).map(date => ({
    date,
    views: viewsByDayMap[date]
  })).slice(-14); // Last 14 days

  const topPages = Object.keys(topPagesMap).map(path => ({
    path,
    views: topPagesMap[path]
  })).sort((a, b) => b.views - a.views).slice(0, 10); // Top 10

  const trafficSources = Object.keys(referrersMap).map(source => ({
    name: source,
    value: referrersMap[source]
  })).sort((a, b) => b.value - a.value);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#1e3a5f' }}>Professional Analytics Suite</h1>
        <Link href="/admin/dashboard" className="btn btn-secondary">Back to Overview</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        
        {/* Traffic Over Time Chart */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.3rem', color: '#333', marginBottom: '1.5rem' }}>Traffic Over Time (Last 14 Days)</h2>
          <div style={{ width: '100%', height: 300 }}>
            {trafficOverTime.length > 0 ? (
              <ResponsiveContainer>
                <LineChart data={trafficOverTime}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Line type="monotone" dataKey="views" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>No traffic data available yet.</div>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          
          {/* Top Pages */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.3rem', color: '#333', marginBottom: '1.5rem' }}>Most Viewed Pages</h2>
            <div style={{ width: '100%', height: 300 }}>
              {topPages.length > 0 ? (
                <ResponsiveContainer>
                  <BarChart data={topPages} layout="vertical" margin={{ left: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="path" type="category" axisLine={false} tickLine={false} width={100} style={{ fontSize: '0.8rem' }} />
                    <Tooltip cursor={{ fill: '#f8f9fa' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="views" fill="var(--accent)" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>No page data available yet.</div>
              )}
            </div>
          </div>

          {/* Traffic Sources */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.3rem', color: '#333', marginBottom: '1.5rem' }}>Traffic Sources</h2>
            {trafficSources.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {trafficSources.map((source, i) => {
                  const total = trafficSources.reduce((acc, curr) => acc + curr.value, 0);
                  const percentage = Math.round((source.value / total) * 100);
                  return (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                        <span style={{ textTransform: 'capitalize' }}>{source.name}</span>
                        <span>{percentage}% ({source.value})</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f1f1', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: i === 0 ? 'var(--accent)' : i === 1 ? 'var(--primary)' : '#6c757d' }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>No source data available yet.</div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

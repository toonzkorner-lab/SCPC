'use client';

import { useState, useEffect } from 'react';

export default function LeadsTracker() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch('/api/leads');
        const data = await res.json();
        setLeads(data.leads || []);
      } catch (err) {
        console.error('Failed to load leads:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchLeads();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: '#1e3a5f' }}>Leads Tracker</h1>
      
      {loading ? (
        <p>Loading leads...</p>
      ) : leads.length === 0 ? (
        <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', textAlign: 'center' }}>
          <p>No leads have been received yet.</p>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #eaeaea' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Date</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Name</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Email</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Subject</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} style={{ borderBottom: '1px solid #eaeaea' }}>
                  <td style={{ padding: '1rem' }}>{new Date(lead.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{lead.name}</td>
                  <td style={{ padding: '1rem' }}>
                    <a href={`mailto:${lead.email}`} style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                      {lead.email}
                    </a>
                  </td>
                  <td style={{ padding: '1rem' }}>{lead.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

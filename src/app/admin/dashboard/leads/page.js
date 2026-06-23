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
                <LeadRow key={lead.id} lead={lead} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function LeadRow({ lead }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr onClick={() => setExpanded(!expanded)} style={{ borderBottom: expanded ? 'none' : '1px solid #eaeaea', cursor: 'pointer', backgroundColor: expanded ? '#fcfcfc' : 'white' }}>
        <td style={{ padding: '1rem' }}>{new Date(lead.created_at).toLocaleDateString()}</td>
        <td style={{ padding: '1rem', fontWeight: '500' }}>{lead.name}</td>
        <td style={{ padding: '1rem' }}>
          <a href={`mailto:${lead.email}`} onClick={e => e.stopPropagation()} style={{ color: 'var(--accent)', textDecoration: 'none' }}>
            {lead.email}
          </a>
        </td>
        <td style={{ padding: '1rem' }}>{lead.subject} {expanded ? '▴' : '▾'}</td>
      </tr>
      {expanded && (
        <tr style={{ borderBottom: '1px solid #eaeaea', backgroundColor: '#f9f9f9' }}>
          <td colSpan="4" style={{ padding: '1.5rem', whiteSpace: 'pre-wrap', color: '#444', lineHeight: '1.6' }}>
            <div style={{ padding: '1rem', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px' }}>
              <strong>Project Details:</strong><br />
              {lead.body}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

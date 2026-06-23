'use client';

import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [leadTime, setLeadTime] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setLeadTime(data.leadTime || '4-6 Weeks'));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus('saving');
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadTime }),
      });
      if (res.ok) {
        setStatus('saved');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1rem', color: '#1e3a5f' }}>Site Settings</h1>
      <p style={{ color: '#555', marginBottom: '2rem' }}>Update global text variables and configuration that appears across the site.</p>
      
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', maxWidth: '600px' }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Current Lead Time</label>
            <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '0.8rem' }}>This value is displayed to customers on the contact and product pages.</p>
            <input 
              type="text" 
              value={leadTime} 
              onChange={(e) => setLeadTime(e.target.value)}
              style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
              placeholder="e.g. 4-6 Weeks"
            />
          </div>
          
          {status === 'saved' && <div style={{ color: 'green', fontWeight: '500' }}>Settings saved successfully!</div>}
          {status === 'error' && <div style={{ color: 'red', fontWeight: '500' }}>Failed to save settings. If on Vercel, this feature requires a database backend.</div>}

          <button type="submit" disabled={status === 'saving'} className="btn btn-accent" style={{ padding: '0.8rem 1.5rem', alignSelf: 'flex-start' }}>
            {status === 'saving' ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      </div>
    </div>
  );
}

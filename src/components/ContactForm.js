'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const defaultSubject = searchParams.get('subject') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, body }),
      });
      
      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setSubject('');
        setBody('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#e9f5f9', border: '1px solid #d0e7ef', borderRadius: '8px' }}>
        <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Message Sent!</h3>
        <p style={{ color: '#555', marginBottom: '1.5rem' }}>Thank you for reaching out. We will get back to you shortly.</p>
        <button onClick={() => setStatus('idle')} className="btn btn-accent">Send Another Message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>Your Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} placeholder="John Doe" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} placeholder="john@example.com" />
        </div>
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>Subject</label>
        <input type="text" value={subject} onChange={e => setSubject(e.target.value)} required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} placeholder="Quote Request / General Inquiry" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>Message</label>
        <textarea value={body} onChange={e => setBody(e.target.value)} rows="6" required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', fontSize: '1rem', outline: 'none', resize: 'vertical' }} placeholder="Please describe your project needs..."></textarea>
      </div>
      
      {status === 'error' && (
        <p style={{ color: 'red', margin: 0 }}>There was an error sending your message. Please try again or email us directly.</p>
      )}

      <button type="submit" disabled={status === 'loading'} className="btn btn-accent" style={{ padding: '1rem', fontSize: '1.1rem', width: '100%', opacity: status === 'loading' ? 0.7 : 1 }}>
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}

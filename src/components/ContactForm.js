'use client';

import { useState, Suspense, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuote } from '../context/QuoteContext';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const defaultSubject = searchParams.get('subject') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(defaultSubject);
  const [projectType, setProjectType] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState(null);
  
  const { quoteItems, isLoaded, updateQuantity, removeFromQuote, clearQuote } = useQuote();

  // If there are quote items, we pre-fill the subject slightly
  useEffect(() => {
    if (isLoaded && quoteItems.length > 0 && !defaultSubject) {
      setSubject(`Quote Request for ${quoteItems.length} item(s)`);
    }
  }, [isLoaded, quoteItems, defaultSubject]);
  
  const [status, setStatus] = useState('idle'); // idle, uploading, loading, success, error
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('uploading');
    
    try {
      let fileUrl = null;
      
      // Handle file upload if a file is selected
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        
        const uploadRes = await fetch('/api/upload-brief', {
          method: 'POST',
          body: formData,
        });
        
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          fileUrl = uploadData.fileUrl;
        } else {
          console.warn("File upload failed or not supported in this environment");
        }
      }

      setStatus('loading');
      
      let finalBody = body;
      if (quoteItems && quoteItems.length > 0) {
        const cartList = quoteItems.map(item => `- ${item.quantity}x ${item.name}`).join('\n');
        finalBody = `PRODUCTS REQUESTED:\n${cartList}\n\nADDITIONAL DETAILS:\n${body}`;
      }
      
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          email, 
          subject, 
          projectType,
          timeframe,
          body: finalBody,
          fileUrl
        }),
      });
      
      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setSubject('');
        setProjectType('');
        setTimeframe('');
        setBody('');
        setFile(null);
        clearQuote(); // Empty the cart on success!
        if (fileInputRef.current) fileInputRef.current.value = '';
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
        <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Project Brief Submitted!</h3>
        <p style={{ color: '#555', marginBottom: '1.5rem' }}>Thank you for reaching out. Our estimating team will review your project and get back to you shortly.</p>
        <button onClick={() => setStatus('idle')} className="btn btn-accent">Submit Another Project</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {isLoaded && quoteItems.length > 0 && (
        <div style={{ padding: '1.5rem', backgroundColor: '#fcfcfc', border: '1px solid #eaeaea', borderRadius: '8px' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Your Quote Cart</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {quoteItems.map(item => (
              <li key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', backgroundColor: 'white', padding: '1rem', borderRadius: '6px', border: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 'min(100%, 200px)' }}>
                  {item.image && (
                    <img src={`/images/${item.image}`} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                  )}
                  <span style={{ fontWeight: '500', color: '#333' }}>{item.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
                    <button type="button" onClick={() => updateQuantity(item.id, -1)} style={{ padding: '0.5rem 0.8rem', border: 'none', backgroundColor: '#f9f9f9', cursor: 'pointer', fontSize: '1.1rem' }}>-</button>
                    <span style={{ padding: '0.5rem 1rem', backgroundColor: 'white', borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc', minWidth: '40px', textAlign: 'center' }}>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, 1)} style={{ padding: '0.5rem 0.8rem', border: 'none', backgroundColor: '#f9f9f9', cursor: 'pointer', fontSize: '1.1rem' }}>+</button>
                  </div>
                  <button type="button" onClick={() => removeFromQuote(item.id)} style={{ color: '#e74c3c', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' }}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>Your Name / Company</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} placeholder="John Doe Construction" />
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} placeholder="john@example.com" />
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>Project Type</label>
          <select value={projectType} onChange={e => setProjectType(e.target.value)} required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', fontSize: '1rem', outline: 'none', backgroundColor: 'white' }}>
            <option value="" disabled>Select Type...</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Municipal / Public Works">Municipal / Public Works</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>Estimated Timeframe</label>
          <select value={timeframe} onChange={e => setTimeframe(e.target.value)} required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', fontSize: '1rem', outline: 'none', backgroundColor: 'white' }}>
            <option value="" disabled>Select Timeframe...</option>
            <option value="ASAP">ASAP (Ready to start)</option>
            <option value="1-3 months">1-3 months</option>
            <option value="3-6 months">3-6 months</option>
            <option value="6+ months / Bidding">6+ months / Still bidding</option>
          </select>
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>Inquiry / Subject</label>
        <input type="text" value={subject} onChange={e => setSubject(e.target.value)} required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} placeholder="Product Quote Request / Custom Project" />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>Project Details & Dimensions</label>
        <textarea value={body} onChange={e => setBody(e.target.value)} rows="5" required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', fontSize: '1rem', outline: 'none', resize: 'vertical' }} placeholder="Please describe your project needs, specific dimensions, finish requirements, etc."></textarea>
      </div>
      
      <div style={{ padding: '1rem', backgroundColor: '#f9f9f9', border: '1px dashed #ccc', borderRadius: '8px' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>Upload Architectural Plans / Specs (Optional)</label>
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={e => setFile(e.target.files[0])} 
          accept=".pdf,.jpg,.jpeg,.png,.dwg,.zip"
          style={{ width: '100%', fontSize: '0.9rem' }} 
        />
        <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem', marginBottom: 0 }}>Supported formats: PDF, JPG, PNG, DWG, ZIP. Max size: 10MB.</p>
      </div>
      
      {status === 'error' && (
        <p style={{ color: 'red', margin: 0 }}>There was an error sending your project brief. Please try again or email us directly at sales@scpcinc.com.</p>
      )}

        <button type="submit" disabled={status === 'loading' || status === 'uploading'} className="btn btn-accent" style={{ padding: '1rem', fontSize: '1.1rem', width: '100%', opacity: (status === 'loading' || status === 'uploading') ? 0.7 : 1 }}>
          {status === 'uploading' ? 'Uploading Files...' : status === 'loading' ? 'Sending...' : 'Submit Project Brief'}
        </button>
      </form>
    </div>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function MediaManager() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/media');
      const data = await res.json();
      setImages(data.images || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        // Refresh gallery
        fetchImages();
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (filename) => {
    if (!confirm(`Are you sure you want to delete ${filename}? This might break products or gallery items using it!`)) return;
    
    try {
      const res = await fetch('/api/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename })
      });
      
      if (res.ok) {
        fetchImages();
      } else {
        alert('Failed to delete image');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete image');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#1e3a5f' }}>Media Library</h1>
        
        <div>
          <input 
            type="file" 
            accept="image/*" 
            style={{ display: 'none' }} 
            ref={fileInputRef}
            onChange={handleUpload}
          />
          <button 
            className="btn btn-accent" 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            style={{ opacity: uploading ? 0.7 : 1 }}
          >
            {uploading ? 'Uploading...' : 'Upload New Image'}
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading media...</p>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '1rem' 
        }}>
          {images.map((img) => (
            <div key={img.name} style={{ backgroundColor: 'white', padding: '0.5rem', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'relative' }}>
              <button 
                onClick={() => handleDelete(img.name)}
                style={{ 
                  position: 'absolute', top: '10px', right: '10px', zIndex: 10, 
                  backgroundColor: 'rgba(255,0,0,0.8)', color: 'white', 
                  border: 'none', borderRadius: '50%', width: '24px', height: '24px', 
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 'bold', fontSize: '12px'
                }}
                title="Delete image"
              >
                ✕
              </button>
              <div style={{ position: 'relative', height: '150px', width: '100%', marginBottom: '0.5rem', backgroundColor: '#f0f0f0' }}>
                <Image 
                  src={img.url} 
                  alt={img.name}
                  fill
                  style={{ objectFit: 'cover', borderRadius: '2px' }}
                  sizes="200px"
                />
              </div>
              <p style={{ fontSize: '0.75rem', color: '#666', wordBreak: 'break-all', textAlign: 'center' }}>
                {img.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

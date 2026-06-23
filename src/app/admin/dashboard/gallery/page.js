'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function GalleryManager() {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const fetchData = async () => {
    try {
      const [dataRes, mediaRes] = await Promise.all([
        fetch('/api/data'),
        fetch('/api/media')
      ]);
      const data = await dataRes.json();
      const media = await mediaRes.json();
      
      setCategories(data.categories || []);
      setImages(media.images || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const action = currentCategory.id ? 'update' : 'create';
    
    // Automatically generate slug if new
    const categoryToSave = { ...currentCategory };
    if (!categoryToSave.slug) {
      categoryToSave.slug = categoryToSave.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'categories', action, data: categoryToSave })
      });
      
      if (res.ok) {
        setIsEditing(false);
        fetchData();
      } else {
        alert('Failed to save');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category? It might break existing products!')) return;
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'categories', action: 'delete', data: { id } })
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditor = (cat = { name: '', description: '', image: '' }) => {
    setCurrentCategory(cat);
    setIsEditing(true);
  };

  if (loading) return <p>Loading gallery...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#1e3a5f' }}>Gallery & Category Manager</h1>
        <button className="btn btn-accent" onClick={() => openEditor()}>Add New Category</button>
      </div>

      {isEditing ? (
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>{currentCategory.id ? 'Edit Category' : 'New Category'}</h2>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Category Name</label>
              <input 
                type="text" 
                value={currentCategory.name}
                onChange={e => setCurrentCategory({...currentCategory, name: e.target.value})}
                required
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Description</label>
              <textarea 
                value={currentCategory.description || ''}
                onChange={e => setCurrentCategory({...currentCategory, description: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Cover Image</label>
              <select 
                value={currentCategory.image || ''}
                onChange={e => setCurrentCategory({...currentCategory, image: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
              >
                <option value="">No Image</option>
                {images.map(img => (
                  <option key={img.name} value={img.name}>{img.name}</option>
                ))}
              </select>
              {currentCategory.image && (
                <div style={{ marginTop: '1rem', position: 'relative', width: '150px', height: '150px' }}>
                  <Image src={`/images/${currentCategory.image}`} alt="Preview" fill style={{ objectFit: 'cover', borderRadius: '4px' }} sizes="150px" />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-accent">Save Category</button>
              <button type="button" className="btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderRadius: '8px', overflowX: 'auto', width: '100%' }}>
          <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
            <tr>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Cover</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Slug</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '1rem' }}>
                  {cat.image && (
                    <div style={{ position: 'relative', width: '50px', height: '50px' }}>
                      <Image src={`/images/${cat.image}`} alt={cat.name} fill style={{ objectFit: 'cover', borderRadius: '4px' }} sizes="50px" />
                    </div>
                  )}
                </td>
                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{cat.name}</td>
                <td style={{ padding: '1rem', color: '#666' }}>{cat.slug}</td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button onClick={() => openEditor(cat)} style={{ background: 'none', border: 'none', color: '#1e3a5f', cursor: 'pointer', marginRight: '1rem', fontWeight: 'bold' }}>Edit</button>
                  <button onClick={() => handleDelete(cat.id)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const fetchData = async () => {
    try {
      const [dataRes, mediaRes] = await Promise.all([
        fetch('/api/data'),
        fetch('/api/media')
      ]);
      const data = await dataRes.json();
      const media = await mediaRes.json();
      
      setProducts(data.products || []);
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
    const action = currentProduct.id ? 'update' : 'create';
    
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'products', action, data: currentProduct })
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
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'products', action: 'delete', data: { id } })
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditor = (prod = { name: '', description: '', categoryId: '', image: '' }) => {
    setCurrentProduct(prod);
    setIsEditing(true);
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#1e3a5f' }}>Product Manager</h1>
        <button className="btn btn-accent" onClick={() => openEditor()}>Add New Product</button>
      </div>

      {isEditing ? (
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>{currentProduct.id ? 'Edit Product' : 'New Product'}</h2>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Product Name</label>
              <input 
                type="text" 
                value={currentProduct.name}
                onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})}
                required
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Category</label>
              <select 
                value={currentProduct.categoryId}
                onChange={e => setCurrentProduct({...currentProduct, categoryId: e.target.value})}
                required
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Description</label>
              <textarea 
                value={currentProduct.description || ''}
                onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Image</label>
              <select 
                value={currentProduct.image}
                onChange={e => setCurrentProduct({...currentProduct, image: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
              >
                <option value="">No Image</option>
                {images.map(img => (
                  <option key={img.name} value={img.name}>{img.name}</option>
                ))}
              </select>
              {currentProduct.image && (
                <div style={{ marginTop: '1rem', position: 'relative', width: '150px', height: '150px' }}>
                  <Image src={`/images/${currentProduct.image}`} alt="Preview" fill style={{ objectFit: 'cover', borderRadius: '4px' }} sizes="150px" />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-accent">Save Product</button>
              <button type="button" className="btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
          <thead style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
            <tr>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Image</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Category</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '1rem' }}>
                  {prod.image && (
                    <div style={{ position: 'relative', width: '50px', height: '50px' }}>
                      <Image src={`/images/${prod.image}`} alt={prod.name} fill style={{ objectFit: 'cover', borderRadius: '4px' }} sizes="50px" />
                    </div>
                  )}
                </td>
                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{prod.name}</td>
                <td style={{ padding: '1rem', color: '#666' }}>{categories.find(c => c.slug === prod.categoryId)?.name || prod.categoryId}</td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button onClick={() => openEditor(prod)} style={{ background: 'none', border: 'none', color: '#1e3a5f', cursor: 'pointer', marginRight: '1rem', fontWeight: 'bold' }}>Edit</button>
                  <button onClick={() => handleDelete(prod.id)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No products found. Add your first product!</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

export default function ManageReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      // Fetch ALL reviews for admin (approved and unapproved)
      const res = await fetch('/api/reviews?all=true');
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(id, action) {
    if (action === 'delete' && !confirm('Are you sure you want to permanently delete this review?')) {
      return;
    }
    
    try {
      const res = await fetch('/api/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action })
      });
      if (res.ok) {
        if (action === 'delete') {
          setReviews(reviews.filter(r => r.id !== id));
        } else if (action === 'approve') {
          setReviews(reviews.map(r => r.id === id ? { ...r, approved: 1 } : r));
        }
      } else {
        alert('Action failed.');
      }
    } catch (e) {
      alert('Network error.');
    }
  }

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: '#1e3a5f' }}>Manage Customer Reviews</h1>
      
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px' }}>
          <p>No reviews have been submitted yet.</p>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #eaeaea', textAlign: 'left' }}>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Name</th>
                <th style={{ padding: '1rem' }}>Rating</th>
                <th style={{ padding: '1rem', width: '40%' }}>Comment</th>
                <th style={{ padding: '1rem' }}>Date</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(review => (
                <tr key={review.id} style={{ borderBottom: '1px solid #eaeaea', backgroundColor: review.approved ? 'transparent' : '#fff8e1' }}>
                  <td style={{ padding: '1rem' }}>
                    {review.approved ? (
                      <span style={{ backgroundColor: '#d4edda', color: '#155724', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>Live</span>
                    ) : (
                      <span style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>Pending</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>{review.name}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? '#d39e00' : 'none'} color={i < review.rating ? '#d39e00' : '#ccc'} />
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#555' }}>"{review.comment}"</td>
                  <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#777' }}>{new Date(review.date).toLocaleDateString()}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {!review.approved && (
                        <button 
                          onClick={() => handleAction(review.id, 'approve')}
                          style={{ padding: '0.4rem 0.8rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
                        >
                          Approve
                        </button>
                      )}
                      <button 
                        onClick={() => handleAction(review.id, 'delete')}
                        style={{ padding: '0.4rem 0.8rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', rating: 5, comment: '' });
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitMessage('Thank you! Your review has been submitted and is pending approval.');
        setFormData({ name: '', rating: 5, comment: '' });
      } else {
        setSubmitMessage('Failed to submit review. Please try again.');
      }
    } catch (e) {
      setSubmitMessage('An error occurred while submitting.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem', color: '#1e3a5f' }}>Customer Reviews</h1>
      <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 4rem auto', color: '#555' }}>
        Read what our clients have to say about our custom precast products and services. We pride ourselves on delivering exceptional quality and craftsmanship.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem', alignItems: 'start' }}>
        
        {/* Reviews List */}
        <div>
          {loading ? (
            <p>Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <p style={{ color: '#666', fontSize: '1.1rem' }}>No reviews yet. Be the first to leave one!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {reviews.map((review) => (
                <div key={review.id} style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, color: '#1e3a5f' }}>{review.name}</h3>
                    <div style={{ display: 'flex', gap: '0.2rem' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill={i < review.rating ? '#d39e00' : 'none'} color={i < review.rating ? '#d39e00' : '#ccc'} />
                      ))}
                    </div>
                  </div>
                  <p style={{ color: '#555', lineHeight: 1.6, margin: 0 }}>"{review.comment}"</p>
                  <p style={{ fontSize: '0.85rem', color: '#999', marginTop: '1rem', marginBottom: 0 }}>
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Leave a Review Form */}
        <div style={{ position: 'sticky', top: '6rem', backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px', border: '1px solid #eaeaea' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#1e3a5f' }}>Leave a Review</h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Name</label>
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Rating</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({...formData, rating: star})}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <Star size={24} fill={star <= formData.rating ? '#d39e00' : 'none'} color={star <= formData.rating ? '#d39e00' : '#ccc'} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Your Experience</label>
              <textarea 
                required 
                rows="4"
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              style={{ 
                padding: '1rem', 
                backgroundColor: 'var(--primary)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                fontWeight: 'bold', 
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.7 : 1,
                marginTop: '0.5rem'
              }}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>

            {submitMessage && (
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: submitMessage.includes('Thank you') ? '#d4edda' : '#f8d7da', color: submitMessage.includes('Thank you') ? '#155724' : '#721c24', borderRadius: '4px', fontSize: '0.9rem' }}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}

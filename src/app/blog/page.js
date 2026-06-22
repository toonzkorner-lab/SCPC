import Link from 'next/link';
import { getSortedPostsData } from '../../lib/markdown';

export const metadata = {
  title: 'Blog | SCPC Precast',
  description: 'Read the latest news and insights about custom precast concrete from Seawright Custom Precast, Inc.',
};

export default function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#1a1a1a', textAlign: 'center' }}>
        SCPC Blog
      </h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem', fontSize: '1.1rem' }}>
        Insights, news, and project highlights from the leaders in precast concrete.
      </p>

      {allPostsData.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#888' }}>No posts found.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {allPostsData.map(({ id, date, title, coverImage }) => (
            <Link href={`/blog/${id}`} key={id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="blog-card" style={{
                border: '1px solid #eaeaea',
                borderRadius: '12px',
                backgroundColor: '#fff',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}>
                {coverImage && (
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img
                      src={coverImage}
                      alt={title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                      className="product-img-hover"
                    />
                  </div>
                )}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '0.5rem' }}>{date}</div>
                  <h2 style={{ fontSize: '1.4rem', color: '#222', lineHeight: '1.3', marginBottom: '1rem', flex: 1 }}>{title}</h2>
                  <div style={{ color: 'var(--accent)', fontWeight: 'bold', marginTop: 'auto' }}>
                    Read Article &rarr;
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

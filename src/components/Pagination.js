import Link from 'next/link';

export default function Pagination({ currentPage, totalPages, basePath }) {
  if (totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '3rem', padding: '2rem 0', borderTop: '1px solid #eaeaea' }}>
      
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link href={`${basePath}?page=${currentPage - 1}`} className="btn" style={{ padding: '0.5rem 1rem', backgroundColor: 'white', color: 'var(--primary)', border: '1px solid #ccc' }}>
          &larr; Prev
        </Link>
      ) : (
        <span className="btn" style={{ padding: '0.5rem 1rem', backgroundColor: '#f5f5f5', color: '#999', border: '1px solid #eee', cursor: 'not-allowed' }}>
          &larr; Prev
        </span>
      )}

      {/* Page Indicator */}
      <span style={{ margin: '0 1rem', fontWeight: '500', color: '#555' }}>
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link href={`${basePath}?page=${currentPage + 1}`} className="btn" style={{ padding: '0.5rem 1rem', backgroundColor: 'white', color: 'var(--primary)', border: '1px solid #ccc' }}>
          Next &rarr;
        </Link>
      ) : (
        <span className="btn" style={{ padding: '0.5rem 1rem', backgroundColor: '#f5f5f5', color: '#999', border: '1px solid #eee', cursor: 'not-allowed' }}>
          Next &rarr;
        </span>
      )}
    </div>
  );
}

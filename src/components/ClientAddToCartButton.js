'use client';

import { useQuote } from '../context/QuoteContext';
import { useRouter } from 'next/navigation';

export default function ClientAddToCartButton({ product }) {
  const { addToQuote } = useQuote();
  const router = useRouter();

  const handleAddAndCheckout = (e) => {
    e.preventDefault();
    if (product) {
      addToQuote({
        id: product.id,
        name: product.name,
        image: product.image,
        categorySlug: product.categoryId
      });
      // Redirect to the contact page after adding
      router.push('/contact');
    }
  };

  const handleAddOnly = (e) => {
    e.preventDefault();
    if (product) {
      addToQuote({
        id: product.id,
        name: product.name,
        image: product.image,
        categorySlug: product.categoryId
      });
      alert(`Added ${product.name} to your quote!`);
    }
  };

  return (
    <>
      <button onClick={handleAddOnly} className="btn" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', backgroundColor: 'white', color: 'var(--primary)', border: '1px solid var(--primary)', flex: '1', textAlign: 'center', minWidth: '200px', cursor: 'pointer' }}>
        Add to Quote
      </button>
      <button onClick={handleAddAndCheckout} className="btn btn-accent" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', flex: '1', textAlign: 'center', minWidth: '200px', cursor: 'pointer', border: 'none' }}>
        Request Quote Now
      </button>
    </>
  );
}

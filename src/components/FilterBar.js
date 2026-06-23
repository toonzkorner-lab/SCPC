'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const currentSort = searchParams.get('sort') || 'a-z';
  const currentQ = searchParams.get('q') || '';
  
  const [q, setQ] = useState(currentQ);

  const updateFilters = (newSort, newQ) => {
    const params = new URLSearchParams(searchParams);
    if (newSort) params.set('sort', newSort);
    if (newQ !== undefined) {
      if (newQ) params.set('q', newQ);
      else params.delete('q');
    }
    // reset to page 1 on filter change
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '2rem', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid #eaeaea' }}>
      <div style={{ flex: '1', minWidth: '200px' }}>
        <input 
          type="text" 
          placeholder="Filter by name..." 
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') updateFilters(currentSort, q); }}
          onBlur={() => updateFilters(currentSort, q)}
          style={{ width: '100%', padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      
      <div>
        <select 
          value={currentSort} 
          onChange={(e) => updateFilters(e.target.value, undefined)}
          style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'white' }}
        >
          <option value="a-z">Sort A-Z</option>
          <option value="z-a">Sort Z-A</option>
        </select>
      </div>
    </div>
  );
}

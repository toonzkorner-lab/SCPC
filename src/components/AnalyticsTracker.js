'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function TrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only track if we have a pathname and we aren't in the admin dashboard
    if (pathname && !pathname.startsWith('/admin')) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      const referrer = document.referrer;

      // Send tracking data to our API
      fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: url,
          referrer: referrer || 'direct'
        }),
      }).catch(err => {
        // Silently fail if tracking is blocked or errors out
        console.error('Analytics tracking failed', err);
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export default function AnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <TrackerInner />
    </Suspense>
  );
}

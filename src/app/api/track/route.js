import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';

export async function POST(request) {
  try {
    const data = await request.json();
    const { path, referrer } = data;

    if (!path) {
      return NextResponse.json({ error: 'Missing path' }, { status: 400 });
    }

    const db = await getDb();
    
    // Insert page view into database
    await db.run(
      'INSERT INTO page_views (path, referrer) VALUES (?, ?)',
      [path, referrer || 'direct']
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Tracking Error:', error);
    return NextResponse.json({ error: 'Failed to track page view' }, { status: 500 });
  }
}

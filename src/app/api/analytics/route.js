import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb();
    const views = await db.all('SELECT * FROM page_views ORDER BY created_at DESC LIMIT 1000');
    return NextResponse.json({ page_views: views });
  } catch (error) {
    console.error('Failed to fetch analytics', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}

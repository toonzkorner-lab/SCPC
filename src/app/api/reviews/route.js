import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    const db = await getDb();
    
    // Check if table exists (SQLite compat)
    let reviews = [];
    try {
      const tableExists = await db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='reviews'`);
      if (tableExists !== false) { // For the Vercel mock, get() returns false, but if it's real SQLite it checks.
        reviews = await db.all('SELECT * FROM reviews ORDER BY date DESC');
      } else {
        reviews = await db.all('SELECT * FROM reviews'); // Vercel mock fallback
      }
    } catch(e) {
      reviews = await db.all('SELECT * FROM reviews'); // Fallback
    }

    if (!all) {
      // Only return approved reviews for the public page
      reviews = reviews.filter(r => r.approved === 1 || r.approved === true);
    }

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, rating, comment } = data;

    if (!name || !rating || !comment) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const db = await getDb();
    const id = Date.now().toString();
    const date = new Date().toISOString();
    
    // Create table if not exists (SQLite compat)
    try {
      await db.run(`
        CREATE TABLE IF NOT EXISTS reviews (
          id TEXT PRIMARY KEY,
          name TEXT,
          rating INTEGER,
          comment TEXT,
          date TEXT,
          approved INTEGER
        )
      `);
    } catch (e) {
      // Ignore in Vercel mock
    }

    await db.run(
      'INSERT INTO reviews (id, name, rating, comment, date, approved) VALUES (?, ?, ?, ?, ?, ?)',
      [id, name, rating, comment, date, 0] // 0 means not approved
    );

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Failed to submit review:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const data = await request.json();
    const { id, action } = data;

    if (!id || !action) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const db = await getDb();

    if (action === 'approve') {
      await db.run('UPDATE reviews SET approved = 1 WHERE id = ?', [id]);
    } else if (action === 'delete') {
      await db.run('DELETE FROM reviews WHERE id = ?', [id]);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to modify review:', error);
    return NextResponse.json({ error: 'Failed to modify review' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';

export async function GET() {
  try {
    const db = await getDb();
    
    // Check if table exists
    const tableExists = await db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='leads'`);
    if (!tableExists) {
       return NextResponse.json({ leads: [] });
    }

    const leads = await db.all('SELECT * FROM leads ORDER BY created_at DESC');
    return NextResponse.json({ leads });
  } catch (error) {
    console.error('Failed to fetch leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

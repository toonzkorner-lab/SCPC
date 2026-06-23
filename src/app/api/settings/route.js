import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'settings.json');
    const data = await fs.readFile(filePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (err) {
    return NextResponse.json({ leadTime: "4-6 Weeks" });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const filePath = path.join(process.cwd(), 'src', 'data', 'settings.json');
    
    try {
      await fs.writeFile(filePath, JSON.stringify(body, null, 2));
      return NextResponse.json({ success: true });
    } catch (fsError) {
      console.warn("Could not save settings to disk (likely on Vercel). Mocking success.");
      return NextResponse.json({ success: true, mocked: true });
    }
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}

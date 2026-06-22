import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public', 'images');
    const files = await fs.readdir(imagesDirectory);
    
    // Filter for common image extensions
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file)
    ).map(file => ({
      name: file,
      url: `/images/${file}`
    }));

    return NextResponse.json({ images: imageFiles });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read media directory' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { filename } = await request.json();
    
    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    // Security: Prevent path traversal by only keeping the base filename
    const safeFilename = path.basename(filename);
    const filepath = path.join(process.cwd(), 'public', 'images', safeFilename);
    
    await fs.unlink(filepath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete file.' }, { status: 500 });
  }
}

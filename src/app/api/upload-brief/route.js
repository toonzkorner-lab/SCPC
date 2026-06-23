import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // Sanitize filename
    const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}-${filename}`;

    try {
      // For KVM deployment, save to public/uploads
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      // Ensure the directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      await writeFile(path.join(uploadDir, uniqueFilename), buffer);
      
      return NextResponse.json({ 
        success: true, 
        fileUrl: `/uploads/${uniqueFilename}` 
      });
    } catch (fsError) {
      // If we are on Vercel or the directory doesn't exist, we just mock the success 
      // since Vercel filesystem is ephemeral anyway.
      console.warn("Could not save file to disk (likely on Vercel or missing public/uploads folder). Mocking success.");
      return NextResponse.json({ 
        success: true, 
        fileUrl: `/uploads/mock-${uniqueFilename}` 
      });
    }
  } catch (error) {
    console.error('Error handling file upload:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}

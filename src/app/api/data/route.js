import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const categoriesPath = path.join(process.cwd(), 'src', 'data', 'categories.json');
    const productsPath = path.join(process.cwd(), 'src', 'data', 'products.json');

    const [categoriesData, productsData] = await Promise.all([
      fs.readFile(categoriesPath, 'utf8').catch(() => '[]'),
      fs.readFile(productsPath, 'utf8').catch(() => '[]')
    ]);

    return NextResponse.json({
      categories: JSON.parse(categoriesData),
      products: JSON.parse(productsData)
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { type, action, data } = await request.json();
    const filePath = path.join(process.cwd(), 'src', 'data', type === 'products' ? 'products.json' : 'categories.json');
    
    // Read current data
    const fileData = await fs.readFile(filePath, 'utf8').catch(() => '[]');
    let items = JSON.parse(fileData);

    if (action === 'create') {
      items.push({ ...data, id: Date.now().toString() });
    } else if (action === 'update') {
      items = items.map(item => item.id === data.id ? { ...item, ...data } : item);
    } else if (action === 'delete') {
      items = items.filter(item => item.id !== data.id);
    }

    // Save back to file
    await fs.writeFile(filePath, JSON.stringify(items, null, 2), 'utf8');

    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}

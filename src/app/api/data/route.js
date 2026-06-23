import { NextResponse } from 'next/server';
import path from 'path';
import { getDb } from '../../../lib/db';

export async function GET() {
  try {
    const db = await getDb();
    const categories = await db.all('SELECT * FROM categories');
    const products = await db.all('SELECT * FROM products');
    await db.close();

    return NextResponse.json({
      categories,
      products
    });
  } catch (error) {
    console.error('Database GET Error:', error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { type, action, data } = await request.json();
    const db = await getDb();
    let newId;

    if (type === 'products') {
      if (action === 'create') {
        newId = Date.now().toString();
        await db.run(
          'INSERT INTO products (id, categoryId, name, description, image, type, originalFile) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [newId, data.categoryId, data.name, data.description || null, data.image || null, data.type || null, data.originalFile || null]
        );
      } else if (action === 'update') {
        await db.run(
          'UPDATE products SET categoryId = ?, name = ?, description = ?, image = ?, type = ?, originalFile = ? WHERE id = ?',
          [data.categoryId, data.name, data.description || null, data.image || null, data.type || null, data.originalFile || null, data.id]
        );
      } else if (action === 'delete') {
        await db.run('DELETE FROM products WHERE id = ?', [data.id]);
      }
    } else if (type === 'categories') {
      if (action === 'create') {
        newId = Date.now().toString();
        await db.run(
          'INSERT INTO categories (id, name, slug, image, blueprintImage, description) VALUES (?, ?, ?, ?, ?, ?)',
          [newId, data.name, data.slug, data.image || null, data.blueprintImage || null, data.description || null]
        );
      } else if (action === 'update') {
        await db.run(
          'UPDATE categories SET name = ?, slug = ?, image = ?, blueprintImage = ?, description = ? WHERE id = ?',
          [data.name, data.slug, data.image || null, data.blueprintImage || null, data.description || null, data.id]
        );
      } else if (action === 'delete') {
        await db.run('DELETE FROM categories WHERE id = ?', [data.id]);
        // Optionally delete associated products or set categoryId to null
        await db.run('DELETE FROM products WHERE categoryId = ?', [data.id]);
      }
    }

    // Return the updated items
    const items = await db.all(`SELECT * FROM ${type}`);
    await db.close();

    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error('Database POST Error:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}

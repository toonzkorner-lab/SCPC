import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

let db = null;

export async function getDb() {
  if (!db) {
    db = await open({
      filename: path.join(process.cwd(), 'data', 'database.sqlite'),
      driver: sqlite3.Database
    });
    
    await db.exec(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        subject TEXT,
        body TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
  return db;
}

export async function getCategories() {
  const database = await getDb();
  return await database.all('SELECT * FROM categories');
}

export async function getProducts() {
  const database = await getDb();
  return await database.all('SELECT * FROM products');
}

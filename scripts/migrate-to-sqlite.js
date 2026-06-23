const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'database.sqlite');
const productsPath = path.join(process.cwd(), 'src', 'data', 'products.json');
const categoriesPath = path.join(process.cwd(), 'src', 'data', 'categories.json');

async function migrate() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  console.log('Creating tables...');
  await db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      image TEXT,
      blueprintImage TEXT,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      categoryId TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      image TEXT,
      type TEXT,
      originalFile TEXT,
      FOREIGN KEY (categoryId) REFERENCES categories (id)
    );
  `);

  // Clear existing to avoid duplicates if run multiple times
  await db.exec(`DELETE FROM products; DELETE FROM categories;`);

  console.log('Reading JSON files...');
  const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

  console.log('Inserting categories...');
  for (const cat of categories) {
    await db.run(
      'INSERT INTO categories (id, name, slug, image, blueprintImage, description) VALUES (?, ?, ?, ?, ?, ?)',
      [cat.id, cat.name, cat.slug, cat.image, cat.blueprintImage, cat.description || null]
    );
  }

  console.log('Inserting products...');
  let i = 0;
  for (const prod of products) {
    await db.run(
      'INSERT INTO products (id, categoryId, name, description, image, type, originalFile) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [prod.id, prod.categoryId, prod.name, prod.description || null, prod.image || null, prod.type || null, prod.originalFile || null]
    );
    i++;
    if (i % 500 === 0) console.log(`...inserted ${i} products`);
  }

  console.log(`Migration complete! Successfully migrated ${categories.length} categories and ${products.length} products to SQLite.`);
  await db.close();
}

migrate().catch(console.error);

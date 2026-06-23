import fs from 'fs/promises';
import path from 'path';

// This file is currently using static JSON files for Vercel compatibility.
// For the KVM SQLite setup, replace this file's contents with the code in `src/lib/db-sqlite.js`

export async function getCategories() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'categories.json');
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

export async function getProducts() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'products.json');
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

export async function getDb() {
  // Mock getDb function to prevent crashes on Vercel where SQLite isn't available
  return {
    all: async (query) => {
      if (query.includes('leads')) return [];
      if (query.includes('page_views')) {
        try {
          const filePath = path.join(process.cwd(), 'src', 'data', 'analytics.json');
          const data = await fs.readFile(filePath, 'utf8');
          return JSON.parse(data);
        } catch(e) {
          return [];
        }
      }
      if (query.includes('categories')) {
        return await getCategories();
      }
      if (query.includes('products')) {
        return await getProducts();
      }
      return [];
    },
    run: async (query, params) => {
      if (query.includes('page_views')) {
        try {
          const filePath = path.join(process.cwd(), 'src', 'data', 'analytics.json');
          let data = [];
          try {
            data = JSON.parse(await fs.readFile(filePath, 'utf8'));
          } catch(e) {}
          data.push({ path: params[0], referrer: params[1], created_at: new Date().toISOString() });
          await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        } catch(e) {}
      }
    },
    get: async () => false,
    close: async () => {},
  };
}

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
      return [];
    },
    run: async () => {},
    get: async () => false,
  };
}

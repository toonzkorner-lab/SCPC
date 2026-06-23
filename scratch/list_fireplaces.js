const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.json');
const data = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

const fireplaces = data.filter(p => p.categoryId === 'fireplaces');
console.log(`Found ${fireplaces.length} fireplaces.`);

fireplaces.forEach(f => {
  console.log(`ID: ${f.id} | Name: ${f.name} | Image: ${f.image}`);
});

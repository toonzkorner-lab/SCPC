const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.json');

try {
  const data = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

  const updatedData = data.map(product => {
    if (product.id === 'fireplaces-7') {
      return {
        ...product,
        categoryId: 'landscaping'
      };
    }
    return product;
  });

  fs.writeFileSync(productsPath, JSON.stringify(updatedData, null, 2), 'utf8');
  console.log('Moved fireplaces-7 to landscaping.');

} catch (error) {
  console.error('Error:', error);
}

const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.json');

try {
  const data = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  let updatedCount = 0;

  const updatedData = data.map(product => {
    // Check if it's currently in fireplaces
    if (product.categoryId === 'fireplaces') {
      // Check if it's a fire pit / bowl
      const isFirePit = 
        product.name.toLowerCase().includes('fire pit') || 
        product.name.toLowerCase().includes('bowl') ||
        product.description.toLowerCase().includes('fire pit') ||
        product.description.toLowerCase().includes('bowl') ||
        product.image.toLowerCase().includes('fire-pit') ||
        product.image.toLowerCase().includes('bowl');

      if (isFirePit) {
        updatedCount++;
        return {
          ...product,
          categoryId: 'landscaping'
        };
      }
    }
    return product;
  });

  if (updatedCount > 0) {
    fs.writeFileSync(productsPath, JSON.stringify(updatedData, null, 2), 'utf8');
    console.log(`Successfully moved ${updatedCount} fire pit bowls from fireplaces to landscaping.`);
  } else {
    console.log('No fire pit bowls found in the fireplaces category.');
  }

} catch (error) {
  console.error('Error:', error);
}

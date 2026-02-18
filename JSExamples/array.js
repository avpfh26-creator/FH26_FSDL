// Real scenario: Filtering products based on user preferences
const products = [
  { name: 'iPhone', price: 999, category: 'electronics', inStock: true },
  { name: 'Jeans', price: 79, category: 'clothing', inStock: false },
  { name: 'Shoes', price: 129, category: 'clothing', inStock: true },
  { name: 'Headphones', price: 199, category: 'electronics', inStock: true }
];

// Find affordable electronics in stock
const affordableElectronics = products
  .filter(p => p.category === 'electronics' && p.inStock)
  .map(p => ({ ...p, priceWithTax: p.price * 1.1 }));

console.log('Available electronics with tax:', affordableElectronics);
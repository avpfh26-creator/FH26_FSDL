// Real scenario: E-commerce shopping cart
const cart = [
  { item: 'Laptop', price: 999.99, quantity: 1 },
  { item: 'Mouse', price: 29.99, quantity: 2 },
  { item: 'Keyboard', price: 79.99, quantity: 1 }
];
// Arrow function for calculating total
const calculateTotal = (items) => {
  return items.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);
};
// Template literals for formatted output
const total = calculateTotal(cart);
console.log(`🛒 Shopping Cart Summary:
------------------------
${cart.map(item => `${item.item} x${item.quantity}: $${item.price * item.quantity}`).join('\n')}
------------------------
Total: $${total.toFixed(2)}`);
// ============================================
// EXAMPLE 1: Making Coffee (Basic Promise)
// ============================================

// Function that returns a Promise for making coffee
function makeCoffee(type) {
  console.log(`1. Starting to make ${type} coffee...`);
  
  return new Promise((resolve, reject) => {
    // Simulate coffee making time (2 seconds)
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      
      if (success) {
        console.log(`2. ${type} coffee is ready!`);
        resolve({
          type: type,
          message: `Your ${type} coffee is ready`,
          price: 4.99
        });
      } else {
        console.log(`2. Failed to make ${type} coffee!`);
        reject(new Error(`Sorry, we ran out of ${type} beans!`));
      }
    }, 2000);
  });
}

// Using the Promise
console.log("=== ORDERING COFFEE ===");

makeCoffee("Cappuccino")
  .then((coffee) => {
    console.log("3. Success:", coffee.message);
    console.log("4. Price: $" + coffee.price);
    console.log("5. Enjoy your coffee!");
  })
  .catch((error) => {
    console.error("3. Error:", error.message);
    console.log("4. Would you like to order something else?");
  })
  .finally(() => {
    console.log("--- Coffee order process completed ---");
  });

console.log("6. This line runs immediately (non-blocking)");
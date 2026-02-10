// ============================================
// EXAMPLE 4: Promise.all(), Promise.race(), Promise.allSettled()
// ============================================

console.log("=== PROMISE UTILITY METHODS ===");

// Simulate API calls with different response times
const apiCalls = {
  users: new Promise(resolve => 
    setTimeout(() => resolve({ users: ['Alice', 'Bob', 'Charlie'] }), 1200)),
  
  products: new Promise(resolve => 
    setTimeout(() => resolve({ products: ['Laptop', 'Phone', 'Tablet'] }), 800)),
  
  weather: new Promise((resolve, reject) => 
    setTimeout(() => Math.random() > 0.5 ? 
      resolve({ temp: 72, condition: 'Sunny' }) : 
      reject(new Error("Weather API down")), 600)),
  
  news: new Promise(resolve => 
    setTimeout(() => resolve({ headlines: ['News 1', 'News 2'] }), 1000))
};

// ========== Promise.all() ==========
console.log("\n1. Using Promise.all() - All or nothing");
Promise.all([apiCalls.users, apiCalls.products])
  .then(([usersData, productsData]) => {
    console.log("✓ All data loaded successfully!");
    console.log("Users:", usersData.users);
    console.log("Products:", productsData.products);
  })
  .catch(error => {
    console.error("✗ One request failed:", error.message);
  });

// ========== Promise.race() ==========
console.log("\n2. Using Promise.race() - First to finish wins");
Promise.race([apiCalls.users, apiCalls.products, apiCalls.weather])
  .then(firstResult => {
    console.log("✓ First response received:", firstResult);
  })
  .catch(firstError => {
    console.error("✗ First error received:", firstError.message);
  });

// ========== Promise.allSettled() ==========
console.log("\n3. Using Promise.allSettled() - Wait for all, succeed or fail");
Promise.allSettled([
  apiCalls.users,
  apiCalls.products,
  apiCalls.weather,
  apiCalls.news
])
  .then(results => {
    console.log("All promises settled:");
    
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`  ${index}: ✓ Success -`, result.value);
      } else {
        console.log(`  ${index}: ✗ Failed -`, result.reason.message);
      }
    });
    
    const successful = results.filter(r => r.status === 'fulfilled');
    console.log(`Successfully loaded: ${successful.length}/${results.length}`);
  });

// ========== Promise.any() ==========
console.log("\n4. Using Promise.any() - First success wins");
Promise.any([apiCalls.weather, apiCalls.news, apiCalls.users])
  .then(firstSuccess => {
    console.log("✓ Got at least one successful response:", firstSuccess);
  })
  .catch(errors => {
    console.error("✗ All promises failed");
  });
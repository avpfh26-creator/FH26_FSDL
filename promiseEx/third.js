// ============================================
// EXAMPLE 3: Comprehensive Error Handling
// ============================================

function fetchData(apiUrl) {
  return new Promise((resolve, reject) => {
    console.log(`Fetching from: ${apiUrl}`);
    
    setTimeout(() => {
      // Simulate different scenarios
      const random = Math.random();
      
      if (random < 0.4) {
        // Success
        resolve({ data: { id: 1, name: "Sample Data" }, status: 200 });
      } else if (random < 0.7) {
        // Network error
        reject(new Error("Network Error: Failed to connect"));
      } else if (random < 0.9) {
        // Server error
        reject(new Error("Server Error: 500 Internal Server Error"));
      } else {
        // Invalid data
        resolve({ data: null, status: 404 });
      }
    }, 1000);
  });
}

// Different error handling strategies
console.log("=== ERROR HANDLING DEMOS ===");

// Strategy 1: Basic try-catch with async/await
async function handleWithTryCatch() {
  try {
    console.log("\n📋 Strategy 1: Try-Catch");
    const result = await fetchData("api/users/1");
    
    if (!result.data) {
      throw new Error("No data received");
    }
    
    console.log("Success:", result.data);
    return result.data;
  } catch (error) {
    console.error("Caught error:", error.message);
    
    // Recover with default data
    return { id: 0, name: "Default User" };
  }
}

// Strategy 2: Multiple .catch() handlers
console.log("\n📋 Strategy 2: Multiple Catch Handlers");
fetchData("api/products/1")
  .then(result => {
    if (!result.data) {
      throw new Error("Invalid product data");
    }
    console.log("Product:", result.data);
    return result.data;
  })
  .catch(networkError => {
    if (networkError.message.includes("Network")) {
      console.error("Network issue, retrying...");
      return { data: { id: 999, name: "Fallback Product" } };
    }
    throw networkError; // Re-throw if not network error
  })
  .catch(otherError => {
    console.error("Other error:", otherError.message);
    return null;
  })
  .then(finalResult => {
    console.log("Final result:", finalResult);
  });

// Run the examples
handleWithTryCatch().then(result => {
  console.log("Try-catch result:", result);
});
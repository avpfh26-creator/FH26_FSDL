// ============================================
// EXAMPLE 2: Complete E-commerce Order Flow
// ============================================

// Step 1: Login function
function login(email, password) {
  return new Promise((resolve, reject) => {
    console.log("\n🔐 STEP 1: Logging in...");
    
    setTimeout(() => {
      if (email && password) {
        console.log("✓ Login successful");
        resolve({
          userId: 123,
          token: "auth_token_xyz",
          email: email
        });
      } else {
        reject(new Error("❌ Invalid email or password"));
      }
    }, 1000);
  });
}

// Step 2: Get user cart
function getCart(userId) {
  return new Promise((resolve, reject) => {
    console.log("\n🛒 STEP 2: Loading cart...");
    
    setTimeout(() => {
      if (userId === 123) {
        console.log("✓ Cart loaded successfully");
        resolve([
          { id: 1, name: "Laptop", price: 999, quantity: 1 },
          { id: 2, name: "Mouse", price: 25, quantity: 2 }
        ]);
      } else {
        reject(new Error("❌ User not found"));
      }
    }, 800);
  });
}

// Step 3: Calculate total
function calculateTotal(items) {
  return new Promise((resolve) => {
    console.log("\n💰 STEP 3: Calculating total...");
    
    setTimeout(() => {
      const total = items.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);
      
      console.log(`✓ Total calculated: $${total}`);
      resolve({
        items: items,
        subtotal: total,
        tax: total * 0.08,
        shipping: total > 100 ? 0 : 10
      });
    }, 500);
  });
}

// Step 4: Process payment
function processPayment(orderDetails) {
  return new Promise((resolve, reject) => {
    console.log("\n💳 STEP 4: Processing payment...");
    
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate
      
      if (success) {
        orderDetails.paymentId = "PAY_" + Date.now();
        console.log("✓ Payment successful!");
        resolve(orderDetails);
      } else {
        reject(new Error("❌ Payment failed - Insufficient funds"));
      }
    }, 1500);
  });
}

// Step 5: Send confirmation
function sendConfirmation(orderDetails) {
  return new Promise((resolve) => {
    console.log("\n📧 STEP 5: Sending confirmation...");
    
    setTimeout(() => {
      const total = orderDetails.subtotal + 
                    orderDetails.tax + 
                    orderDetails.shipping;
      
      console.log(`✓ Confirmation sent!`);
      console.log(`✓ Order total: $${total.toFixed(2)}`);
      console.log(`✓ Payment ID: ${orderDetails.paymentId}`);
      resolve({
        ...orderDetails,
        total: total,
        status: "completed"
      });
    }, 600);
  });
}

// ============================================
// EXECUTING THE COMPLETE FLOW
// ============================================

console.log("🛍️ STARTING E-COMMERCE ORDER PROCESS\n");

// Chain all promises together
login("john@example.com", "password123")
  .then(user => {
    console.log(`User: ${user.email} (ID: ${user.userId})`);
    return getCart(user.userId);
  })
  .then(cartItems => {
    console.log(`Cart items: ${cartItems.length} items`);
    return calculateTotal(cartItems);
  })
  .then(orderDetails => {
    const total = orderDetails.subtotal + 
                  orderDetails.tax + 
                  orderDetails.shipping;
    console.log(`Subtotal: $${orderDetails.subtotal}`);
    console.log(`Tax: $${orderDetails.tax.toFixed(2)}`);
    console.log(`Shipping: $${orderDetails.shipping}`);
    console.log(`Estimated Total: $${total.toFixed(2)}`);
    return processPayment(orderDetails);
  })
  .then(paidOrder => {
    return sendConfirmation(paidOrder);
  })
  .then(finalOrder => {
    console.log("\n🎉 ORDER COMPLETE!");
    console.log("====================");
    console.log(`Status: ${finalOrder.status}`);
    console.log(`Total Charged: $${finalOrder.total.toFixed(2)}`);
    console.log(`Items: ${finalOrder.items.length}`);
    console.log("Thank you for your purchase!");
  })
  .catch(error => {
    console.error("\n💥 ORDER FAILED!");
    console.error("Error:", error.message);
    console.log("Please try again or contact support.");
  })
  .finally(() => {
    console.log("\n🔚 Order process ended.");
  });
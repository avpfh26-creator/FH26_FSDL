// Real scenario: Food delivery order tracking

// Simulating async operations
const prepareFood = (order) => {
  return new Promise((resolve) => {
    console.log(`👨‍🍳 Preparing ${order}...`);
    setTimeout(() => {
      resolve(`${order} is ready!`);
    }, 2000);
  });
};

const deliverFood = (preparedOrder) => {
  return new Promise((resolve) => {
    console.log(`🛵 Delivering ${preparedOrder}...`);
    setTimeout(() => {
      resolve(`✅ ${preparedOrder} delivered to customer`);
    }, 1500);
  });
};

// Using async/await for clean async code
const processOrder = async (customerName, orderItems) => {
  console.log(`📢 New order from ${customerName}: ${orderItems.join(', ')}`);
  
  try {
    for (const item of orderItems) {
      const prepared = await prepareFood(item);
      const result = await deliverFood(prepared);
      console.log(result);
    }
    
    console.log(`🎉 Order complete for ${customerName}!`);
  } catch (error) {
    console.log(`❌ Error processing order: ${error}`);
  }
};

// Place an order
processOrder('Alice', ['Pizza', 'Salad']);
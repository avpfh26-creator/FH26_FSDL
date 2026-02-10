// ============================================
// EXAMPLE 5: Async/Await - Cleaner Syntax
// ============================================

// Traditional promises with .then()
function traditionalPromiseExample() {
  console.log("Traditional .then() style:");
  
  fetchUser(1)
    .then(user => fetchPosts(user.id))
    .then(posts => fetchComments(posts[0].id))
    .then(comments => {
      console.log("Comments:", comments.length);
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

// Same logic with async/await
async function asyncAwaitExample() {
  console.log("\nAsync/Await style:");
  
  try {
    const user = await fetchUser(1);
    console.log("User:", user.name);
    
    const posts = await fetchPosts(user.id);
    console.log("First post:", posts[0].title);
    
    const comments = await fetchComments(posts[0].id);
    console.log("Comments:", comments.length);
    
    return { user, posts, comments };
  } catch (error) {
    console.error("Error:", error.message);
    throw error; // Re-throw if needed
  } finally {
    console.log("Request completed");
  }
}

// Helper functions
function fetchUser(id) {
  return new Promise(resolve => 
    setTimeout(() => resolve({ id, name: "John Doe" }), 500));
}

function fetchPosts(userId) {
  return new Promise(resolve => 
    setTimeout(() => resolve([
      { id: 101, title: "Post 1" },
      { id: 102, title: "Post 2" }
    ]), 600));
}

function fetchComments(postId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (postId === 101) {
        resolve(["Great post!", "Thanks for sharing"]);
      } else {
        reject(new Error("Comments not found"));
      }
    }, 400);
  });
}

// Run both examples
traditionalPromiseExample();
setTimeout(() => {
  asyncAwaitExample().then(result => {
    console.log("Final result:", result);
  });
}, 2000);
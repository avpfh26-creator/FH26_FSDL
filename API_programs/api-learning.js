// Base URL for the JSONPlaceholder API
const API_URL = 'https://jsonplaceholder.typicode.com';

// ============================================
// STEP 1: Basic GET Request - Understanding fetch
// ============================================
function getBasicData() {
    // Show loading message
    document.getElementById('basicData').innerHTML = 'Loading...';
    
    // Basic fetch request
    fetch(API_URL + '/posts/1')  // Get post with ID 1
        .then(response => {
            // First, check if the response is ok
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse JSON data
            return response.json();
        })
        .then(data => {
            // Display the data
            document.getElementById('basicData').innerHTML = `
                <div class="post-item">
                    <h3>${data.title}</h3>
                    <p>${data.body}</p>
                    <small>Post ID: ${data.id} | User ID: ${data.userId}</small>
                </div>
            `;
        })
        .catch(error => {
            // Handle any errors
            document.getElementById('basicData').innerHTML = `
                <div class="error">
                    Error: ${error.message}
                </div>
            `;
        });
}

// ============================================
// STEP 2: Fetch Multiple Items
// ============================================
function getMultiplePosts() {
    const displayDiv = document.getElementById('multiplePosts');
    displayDiv.innerHTML = 'Loading...';
    
    fetch(API_URL + '/posts')
        .then(response => response.json())
        .then(posts => {
            // Get only first 5 posts to keep display manageable
            const firstFivePosts = posts.slice(0, 5);
            
            let html = '<h3>Latest 5 Posts:</h3>';
            
            // Loop through posts and create HTML
            firstFivePosts.forEach(post => {
                html += `
                    <div class="post-item">
                        <h3>${post.title}</h3>
                        <p>${post.body.substring(0, 100)}...</p>
                        <small>Post ID: ${post.id}</small>
                    </div>
                `;
            });
            
            displayDiv.innerHTML = html;
        })
        .catch(error => {
            displayDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        });
}

// ============================================
// STEP 3: POST Data to API
// ============================================
function createPost() {
    // Get form values
    const title = document.getElementById('postTitle').value;
    const body = document.getElementById('postBody').value;
    const resultDiv = document.getElementById('postResult');
    
    // Validate input
    if (!title || !body) {
        resultDiv.innerHTML = '<div class="error">Please fill in both title and content!</div>';
        return;
    }
    
    // Show loading
    resultDiv.innerHTML = 'Creating post...';
    
    // Create post object
    const newPost = {
        title: title,
        body: body,
        userId: 1
    };
    
    // POST request
    fetch(API_URL + '/posts', {
        method: 'POST',  // Specify the HTTP method
        headers: {
            'Content-Type': 'application/json',  // Tell server we're sending JSON
        },
        body: JSON.stringify(newPost)  // Convert JavaScript object to JSON string
    })
    .then(response => response.json())
    .then(data => {
        // Display the created post (with new ID from server)
        resultDiv.innerHTML = `
            <div style="background-color: #e8f5e8; padding: 10px; border-radius: 4px;">
                <h3 style="color: #4CAF50;">✓ Post Created Successfully!</h3>
                <p><strong>Title:</strong> ${data.title}</p>
                <p><strong>Content:</strong> ${data.body}</p>
                <p><strong>Assigned ID:</strong> ${data.id}</p>
                <small>Note: JSONPlaceholder simulates creation, post isn't actually saved.</small>
            </div>
        `;
        
        // Clear form
        document.getElementById('postTitle').value = '';
        document.getElementById('postBody').value = '';
    })
    .catch(error => {
        resultDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    });
}

// ============================================
// STEP 4: Advanced - With Loading States
// ============================================
async function getPostsWithLoading() {
    const displayDiv = document.getElementById('loadingData');
    
    try {
        // Show loading state
        displayDiv.innerHTML = '<div class="loading">⏳ Fetching posts...</div>';
        
        // Use async/await for cleaner syntax
        const response = await fetch(API_URL + '/posts');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const posts = await response.json();
        
        // Simulate delay to show loading (remove in production)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Display posts in a table
        let html = '<h3>Posts (with loading state demonstration):</h3>';
        html += '<table style="width:100%; border-collapse: collapse;">';
        html += '<tr style="background-color: #4CAF50; color: white;"><th>ID</th><th>Title</th></tr>';
        
        posts.slice(0, 8).forEach(post => {
            html += `
                <tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 8px;">${post.id}</td>
                    <td style="padding: 8px;">${post.title}</td>
                </tr>
            `;
        });
        
        html += '</table>';
        html += '<p><small>Total posts available: ' + posts.length + '</small></p>';
        
        displayDiv.innerHTML = html;
        
    } catch (error) {
        displayDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

// ============================================
// BONUS: Understanding Different HTTP Methods
// ============================================

// PUT Request (Update)
function updatePost(postId, updatedData) {
    fetch(`${API_URL}/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => console.log('Updated:', data))
    .catch(error => console.error('Error:', error));
}

// DELETE Request
function deletePost(postId) {
    fetch(`${API_URL}/posts/${postId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log('Post deleted successfully');
        }
    })
    .catch(error => console.error('Error:', error));
}

// ============================================
// Understanding API Concepts
// ============================================

/*
KEY CONCEPTS EXPLAINED:

1. WHAT IS AN API?
   - API = Application Programming Interface
   - It's like a waiter in a restaurant - takes your request to the kitchen (server) 
     and brings back food (data)

2. HTTP METHODS:
   - GET: Retrieve data (like reading a book)
   - POST: Create new data (like writing a new page)
   - PUT: Update existing data (like editing a page)
   - DELETE: Remove data (like tearing out a page)

3. FETCH API:
   - Built-in JavaScript function for making HTTP requests
   - Returns a Promise (like an IOU for future data)

4. PROMISES:
   - .then() = "when the data arrives, do this"
   - .catch() = "if something goes wrong, do this"
   - async/await = newer, cleaner way to handle promises

5. JSON:
   - Format for sending/receiving data
   - Looks like JavaScript objects but with quotes around keys
   - JSON.stringify() = convert object to JSON string
   - JSON.parse() = convert JSON string to object

6. HTTP STATUS CODES:
   - 200: Success!
   - 201: Created successfully
   - 404: Not found
   - 500: Server error
*/

// Console logs to help understand
console.log('API Learning Script Loaded!');
console.log('Try clicking the buttons to see API in action!');
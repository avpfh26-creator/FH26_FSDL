// AI Image Processing Playground
let originalImage = null;
let processedImage = null;
let currentImageUrl = '';

// Sample image URLs (free to use images)
const sampleImages = {
    nature: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop',
    city: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w-800&auto=format&fit=crop',
    portrait: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&auto=format&fit=crop'
};

// Load saved API key on start
window.onload = function() {
    const savedKey = localStorage.getItem('deepseek_api_key');
    if (savedKey) {
        document.getElementById('apiKey').value = savedKey;
    }
};

// Toggle API key visibility
function toggleApiKey() {
    const input = document.getElementById('apiKey');
    input.type = input.type === 'password' ? 'text' : 'password';
}

// Save API key to localStorage
function saveApiKey() {
    const key = document.getElementById('apiKey').value.trim();
    if (key) {
        localStorage.setItem('deepseek_api_key', key);
        updateStatus('API key saved!');
    }
}

// Update status display
function updateStatus(message) {
    document.getElementById('status').textContent = message;
    document.getElementById('status').style.color = '#28a745';
}

// Use sample image
function useSample(type) {
    const url = sampleImages[type];
    if (url) {
        document.getElementById('imageUrl').value = url;
        fetchImageFromUrl();
    }
}

// Fetch image from URL
async function fetchImageFromUrl() {
    const url = document.getElementById('imageUrl').value.trim();
    if (!url) {
        alert('Please enter an image URL');
        return;
    }

    updateStatus('Fetching image...');
    
    try {
        // Using proxy to avoid CORS issues
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
        
        const response = await fetch(proxyUrl);
        
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }
        
        const blob = await response.blob();
        const reader = new FileReader();
        
        reader.onload = function(e) {
            displayOriginalImage(e.target.result);
            updateStatus('Image loaded successfully');
        };
        
        reader.readAsDataURL(blob);
        
    } catch (error) {
        updateStatus('Error fetching image');
        console.error('Fetch error:', error);
        alert('Failed to fetch image. Please check the URL and try again.');
    }
}

// Handle file upload
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            displayOriginalImage(e.target.result);
            updateStatus('Image uploaded');
        };
        
        reader.readAsDataURL(file);
    }
});

// Display original image
function displayOriginalImage(dataUrl) {
    originalImage = dataUrl;
    
    const container = document.getElementById('originalImage');
    container.innerHTML = `
        <img src="${dataUrl}" alt="Original Image">
        <p>${new Date().toLocaleTimeString()}</p>
    `;
}

// Fetch sample image (fallback)
function fetchSampleImage() {
    const sampleUrl = 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop';
    document.getElementById('imageUrl').value = sampleUrl;
    fetchImageFromUrl();
}

// Reset images
function resetImage() {
    originalImage = null;
    processedImage = null;
    
    document.getElementById('originalImage').innerHTML = `
        <i class="fas fa-image fa-4x"></i>
        <p>No image loaded</p>
    `;
    
    document.getElementById('processedImage').innerHTML = `
        <i class="fas fa-cog fa-spin fa-4x"></i>
        <p>Processing result will appear here</p>
    `;
    
    document.getElementById('currentTechnique').textContent = 'None';
    document.getElementById('aiInstructions').textContent = '-';
    updateStatus('Ready');
}

// Download processed image
function downloadImage() {
    if (!processedImage) {
        alert('No processed image to download');
        return;
    }
    
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'ai-processed-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Apply processing technique
async function applyTechnique(technique) {
    if (!originalImage) {
        alert('Please load an image first');
        return;
    }

    const apiKey = document.getElementById('apiKey').value.trim();
    if (!apiKey) {
        alert('Please enter your DeepSeek API key');
        return;
    }

    // Show loading
    document.getElementById('loading').style.display = 'flex';
    
    // Update current technique
    const techniqueNames = {
        'contrast': 'Contrast Adjustment',
        'histogram': 'Histogram Equalization',
        'noise': 'Noise Reduction',
        'deblur': 'Deblurring',
        'inpaint': 'Inpainting',
        'denoise': 'Denoising',
        'threshold': 'Thresholding',
        'edge': 'Edge Detection',
        'region': 'Region Segmentation'
    };
    
    document.getElementById('currentTechnique').textContent = techniqueNames[technique];
    
    // Prepare instructions for AI
    const instructions = getInstructionsForTechnique(technique);
    document.getElementById('aiInstructions').textContent = instructions;
    
    try {
        // Call DeepSeek API
        const processedImageData = await callDeepSeekAPI(originalImage, instructions, apiKey);
        
        // Display processed image
        displayProcessedImage(processedImageData);
        updateStatus('Processing complete!');
        
    } catch (error) {
        console.error('Processing error:', error);
        updateStatus('Error processing image');
        alert('Error: ' + error.message);
        
        // For demo purposes, show a simulated processed image
        simulateProcessing(technique);
    } finally {
        // Hide loading
        document.getElementById('loading').style.display = 'none';
    }
}

// Get instructions for each technique
function getInstructionsForTechnique(technique) {
    const instructionMap = {
        'contrast': 'Please enhance the contrast of this image to make features more visible by adjusting the difference between light and dark areas. Use contrast stretching techniques.',
        'histogram': 'Apply histogram equalization to this image to improve global contrast by redistributing intensity values evenly across the histogram.',
        'noise': 'Reduce noise in this image using techniques like median filtering, Gaussian smoothing, or bilateral filtering while preserving important details.',
        'deblur': 'Deblur this image to restore sharpness and remove blur caused by camera shake or motion. Use inverse filtering or Wiener filtering techniques.',
        'inpaint': 'Apply inpainting to restore lost or deteriorated parts of this image. Use patch-based methods or PDE-based techniques to fill in missing areas.',
        'denoise': 'Remove noise from this image while preserving edges and important features. Use wavelet thresholding or non-local means filtering.',
        'threshold': 'Convert this image to binary using thresholding segmentation. Select optimal threshold value to separate foreground from background.',
        'edge': 'Detect edges in this image using Sobel, Canny, or Prewitt operators. Highlight boundaries and high gradient areas.',
        'region': 'Segment this image into regions using region-based segmentation techniques like region growing or watershed segmentation.'
    };
    
    return instructionMap[technique] || 'Process this image using computer vision techniques.';
}

// Call DeepSeek API using Fetch API
async function callDeepSeekAPI(imageBase64, instructions, apiKey) {
    const apiUrl = 'https://api.deepseek.com/v1/chat/completions';
    
    // Prepare the request body
    const requestBody = {
        model: "deepseek-chat", // or "deepseek-coder" for vision tasks
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: `You are a computer vision expert. ${instructions} Analyze the provided image and suggest processing steps.`
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: imageBase64
                        }
                    }
                ]
            }
        ],
        max_tokens: 1000,
        temperature: 0.7
    };
    
    console.log('Calling DeepSeek API with instructions:', instructions);
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API Error ${response.status}: ${errorData.error?.message || response.statusText}`);
        }
        
        const data = await response.json();
        
        // Log the response for debugging
        console.log('API Response:', data);
        
        // For now, we'll return the AI's text response
        // In a real application, you would process the image based on AI's instructions
        return {
            text: data.choices[0]?.message?.content || 'Processing completed',
            success: true
        };
        
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Display processed image (for demo, we'll show the original with a filter)
function displayProcessedImage(responseData) {
    const container = document.getElementById('processedImage');
    
    if (responseData.success) {
        // In a real app, you would use the actual processed image
        // For demo, we'll apply a CSS filter to the original
        container.innerHTML = `
            <img src="${originalImage}" alt="Processed Image" style="filter: ${getFilterForTechnique()}">
            <p>${responseData.text.substring(0, 100)}...</p>
        `;
        processedImage = originalImage; // In real app, this would be the processed image URL
    }
}

// Get CSS filter for current technique (demo only)
function getFilterForTechnique() {
    const current = document.getElementById('currentTechnique').textContent;
    
    const filters = {
        'Contrast Adjustment': 'contrast(150%)',
        'Histogram Equalization': 'contrast(200%) brightness(110%)',
        'Noise Reduction': 'blur(1px)',
        'Deblurring': 'contrast(120%) sharpness(150%)',
        'Thresholding': 'grayscale(100%) contrast(200%)',
        'Edge Detection': 'contrast(300%) invert(100%)',
        'Region Segmentation': 'hue-rotate(90deg) saturate(200%)'
    };
    
    return filters[current] || 'contrast(120%)';
}

// Simulate processing for demo
function simulateProcessing(technique) {
    const container = document.getElementById('processedImage');
    
    container.innerHTML = `
        <img src="${originalImage}" alt="Processed Image" style="filter: ${getFilterForTechnique()}">
        <p>Simulated ${technique} applied. In real app, AI would process the image.</p>
    `;
    
    processedImage = originalImage;
}
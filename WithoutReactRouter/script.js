// Shared functionality across all pages

// Alert function (used in index.html)
function showAlert() {
    alert('Hello from traditional website!');
}

// Contact form handling (only runs if the form exists)
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simulate form submission
            const status = document.getElementById('formStatus');
            status.textContent = `Thank you ${name}! We'll contact you at ${email}.`;
            status.style.color = 'green';
            
            // Clear form
            contactForm.reset();
            
            // Remove message after 3 seconds
            setTimeout(() => {
                status.textContent = '';
            }, 3000);
        });
    }
});

// Log page load for demonstration
console.log(`Page loaded: ${window.location.pathname}`);
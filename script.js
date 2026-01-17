// Student Learning Portal - Main JavaScript File

// DOM Elements
const courseContainer = document.getElementById('courseContainer');
const assignmentsTable = document.getElementById('assignmentsTable');
const registrationForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');
const gradeForm = document.getElementById('gradeForm');
const gradeList = document.getElementById('gradeList');

// Sample Data - Would normally come from API
const courses = [
    {
        id: 1,
        code: "CS101",
        name: "Introduction to Programming",
        instructor: "Dr. Smith",
        credits: 3,
        progress: 80,
        status: "active"
    },
    {
        id: 2,
        code: "CS201",
        name: "Data Structures",
        instructor: "Prof. Johnson",
        credits: 4,
        progress: 60,
        status: "active"
    },
    {
        id: 3,
        code: "CS301",
        name: "Database Systems",
        instructor: "Dr. Williams",
        credits: 3,
        progress: 90,
        status: "completed"
    },
    {
        id: 4,
        code: "CS401",
        name: "Web Development",
        instructor: "Prof. Brown",
        credits: 4,
        progress: 40,
        status: "active"
    },
    {
        id: 5,
        code: "MATH101",
        name: "Discrete Mathematics",
        instructor: "Dr. Davis",
        credits: 3,
        progress: 70,
        status: "active"
    }
];

const assignments = [
    {
        id: 1,
        course: "CS101",
        title: "Programming Basics Assignment",
        dueDate: "2024-03-20",
        status: "pending"
    },
    {
        id: 2,
        course: "CS201",
        title: "Linked List Implementation",
        dueDate: "2024-03-18",
        status: "overdue"
    },
    {
        id: 3,
        course: "CS401",
        title: "HTML/CSS Project",
        dueDate: "2024-03-25",
        status: "pending"
    },
    {
        id: 4,
        course: "MATH101",
        title: "Logic Problems Set",
        dueDate: "2024-03-22",
        status: "pending"
    }
];

// Student Class
class Student {
    constructor(name, email, rollNumber, department) {
        this.name = name;
        this.email = email;
        this.rollNumber = rollNumber;
        this.department = department;
        this.courses = [];
        this.grades = [];
    }

    enrollCourse(course) {
        this.courses.push(course);
        console.log(`${this.name} enrolled in ${course.name}`);
    }

    submitAssignment(assignmentId) {
        console.log(`Assignment ${assignmentId} submitted by ${this.name}`);
        return true;
    }
}

// Course Class
class Course {
    constructor(code, name, credits) {
        this.code = code;
        this.name = name;
        this.credits = credits;
        this.assignments = [];
    }

    addAssignment(assignment) {
        this.assignments.push(assignment);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Student Learning Portal Initialized');
    
    // Load courses
    loadCourses();
    
    // Load assignments
    loadAssignments();
    
    // Setup event listeners
    setupEventListeners();
    
    // Check if user is logged in (simulated)
    checkLoginStatus();
    
    // Initialize tooltips
    initTooltips();
});

// Load courses into the DOM
function loadCourses() {
    courseContainer.innerHTML = '';
    
    courses.forEach(course => {
        const courseCard = createCourseCard(course);
        courseContainer.appendChild(courseCard);
    });
}

// Create a course card element
function createCourseCard(course) {
    const col = document.createElement('div');
    col.className = 'col-md-4 fade-in';
    
    const statusClass = course.status === 'completed' ? 'bg-success' : 
                       course.status === 'active' ? 'bg-primary' : 'bg-warning';
    
    col.innerHTML = `
        <div class="card course-card h-100">
            <div class="card-header d-flex justify-content-between align-items-center">
                <span class="badge ${statusClass}">${course.status.toUpperCase()}</span>
                <span class="badge bg-info">${course.credits} Credits</span>
            </div>
            <div class="card-body">
                <h5 class="card-title">${course.code}: ${course.name}</h5>
                <p class="card-text"><i class="bi bi-person"></i> ${course.instructor}</p>
                <div class="progress mb-3" style="height: 10px;">
                    <div class="progress-bar" style="width: ${course.progress}%"></div>
                </div>
                <p class="card-text">Progress: ${course.progress}%</p>
                <div class="d-grid gap-2">
                    <button class="btn btn-outline-primary" onclick="viewCourseDetails(${course.id})">
                        <i class="bi bi-eye"></i> View Details
                    </button>
                    <button class="btn btn-outline-success" onclick="enrollInCourse(${course.id})">
                        <i class="bi bi-plus-circle"></i> Enroll
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Load assignments into the table
function loadAssignments() {
    assignmentsTable.innerHTML = '';
    
    assignments.forEach(assignment => {
        const row = createAssignmentRow(assignment);
        assignmentsTable.appendChild(row);
    });
}

// Create assignment table row
function createAssignmentRow(assignment) {
    const row = document.createElement('tr');
    
    // Calculate days remaining
    const dueDate = new Date(assignment.dueDate);
    const today = new Date();
    const daysRemaining = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    // Status badge
    let statusBadge, statusText;
    if (assignment.status === 'completed') {
        statusBadge = 'bg-success';
        statusText = 'Completed';
    } else if (assignment.status === 'overdue') {
        statusBadge = 'bg-danger';
        statusText = 'Overdue';
    } else {
        statusBadge = 'bg-warning';
        statusText = 'Pending';
    }
    
    row.innerHTML = `
        <td>${assignment.course}</td>
        <td>${assignment.title}</td>
        <td>${assignment.dueDate} (${daysRemaining} days)</td>
        <td><span class="badge ${statusBadge}">${statusText}</span></td>
        <td>
            <button class="btn btn-sm btn-primary" onclick="submitAssignment(${assignment.id})">
                <i class="bi bi-upload"></i> Submit
            </button>
            <button class="btn btn-sm btn-info" onclick="viewAssignment(${assignment.id})">
                <i class="bi bi-info-circle"></i> Details
            </button>
        </td>
    `;
    
    return row;
}

// Setup all event listeners
function setupEventListeners() {
    // Registration form submission
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
        
        // Real-time password validation
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        if (password && confirmPassword) {
            confirmPassword.addEventListener('input', function() {
                validatePasswordMatch();
            });
        }
    }
    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Grade form submission
    if (gradeForm) {
        gradeForm.addEventListener('submit', handleGradeSubmit);
    }
}

// Handle registration form submission
function handleRegistration(event) {
    event.preventDefault();
    
    try {
        // Get form values
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const rollNumber = document.getElementById('rollNumber').value.trim();
        const department = document.getElementById('department').value;
        const year = document.getElementById('year').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terms = document.getElementById('terms').checked;
        
        // Validate form
        if (!validateRegistrationForm(fullName, email, rollNumber, department, year, password, confirmPassword, terms)) {
            return;
        }
        
        // Create student object
        const student = new Student(fullName, email, rollNumber, department);
        
        // Simulate API call
        console.log('Registering student:', student);
        
        // Show success message
        showAlert('Registration successful! Welcome to the portal.', 'success');
        
        // Reset form
        registrationForm.reset();
        
        // Auto-login
        simulateLogin(student);
        
    } catch (error) {
        console.error('Registration error:', error);
        showAlert('An error occurred during registration. Please try again.', 'danger');
    }
}

// Validate registration form
function validateRegistrationForm(fullName, email, rollNumber, department, year, password, confirmPassword, terms) {
    // Check required fields
    if (!fullName || !email || !rollNumber || !department || !year || !password) {
        showAlert('Please fill in all required fields.', 'warning');
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address.', 'warning');
        return false;
    }
    
    // Validate password strength
    if (password.length < 8) {
        showAlert('Password must be at least 8 characters long.', 'warning');
        return false;
    }
    
    // Check for at least one number and one letter
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    if (!hasNumber || !hasLetter) {
        showAlert('Password must contain both letters and numbers.', 'warning');
        return false;
    }
    
    // Check password match
    if (password !== confirmPassword) {
        showAlert('Passwords do not match.', 'warning');
        return false;
    }
    
    // Check terms agreement
    if (!terms) {
        showAlert('You must agree to the terms and conditions.', 'warning');
        return false;
    }
    
    return true;
}

// Validate password match in real-time
function validatePasswordMatch() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    if (!password || !confirmPassword) return;
    
    if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
        confirmPassword.classList.add('is-invalid');
    } else {
        confirmPassword.classList.remove('is-invalid');
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Simple validation
    if (!email || !password) {
        showAlert('Please enter both email and password.', 'warning');
        return;
    }
    
    // Simulate login
    const student = new Student('Demo User', email, 'DEMO001', 'CSE');
    simulateLogin(student, rememberMe);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    if (modal) {
        modal.hide();
    }
}

// Simulate login
function simulateLogin(student, rememberMe = false) {
    console.log('Logging in:', student.name);
    
    // Store in localStorage if remember me is checked
    if (rememberMe) {
        localStorage.setItem('student', JSON.stringify({
            name: student.name,
            email: student.email
        }));
    } else {
        sessionStorage.setItem('student', JSON.stringify({
            name: student.name,
            email: student.email
        }));
    }
    
    // Update UI
    updateLoginStatus(student.name);
    
    showAlert(`Welcome back, ${student.name}!`, 'success');
}

// Check login status
function checkLoginStatus() {
    let studentData = sessionStorage.getItem('student') || localStorage.getItem('student');
    
    if (studentData) {
        try {
            const student = JSON.parse(studentData);
            updateLoginStatus(student.name);
        } catch (e) {
            console.error('Error parsing student data:', e);
        }
    }
}

// Update UI based on login status
function updateLoginStatus(studentName) {
    const loginButton = document.querySelector('a[data-bs-target="#loginModal"]');
    if (loginButton && studentName) {
        loginButton.innerHTML = `<i class="bi bi-person-check"></i> ${studentName}`;
        loginButton.href = '#profile';
        loginButton.removeAttribute('data-bs-toggle');
    }
}

// Handle grade submission
function handleGradeSubmit(event) {
    event.preventDefault();
    
    const courseName = document.getElementById('courseName').value.trim();
    const credits = parseInt(document.getElementById('credits').value);
    const grade = parseFloat(document.getElementById('grade').value);
    
    if (!courseName || isNaN(credits) || isNaN(grade)) {
        showAlert('Please fill in all grade fields correctly.', 'warning');
        return;
    }
    
    if (grade < 0 || grade > 100) {
        showAlert('Grade must be between 0 and 100.', 'warning');
        return;
    }
    
    // Add grade to table
    addGradeToTable(courseName, credits, grade);
    
    // Reset form
    gradeForm.reset();
}

// Add grade to the table
function addGradeToTable(courseName, credits, grade) {
    const row = document.createElement('tr');
    row.id = `grade-${Date.now()}`;
    
    // Determine grade letter
    const gradeLetter = getGradeLetter(grade);
    
    row.innerHTML = `
        <td>${courseName}</td>
        <td>${credits}</td>
        <td>${grade}% (${gradeLetter})</td>
        <td>
            <button class="btn btn-sm btn-danger" onclick="removeGrade('${row.id}')">
                <i class="bi bi-trash"></i> Remove
            </button>
        </td>
    `;
    
    gradeList.appendChild(row);
    
    // Update totals
    updateGradeTotals();
}

// Remove grade from table
function removeGrade(rowId) {
    const row = document.getElementById(rowId);
    if (row) {
        row.remove();
        updateGradeTotals();
        showAlert('Grade removed.', 'info');
    }
}

// Calculate GPA
function calculateGPA() {
    const rows = gradeList.querySelectorAll('tr');
    let totalCredits = 0;
    let totalGradePoints = 0;
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 3) {
            const credits = parseInt(cells[1].textContent);
            const gradeText = cells[2].textContent;
            const gradeMatch = gradeText.match(/(\d+)%/);
            
            if (gradeMatch) {
                const grade = parseFloat(gradeMatch[1]);
                const gradePoints = getGradePoints(grade);
                
                totalCredits += credits;
                totalGradePoints += (gradePoints * credits);
            }
        }
    });
    
    if (totalCredits === 0) {
        showAlert('No grades to calculate.', 'warning');
        return;
    }
    
    const gpa = totalGradePoints / totalCredits;
    
    document.getElementById('totalCredits').textContent = totalCredits;
    document.getElementById('gpa').textContent = gpa.toFixed(2);
    
    showAlert(`GPA calculated: ${gpa.toFixed(2)}`, 'success');
}

// Update grade totals
function updateGradeTotals() {
    const rows = gradeList.querySelectorAll('tr');
    let totalCredits = 0;
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 2) {
            const credits = parseInt(cells[1].textContent);
            if (!isNaN(credits)) {
                totalCredits += credits;
            }
        }
    });
    
    document.getElementById('totalCredits').textContent = totalCredits;
}

// Helper function to get grade letter
function getGradeLetter(grade) {
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    if (grade >= 60) return 'D';
    return 'F';
}

// Helper function to get grade points
function getGradePoints(grade) {
    if (grade >= 90) return 4.0;
    if (grade >= 80) return 3.0;
    if (grade >= 70) return 2.0;
    if (grade >= 60) return 1.0;
    return 0.0;
}

// Show alert message
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert-dismissible');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertDiv.style.zIndex = '1050';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Course-related functions
function viewCourseDetails(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        showAlert(`Viewing details for ${course.code}: ${course.name}`, 'info');
        // In a real application, you would navigate to course details page
    }
}

function enrollInCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        showAlert(`Enrolled in ${course.code}: ${course.name}`, 'success');
        
        // Update course status
        course.status = 'active';
        loadCourses(); // Refresh display
    }
}

// Assignment-related functions
function submitAssignment(assignmentId) {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (assignment) {
        assignment.status = 'completed';
        loadAssignments(); // Refresh display
        showAlert(`Assignment "${assignment.title}" submitted successfully!`, 'success');
    }
}

function viewAssignment(assignmentId) {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (assignment) {
        showAlert(`Details for: ${assignment.title} (Due: ${assignment.dueDate})`, 'info');
    }
}

// Initialize tooltips
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Export data function (for demonstration)
function exportData() {
    const data = {
        courses: courses,
        assignments: assignments,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'portal-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showAlert('Data exported successfully!', 'success');
}

// Theme toggle function
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-bs-theme');
    
    if (currentTheme === 'dark') {
        body.removeAttribute('data-bs-theme');
        localStorage.setItem('theme', 'light');
        showAlert('Switched to light theme', 'info');
    } else {
        body.setAttribute('data-bs-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        showAlert('Switched to dark theme', 'info');
    }
}

// Check saved theme preference
function checkThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-bs-theme', 'dark');
    }
}

// Initialize theme on page load
checkThemePreference();
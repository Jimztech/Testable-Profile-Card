function updateTime() {
    const timeElement = document.querySelector('.time');
    const now = new Date();
    
    // Get hours and minutes
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Determine AM/PM
    const ampm = hours >= 12 ? 'pm' : 'am';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    
    // Add leading zero to minutes if needed
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    
    // Update the element
    timeElement.textContent = `${hours}:${minutesStr}:${seconds}${ampm} WAT`;
}

// Update time immediately
updateTime();

// Update every minute (60000 milliseconds)
setInterval(updateTime, 1000);


// Get form elements
const form = document.querySelector('form');
const nameInput = document.querySelector('[data-testid="test-contact-name"]');
const emailInput = document.querySelector('[data-testid="test-contact-email"]');
const nameError = document.querySelector('[data-testid="test-contact-error-fullname"]');
const emailError = document.querySelector('[data-testid="test-contact-error-email"]');

// Validation functions
function validateName(name) {
  if (name.trim() === '') {
    return 'Full name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return 'Name should only contain letters and spaces';
  }
  return '';
}

function validateEmail(email) {
  if (email.trim() === '') {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return '';
}

// Display error messages
function showError(errorElement, message) {
  errorElement.textContent = message;
  errorElement.style.color = 'red';
  errorElement.style.display = 'block';
}

function clearError(errorElement) {
  errorElement.textContent = '';
  errorElement.style.display = 'none';
}

// Real-time validation on input
nameInput.addEventListener('input', () => {
  const error = validateName(nameInput.value);
  if (error) {
    showError(nameError, error);
  } else {
    clearError(nameError);
  }
});

emailInput.addEventListener('input', () => {
  const error = validateEmail(emailInput.value);
  if (error) {
    showError(emailError, error);
  } else {
    clearError(emailError);
  }
});

// Form submission validation
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nameErrorMsg = validateName(nameInput.value);
  const emailErrorMsg = validateEmail(emailInput.value);
  
  // Clear previous errors
  clearError(nameError);
  clearError(emailError);
  
  // Show errors if any
  if (nameErrorMsg) {
    showError(nameError, nameErrorMsg);
  }
  if (emailErrorMsg) {
    showError(emailError, emailErrorMsg);
  }
  
  // If no errors, submit the form
  if (!nameErrorMsg && !emailErrorMsg) {
    console.log('Form is valid, submitting...');
    // form.submit(); // Uncomment to actually submit
    alert('Form submitted successfully!');
  }
});
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
const successAlert = document.querySelector('[data-testid="test-contact-success"]');

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
    // Show success message
    successAlert.style.display = 'block';
    successAlert.style.color = 'green';
    successAlert.style.padding = '10px';
    successAlert.style.marginBottom = '15px';
    successAlert.style.backgroundColor = '#d4edda';
    successAlert.style.border = '1px solid #c3e6cb';
    successAlert.style.borderRadius = '4px';
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      successAlert.style.display = 'none';
      form.reset();
    }, 3000);
  }
});


//Navigation
// Get all sections
const articleSection = document.querySelector('.container');
const contactPage = document.querySelector('.contact-page');
const aboutPage = document.querySelector('[data-testid="test-about-page"]');

// Get navigation links
const contactLink = document.querySelector('a[href="#contact us"]');
const aboutLink = document.querySelector('a[href="#about me"]');

// Get back buttons
const contactBackButton = document.querySelector('.contact-page .back-button span');
const aboutBackButton = document.querySelector('[data-testid="test-about-page"] > span');

// Function to show a specific section and hide others
function showSection(sectionToShow) {
  // Hide all sections
  articleSection.style.display = 'none';
  contactPage.style.display = 'none';
  aboutPage.style.display = 'none';
  
  // Show the selected section
  sectionToShow.style.display = 'block';
  
  // Scroll to top of page
  window.scrollTo(0, 0);
}

// Initialize: Show only the article section on page load
function initializePage() {
  showSection(articleSection);
}

// Navigate to Contact Us page
contactLink.addEventListener('click', (e) => {
  e.preventDefault();
  showSection(contactPage);
});

// Navigate to About Me page
aboutLink.addEventListener('click', (e) => {
  e.preventDefault();
  showSection(aboutPage);
});

// Back to home from Contact page
contactBackButton.addEventListener('click', () => {
  showSection(articleSection);
});

// Back to home from About page
aboutBackButton.addEventListener('click', () => {
  showSection(articleSection);
});

// Initialize the page
initializePage();
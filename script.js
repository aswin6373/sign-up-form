const form = document.getElementById('signup-form');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

// Helper function to show error
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.8em';
    errorElement.textContent = message;
    
    input.style.borderColor = 'red';
    if (!formGroup.contains(errorElement)) {
        formGroup.appendChild(errorElement);
    }
}

// Helper function to clear error
function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    input.style.borderColor = '#4CAF50';
    if (errorElement) {
        formGroup.removeChild(errorElement);
    }
}

// Password validation
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
        valid: password.length >= minLength && 
               hasUpperCase && 
               hasLowerCase && 
               hasNumber && 
               hasSpecialChar,
        message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
    };
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    let isFormValid = true;

    // Clear previous error states
    form.querySelectorAll('input').forEach(clearError);

    // Validate password
    const passwordValidation = validatePassword(password.value);
    if (!passwordValidation.valid) {
        showError(password, passwordValidation.message);
        isFormValid = false;
    }

    // Confirm password match
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isFormValid = false;
    }

    // Optional: Add more input validations here
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            showError(input, input.validationMessage);
            isFormValid = false;
        }
    });

    if (isFormValid) {
        console.log('Form is valid');
        // Uncomment to submit form
        form.submit();
    }
});

// Optional: Add real-time validation
form.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        clearError(input);
    });
});
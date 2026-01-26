/**
 * Login Module
 * Handles user authentication interactions on the frontend.
 */
class LoginHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) {
             console.error('Login form not found');
             return;
        }

        this.messageElement = document.getElementById('message');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.submitButton = this.form.querySelector('button[type="submit"]');

        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add real-time validation listeners
        this.emailInput.addEventListener('input', () => this.validateEmail());
        this.passwordInput.addEventListener('input', () => this.validatePassword());
    }

    validateEmail() {
        const email = this.emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            this.showError(this.emailInput, 'Please enter a valid email address.');
            return false;
        } else {
            this.clearError(this.emailInput);
            return true;
        }
    }

    validatePassword() {
        const password = this.passwordInput.value;
        
        // Requirement: Min 6 chars (matching HTML minlength), at least one number
        if (password.length < 6) {
            this.showError(this.passwordInput, 'Password must be at least 6 characters.');
            return false;
        }
        
        if (!/\d/.test(password)) {
            this.showError(this.passwordInput, 'Password must contain at least one number.');
            return false;
        }

        this.clearError(this.passwordInput);
        return true;
    }

    showError(element, message) {
        const parent = element.parentElement;
        let errorDiv = parent.querySelector('.error-message');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = '#dc3545'; // Bootstrap danger color
            errorDiv.style.fontSize = '0.875em';
            errorDiv.style.marginTop = '0.25rem';
            parent.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        element.style.borderColor = '#dc3545';
        element.style.outlineColor = '#dc3545';
    }

    clearError(element) {
        const parent = element.parentElement;
        const errorDiv = parent.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        element.style.borderColor = ''; // Reset to default
        element.style.outlineColor = '';
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        this.messageElement.textContent = '';
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();

        if (isEmailValid && isPasswordValid) {
            this.submitButton.disabled = true;
            const originalBtnText = this.submitButton.textContent;
            this.submitButton.textContent = 'Logging in...';

            try {
                // Simulate API call to backend
                // In future: const response = await fetch('/api/login', ...);
                await new Promise(resolve => setTimeout(resolve, 800));
                
                console.log('Login successful for:', this.emailInput.value);
                this.messageElement.textContent = 'Login Logic Simulated Successfully! Redirecting...';
                this.messageElement.style.color = 'green';
                
            } catch (error) {
                console.error('Login error:', error);
                this.messageElement.textContent = 'An error occurred during login.';
                this.messageElement.style.color = 'red';
            } finally {
                this.submitButton.disabled = false;
                this.submitButton.textContent = originalBtnText;
            }
        } else {
             this.messageElement.textContent = 'Please fix the errors above.';
             this.messageElement.style.color = 'red';
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new LoginHandler('loginForm');
});

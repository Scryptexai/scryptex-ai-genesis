
/**
 * Input Validation Utilities
 * 
 * Blueprint for validation helper functions
 * NOT FOR EXECUTION - Structure representation only
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {{ isValid: boolean, message?: string }} - Validation result
 */
const validatePassword = (password: string): { isValid: boolean, message?: string } => {
  if (password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters" };
  }
  
  // Check for complexity requirements
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
  if (!(hasUppercase && hasLowercase && (hasNumber || hasSpecial))) {
    return { 
      isValid: false, 
      message: "Password must include uppercase, lowercase, and either numbers or special characters" 
    };
  }
  
  return { isValid: true };
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - Whether URL is valid
 */
const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Validate credit amount
 * @param {number} amount - Credit amount to validate
 * @returns {{ isValid: boolean, message?: string }} - Validation result
 */
const validateCreditAmount = (amount: number): { isValid: boolean, message?: string } => {
  if (!Number.isInteger(amount) || amount <= 0) {
    return { isValid: false, message: "Credit amount must be a positive integer" };
  }
  
  return { isValid: true };
};

export { isValidEmail, validatePassword, isValidURL, validateCreditAmount };

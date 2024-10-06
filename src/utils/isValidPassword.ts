/**
 * Validates whether a password meets the specified criteria for complexity.
 * 
 * @param {string} password - The password to validate.
 * @returns {boolean} Returns true if the password meets the complexity criteria, otherwise false.
 */
const isValidPassword = (password: string): boolean => {
    // Minimum length required for the password
    const minLength = 8;

    // Check if the password length meets the minimum length requirement
    if (password.length < minLength) return false;

    // Regular expression for complex password criteria:
    // - At least one lowercase letter
    // - At least one uppercase letter
    // - At least one digit
    // - At least one special character from the provided set
    const complexRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    // Check if the password matches the complex regex pattern
    return complexRegex.test(password);
};

export default isValidPassword;
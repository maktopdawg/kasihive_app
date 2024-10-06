/**
 * Validates whether an email address is in a correct format and belongs to an allowed domain.
 * 
 * @param {string} email - The email address to validate.
 * @returns {boolean} Returns true if the email address is valid and belongs to an allowed domain, otherwise false.
 */
const isValidEmail = (email: string): boolean => {
    // Regular expression pattern for validating email format
    const emailRegex: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    
    // Array of allowed domains
    const allowedDomains = ['gmail.com', 'outlook.com'];

    // Check if the email format matches the regular expression
    if (!emailRegex.test(email)) return false;

    // Split the email address by '@' to extract the domain
    const [, domain] = email.split('@');

    // Check if the domain is one of the allowed domains
    return allowedDomains.includes(domain);
}

export default isValidEmail;
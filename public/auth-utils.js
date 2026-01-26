/**
 * Common Authentication Utility Functions
 */

/**
 * Validates an email format securely.
 * @param {string} email 
 * @returns {boolean}
 */
export function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Checks password strength.
 * @param {string} password 
 * @returns {Object} { isValid: boolean, message: string }
 */
export function basicPasswordCheck(password) {
    if (password.length < 8) return { isValid: false, message: 'Too short' };
    if (!/\d/.test(password)) return { isValid: false, message: 'Missing number' };
    return { isValid: true, message: 'OK' };
}

/**
 * Mock function to parse a JWT token (stub).
 * @param {string} token 
 * @returns {Object|null}
 */
export function parseToken(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

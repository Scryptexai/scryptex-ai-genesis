/**
 * Format success response
 * @param {*} data - Response data
 * @param {string} message - Success message
 * @returns {Object} - Formatted response object
 */
exports.success = (data, message = 'Operation successful') => {
    return {
      status: 'success',
      message,
      data
    };
  };
  
  /**
   * Format error response
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @returns {Object} - Formatted error object
   */
  exports.error = (message, statusCode = 400) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  };
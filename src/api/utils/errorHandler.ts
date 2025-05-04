
/**
 * Error Handler Utilities
 * 
 * Blueprint for error handling helper functions
 * NOT FOR EXECUTION - Structure representation only
 */

// Custom error types
class ApiError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

class ValidationError extends ApiError {
  errors: Record<string, string>;
  
  constructor(message: string, errors: Record<string, string>) {
    super(message, 400);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

class AuthenticationError extends ApiError {
  constructor(message: string = 'Authentication required') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

class AuthorizationError extends ApiError {
  constructor(message: string = 'Not authorized') {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

class ResourceNotFoundError extends ApiError {
  constructor(resource: string) {
    super(`${resource} not found`, 404);
    this.name = 'ResourceNotFoundError';
  }
}

class InsufficientCreditsError extends ApiError {
  required: number;
  available: number;
  
  constructor(required: number, available: number) {
    super(`Insufficient credits: ${required} required, ${available} available`, 402);
    this.name = 'InsufficientCreditsError';
    this.required = required;
    this.available = available;
  }
}

/**
 * Global error handler middleware
 */
const errorHandler = (err: any, req: any, res: any, next: any) => {
  console.error(err);
  
  // Handle specific error types
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err instanceof ValidationError && { errors: err.errors }),
      ...(err instanceof InsufficientCreditsError && { 
        required: err.required,
        available: err.available
      })
    });
  }
  
  // Handle unexpected errors
  return res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
};

export { 
  ApiError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  ResourceNotFoundError,
  InsufficientCreditsError,
  errorHandler
};

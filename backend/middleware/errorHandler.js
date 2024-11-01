// backend/middleware/errorHandler.js

// Custom error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log error stack for debugging

    // Set default error response
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || 'An unexpected error occurred';

    // Handle specific types of errors
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(error => error.message).join(', ');
    } else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    } else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    } else if (err.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};

module.exports = errorHandler;


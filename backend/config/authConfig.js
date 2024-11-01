// backend/config/authConfig.js

const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();

module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'your-default-secret-key', // Secret key for JWT
    jwtExpiration: process.env.JWT_EXPIRATION || '1d', // Token expiration time (default: 1 day)
};


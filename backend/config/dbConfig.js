// backend/config/dbConfig.js

const mongoose = require('mongoose');

// Database connection configuration
const dbConfig = {
    url: process.env.DB_URL || 'mongodb://localhost:27017/vehicleTrackingSystem', // Default to local MongoDB if not specified
};

// Connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(dbConfig.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = {
    connectDB,
};

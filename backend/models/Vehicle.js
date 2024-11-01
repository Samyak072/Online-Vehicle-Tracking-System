// backend/models/Vehicle.js

const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleId: {
        type: String,
        required: true,
        unique: true, // Ensures that vehicle IDs are unique
    },
    ownerId: {
        type: String,
        required: true, // Reference to the user who owns the vehicle
    },
    make: {
        type: String,
        required: true, // Vehicle manufacturer
    },
    model: {
        type: String,
        required: true, // Vehicle model
    },
    year: {
        type: Number,
        required: true, // Year of manufacture
    },
    licensePlate: {
        type: String,
        required: true,
        unique: true, // Ensures that license plates are unique
    },
    color: {
        type: String,
        required: true, // Vehicle color
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance'], // Status of the vehicle
        default: 'active', // Default status is active
    },
    lastLocation: {
        type: {
            type: String,
            enum: ['Point'], // Define the location type as Point
            required: true,
        },
        coordinates: {
            type: [Number], // Longitude and latitude
            required: true,
        },
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create a 2dsphere index for geolocation queries
vehicleSchema.index({ lastLocation: '2dsphere' });

module.exports = mongoose.model('Vehicle', vehicleSchema);


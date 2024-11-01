// backend/models/Alert.js

const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    vehicleId: {
        type: String,
        required: true,
    },
    alertType: {
        type: String,
        required: true,
        enum: ['Speeding', 'Route Deviation', 'Low Battery', 'Geofence Alert'], // Example alert types
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: 'Active',
        enum: ['Active', 'Resolved'], // Status of the alert
    },
    resolvedAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('Alert', alertSchema);


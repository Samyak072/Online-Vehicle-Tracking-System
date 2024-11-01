// server/models/Vehicle.js

const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const vehicleSchema = new mongoose.Schema({
    vehicleId: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: locationSchema,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;


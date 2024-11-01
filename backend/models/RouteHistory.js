// backend/models/RouteHistory.js

const mongoose = require('mongoose');

const routeHistorySchema = new mongoose.Schema({
    vehicleId: {
        type: String,
        required: true,
    },
    startLocation: {
        type: String,
        required: true,
    },
    endLocation: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    distance: {
        type: Number, // Distance in kilometers or miles
        required: true,
    },
    routeCoordinates: {
        type: [[Number]], // Array of [latitude, longitude] pairs
        required: true,
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model('RouteHistory', routeHistorySchema);


// backend/models/Report.js

const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    vehicleId: {
        type: String,
        required: true,
    },
    reportType: {
        type: String,
        required: true,
        enum: ['Incident', 'Maintenance', 'Theft', 'Accident'], // Example report types
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: 'Open', // Status can be Open, In Progress, or Closed
        enum: ['Open', 'In Progress', 'Closed'],
    },
    resolvedAt: {
        type: Date,
        default: null,
    },
    userId: {
        type: String,
        required: true, // User who created the report
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model('Report', reportSchema);


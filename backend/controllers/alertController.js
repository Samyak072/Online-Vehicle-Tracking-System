// backend/controllers/alertController.js

const Alert = require('../models/Alert'); // Assuming an Alert model is defined in the models folder

// Create a new alert
exports.createAlert = async (req, res) => {
    try {
        const { vehicleId, type, message, location, severity } = req.body;
        const newAlert = new Alert({
            vehicleId,
            type,
            message,
            location,
            severity,
            timestamp: new Date(),
        });
        
        const savedAlert = await newAlert.save();
        res.status(201).json(savedAlert);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create alert', message: error.message });
    }
};

// Get all alerts
exports.getAllAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find().sort({ timestamp: -1 }); // Sort by latest
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve alerts', message: error.message });
    }
};

// Get alerts for a specific vehicle
exports.getVehicleAlerts = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const vehicleAlerts = await Alert.find({ vehicleId }).sort({ timestamp: -1 });
        res.status(200).json(vehicleAlerts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve vehicle alerts', message: error.message });
    }
};

// Delete an alert
exports.deleteAlert = async (req, res) => {
    try {
        const { alertId } = req.params;
        const deletedAlert = await Alert.findByIdAndDelete(alertId);
        if (deletedAlert) {
            res.status(200).json({ message: 'Alert deleted successfully' });
        } else {
            res.status(404).json({ message: 'Alert not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete alert', message: error.message });
    }
};



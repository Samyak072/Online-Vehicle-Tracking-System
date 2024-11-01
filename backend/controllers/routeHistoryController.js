// backend/controllers/routeHistoryController.js

const RouteHistory = require('../models/RouteHistory'); // Assuming you have a RouteHistory model

// Add a new route history entry for a vehicle
exports.addRouteHistory = async (req, res) => {
    try {
        const { vehicleId, startLocation, endLocation, route, timestamp } = req.body;

        const newRouteHistory = new RouteHistory({
            vehicleId,
            startLocation,
            endLocation,
            route,        // This could be an array of GPS points or coordinates
            timestamp: timestamp || new Date(),
        });

        const savedRouteHistory = await newRouteHistory.save();
        res.status(201).json(savedRouteHistory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add route history', message: error.message });
    }
};

// Get all route history entries
exports.getAllRouteHistories = async (req, res) => {
    try {
        const routeHistories = await RouteHistory.find().sort({ timestamp: -1 }); // Sorted by latest
        res.status(200).json(routeHistories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve route histories', message: error.message });
    }
};

// Get route history for a specific vehicle
exports.getRouteHistoryByVehicleId = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const vehicleRouteHistory = await RouteHistory.find({ vehicleId }).sort({ timestamp: -1 });
        res.status(200).json(vehicleRouteHistory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve vehicle route history', message: error.message });
    }
};

// Delete route history for a specific route history ID
exports.deleteRouteHistory = async (req, res) => {
    try {
        const { routeHistoryId } = req.params;
        const deletedRouteHistory = await RouteHistory.findByIdAndDelete(routeHistoryId);

        if (deletedRouteHistory) {
            res.status(200).json({ message: 'Route history deleted successfully' });
        } else {
            res.status(404).json({ message: 'Route history not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete route history', message: error.message });
    }
};


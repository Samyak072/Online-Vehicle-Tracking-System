// server/routes/vehicleRoutes.js

const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Route to get real-time locations of all vehicles
router.get('/real-time-locations', vehicleController.getRealTimeLocations);

// Route to get historical data for a specific vehicle
router.get('/history', vehicleController.getVehicleHistory);

// Route to set a geofence for a specific vehicle
router.post('/geofence', vehicleController.setGeofence);

// Route to check if a vehicle is inside or outside a geofence
router.get('/geofence-status', vehicleController.checkGeofenceStatus);

module.exports = router;


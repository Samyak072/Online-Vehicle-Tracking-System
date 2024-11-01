// backend/routes/vehicleRoutes.js

const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const { authenticate } = require('../middleware/authMiddleware');

// Route to create a new vehicle
router.post('/', authenticate, vehicleController.createVehicle);

// Route to get all vehicles
router.get('/', authenticate, vehicleController.getAllVehicles);

// Route to get a specific vehicle by ID
router.get('/:id', authenticate, vehicleController.getVehicleById);

// Route to update a vehicle by ID
router.put('/:id', authenticate, vehicleController.updateVehicle);

// Route to delete a vehicle by ID
router.delete('/:id', authenticate, vehicleController.deleteVehicle);

module.exports = router;


// backend/controllers/vehicleController.js

const Vehicle = require('../models/Vehicle'); // Assuming a Vehicle model is defined

// Add a new vehicle
exports.addVehicle = async (req, res) => {
    try {
        const { vehicleId, model, owner, registrationNumber, status } = req.body;

        // Create a new vehicle entry
        const newVehicle = new Vehicle({
            vehicleId,
            model,
            owner,
            registrationNumber,
            status: status || 'Active', // Default to 'Active' if not provided
        });

        const savedVehicle = await newVehicle.save();
        res.status(201).json(savedVehicle);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add vehicle', message: error.message });
    }
};

// Get all vehicles
exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find().sort({ createdAt: -1 }); // Sorted by latest added
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve vehicles', message: error.message });
    }
};

// Get a specific vehicle by ID
exports.getVehicleById = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const vehicle = await Vehicle.findOne({ vehicleId });

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve vehicle', message: error.message });
    }
};

// Update vehicle details
exports.updateVehicle = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const updateData = req.body;

        const updatedVehicle = await Vehicle.findOneAndUpdate(
            { vehicleId },
            updateData,
            { new: true } // Return the updated document
        );

        if (!updatedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update vehicle', message: error.message });
    }
};

// Delete a vehicle
exports.deleteVehicle = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const deletedVehicle = await Vehicle.findOneAndDelete({ vehicleId });

        if (!deletedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete vehicle', message: error.message });
    }
};


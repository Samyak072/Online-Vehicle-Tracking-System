// server/controllers/vehicleController.js

const Vehicle = require('../models/Vehicle'); // Assuming you have a Vehicle model
const Geofence = require('../models/Geofence'); // Assuming you have a Geofence model

// Get real-time location of all vehicles
exports.getRealTimeLocations = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({}, 'location'); // Only select the 'location' field
        res.json(vehicles);
    } catch (error) {
        console.error('Error fetching real-time locations:', error);
        res.status(500).json({ message: 'Error fetching real-time locations' });
    }
};

// Get historical data for a specific vehicle
exports.getVehicleHistory = async (req, res) => {
    const { vehicleId, startDate, endDate } = req.query;

    try {
        const history = await Vehicle.find({
            _id: vehicleId,
            'location.timestamp': { $gte: new Date(startDate), $lte: new Date(endDate) }
        }, 'location');

        res.json(history);
    } catch (error) {
        console.error('Error fetching vehicle history:', error);
        res.status(500).json({ message: 'Error fetching vehicle history' });
    }
};

// Set up a geofence for a vehicle
exports.setGeofence = async (req, res) => {
    const { vehicleId, latitude, longitude, radius } = req.body;

    try {
        const geofence = new Geofence({
            vehicleId,
            center: { latitude, longitude },
            radius
        });
        await geofence.save();
        res.status(201).json({ message: 'Geofence created successfully', geofence });
    } catch (error) {
        console.error('Error setting geofence:', error);
        res.status(500).json({ message: 'Error setting geofence' });
    }
};

// Check if a vehicle has entered or exited a geofence
exports.checkGeofenceStatus = async (req, res) => {
    const { vehicleId } = req.query;

    try {
        const geofence = await Geofence.findOne({ vehicleId });
        const vehicle = await Vehicle.findById(vehicleId);

        if (!geofence || !vehicle) {
            return res.status(404).json({ message: 'Geofence or vehicle not found' });
        }

        const distance = calculateDistance(
            geofence.center.latitude,
            geofence.center.longitude,
            vehicle.location.latitude,
            vehicle.location.longitude
        );

        const status = distance <= geofence.radius ? 'inside' : 'outside';
        res.json({ status, distance });
    } catch (error) {
        console.error('Error checking geofence status:', error);
        res.status(500).json({ message: 'Error checking geofence status' });
    }
};

// Utility function to calculate distance between two points
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = angle => (Math.PI / 180) * angle;
    const R = 6371; // Radius of the Earth in km

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Returns distance in meters
};


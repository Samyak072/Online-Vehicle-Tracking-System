// client/src/api/api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Base URL for backend API

// Get real-time vehicle data
export const getVehicleData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/vehicles`);
        return response.data;
    } catch (error) {
        console.error('Error fetching vehicle data:', error);
        throw error;
    }
};

// Set up a geofence with given parameters (latitude, longitude, radius)
export const setGeofence = async (latitude, longitude, radius) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/geofence`, {
            latitude,
            longitude,
            radius
        });
        return response.data;
    } catch (error) {
        console.error('Error setting up geofence:', error);
        throw error;
    }
};

// Get historical data for a specific vehicle over a date range
export const getHistoricalData = async (vehicleId, startDate, endDate) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/historical`, {
            params: { vehicleId, startDate, endDate }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching historical data:', error);
        throw error;
    }
};

// Get real-time traffic data
export const getTrafficData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/traffic`);
        return response.data;
    } catch (error) {
        console.error('Error fetching traffic data:', error);
        throw error;
    }
};

// Update vehicle maintenance status
export const updateMaintenanceStatus = async (vehicleId, status) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/maintenance/${vehicleId}`, { status });
        return response.data;
    } catch (error) {
        console.error('Error updating maintenance status:', error);
        throw error;
    }
};


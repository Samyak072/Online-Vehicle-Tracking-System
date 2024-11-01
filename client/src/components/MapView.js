// client/src/components/MapView.js
import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapView = () => {
    const [vehicles, setVehicles] = useState([]); // Store vehicle locations
    const [selectedVehicle, setSelectedVehicle] = useState(null); // Selected vehicle for Popup

    // Fetch vehicle data from backend API
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get('/api/vehicles'); // Backend API to get vehicle data
                setVehicles(response.data);
            } catch (error) {
                console.error('Error fetching vehicle data:', error);
            }
        };

        fetchVehicles();

        // Set up interval to fetch real-time data every 5 seconds
        const interval = setInterval(fetchVehicles, 5000);
        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    return (
        <Map
            initialViewState={{
                latitude: 37.7749,   // Default latitude
                longitude: -122.4194, // Default longitude
                zoom: 10,
            }}
            style={{ width: '100%', height: '600px' }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
            {vehicles.map(vehicle => (
                <Marker
                    key={vehicle.id}
                    latitude={vehicle.location.latitude}
                    longitude={vehicle.location.longitude}
                    onClick={() => setSelectedVehicle(vehicle)}
                >
                    <img src="/vehicle-icon.png" alt="Vehicle Icon" style={{ width: '20px', height: '20px' }} />
                </Marker>
            ))}

            {selectedVehicle && (
                <Popup
                    latitude={selectedVehicle.location.latitude}
                    longitude={selectedVehicle.location.longitude}
                    onClose={() => setSelectedVehicle(null)}
                >
                    <div>
                        <h4>Vehicle ID: {selectedVehicle.id}</h4>
                        <p>Latitude: {selectedVehicle.location.latitude}</p>
                        <p>Longitude: {selectedVehicle.location.longitude}</p>
                    </div>
                </Popup>
            )}
        </Map>
    );
};

export default MapView;


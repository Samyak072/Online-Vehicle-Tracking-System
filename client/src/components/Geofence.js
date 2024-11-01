// client/src/components/Geofence.js

import React, { useState, useEffect } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';

const Geofence = () => {
    const [geofence, setGeofence] = useState(null); // Geofence area
    const [vehicles, setVehicles] = useState([]); // Vehicle positions
    const [geofenceParams, setGeofenceParams] = useState({
        latitude: '',
        longitude: '',
        radius: 1000 // Default radius in meters
    });

    // Fetch real-time vehicle data
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get('/api/vehicles'); // Backend route to get vehicle data
                setVehicles(response.data);
            } catch (error) {
                console.error('Error fetching vehicle data:', error);
            }
        };

        fetchVehicles();
        const interval = setInterval(fetchVehicles, 5000); // Refresh every 5 seconds
        return () => clearInterval(interval); // Clear on unmount
    }, []);

    // Handle geofence parameter change
    const handleInputChange = (e) => {
        setGeofenceParams({ ...geofenceParams, [e.target.name]: e.target.value });
    };

    // Set up geofence circle on the map
    const handleSetGeofence = () => {
        const { latitude, longitude, radius } = geofenceParams;
        setGeofence({
            center: [parseFloat(longitude), parseFloat(latitude)],
            radius: parseInt(radius)
        });
    };

    // Check if vehicles are inside the geofence
    useEffect(() => {
        if (geofence) {
            vehicles.forEach((vehicle) => {
                const distance = getDistance(
                    geofence.center[1],
                    geofence.center[0],
                    vehicle.location.latitude,
                    vehicle.location.longitude
                );

                if (distance <= geofence.radius) {
                    console.log(`Vehicle ${vehicle.id} is inside the geofence`);
                    // Optional: Trigger backend notification here
                }
            });
        }
    }, [geofence, vehicles]);

    // Utility function to calculate distance between two points
    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3; // Earth's radius in meters
        const φ1 = (lat1 * Math.PI) / 180;
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in meters
    };

    return (
        <div>
            <h3>Set Geofence</h3>
            <div>
                <label>
                    Latitude:
                    <input
                        type="number"
                        name="latitude"
                        value={geofenceParams.latitude}
                        onChange={handleInputChange}
                        placeholder="Enter Latitude"
                    />
                </label>
                <label>
                    Longitude:
                    <input
                        type="number"
                        name="longitude"
                        value={geofenceParams.longitude}
                        onChange={handleInputChange}
                        placeholder="Enter Longitude"
                    />
                </label>
                <label>
                    Radius (m):
                    <input
                        type="number"
                        name="radius"
                        value={geofenceParams.radius}
                        onChange={handleInputChange}
                        placeholder="Enter Radius in Meters"
                    />
                </label>
                <button onClick={handleSetGeofence}>Set Geofence</button>
            </div>

            <Map
                initialViewState={{
                    latitude: 37.7749,
                    longitude: -122.4194,
                    zoom: 10,
                }}
                style={{ width: '100%', height: '600px' }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            >
                {geofence && (
                    <Source
                        id="geofence"
                        type="geojson"
                        data={{
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: geofence.center,
                            },
                        }}
                    >
                        <Layer
                            id="geofence-circle"
                            type="circle"
                            paint={{
                                'circle-radius': geofence.radius / 100, // Scale for map visualization
                                'circle-color': 'rgba(255, 0, 0, 0.3)',
                            }}
                        />
                    </Source>
                )}

                {vehicles.map((vehicle) => (
                    <Marker
                        key={vehicle.id}
                        latitude={vehicle.location.latitude}
                        longitude={vehicle.location.longitude}
                    >
                        <div style={{ width: '8px', height: '8px', backgroundColor: 'blue', borderRadius: '50%' }}></div>
                    </Marker>
                ))}
            </Map>
        </div>
    );
};

export default Geofence;


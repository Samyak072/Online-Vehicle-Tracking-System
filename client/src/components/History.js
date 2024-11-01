// client/src/components/History.js

import React, { useState, useEffect } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';

const History = () => {
    const [historyData, setHistoryData] = useState([]);
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [selectedVehicleId, setSelectedVehicleId] = useState('');

    // Fetch historical data from backend API
    const fetchHistoryData = async () => {
        if (!selectedVehicleId || !dateRange.start || !dateRange.end) return;

        try {
            const response = await axios.get('/api/vehicles/history', {
                params: {
                    vehicleId: selectedVehicleId,
                    startDate: dateRange.start,
                    endDate: dateRange.end
                }
            });
            setHistoryData(response.data);
        } catch (error) {
            console.error('Error fetching historical data:', error);
        }
    };

    // Handle form submit for fetching history
    const handleFetchHistory = (e) => {
        e.preventDefault();
        fetchHistoryData();
    };

    return (
        <div>
            <form onSubmit={handleFetchHistory}>
                <label>
                    Vehicle ID:
                    <input
                        type="text"
                        value={selectedVehicleId}
                        onChange={(e) => setSelectedVehicleId(e.target.value)}
                        placeholder="Enter Vehicle ID"
                    />
                </label>
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    />
                </label>
                <button type="submit">Fetch History</button>
            </form>

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
                {historyData.map((location, index) => (
                    <Marker
                        key={index}
                        latitude={location.latitude}
                        longitude={location.longitude}
                    >
                        <div style={{ width: '8px', height: '8px', backgroundColor: 'blue', borderRadius: '50%' }}></div>
                    </Marker>
                ))}

                {historyData.length > 1 && (
                    <Source
                        id="route"
                        type="geojson"
                        data={{
                            type: 'Feature',
                            geometry: {
                                type: 'LineString',
                                coordinates: historyData.map((location) => [
                                    location.longitude,
                                    location.latitude,
                                ]),
                            },
                        }}
                    >
                        <Layer
                            id="route"
                            type="line"
                            paint={{
                                'line-color': '#3b9ddd',
                                'line-width': 4,
                            }}
                        />
                    </Source>
                )}
            </Map>
        </div>
    );
};

export default History;


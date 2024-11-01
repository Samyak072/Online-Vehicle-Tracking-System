// backend/utils/geofenceUtils.js

/**
 * Checks if a point is inside a polygon using the ray-casting algorithm.
 * 
 * @param {Object} point - The point to check (e.g., { latitude, longitude }).
 * @param {Array} polygon - An array of points defining the polygon (e.g., [{ lat, lng }, ...]).
 * @returns {boolean} - Returns true if the point is inside the polygon, false otherwise.
 */
const isPointInPolygon = (point, polygon) => {
    let isInside = false;
    const { latitude, longitude } = point;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const { lat: lat1, lng: lng1 } = polygon[i];
        const { lat: lat2, lng: lng2 } = polygon[j];

        const intersect = ((lat1 > latitude) !== (lat2 > latitude)) &&
                          (longitude < (lng2 - lng1) * (latitude - lat1) / (lat2 - lat1) + lng1);
        if (intersect) isInside = !isInside;
    }

    return isInside;
};

/**
 * Calculates the distance between two geographical points using the Haversine formula.
 * 
 * @param {Object} point1 - The first point (e.g., { latitude, longitude }).
 * @param {Object} point2 - The second point (e.g., { latitude, longitude }).
 * @returns {number} - The distance between the two points in kilometers.
 */
const haversineDistance = (point1, point2) => {
    const toRad = (value) => (Math.PI / 180) * value;

    const lat1 = toRad(point1.latitude);
    const lat2 = toRad(point2.latitude);
    const deltaLat = toRad(point2.latitude - point1.latitude);
    const deltaLng = toRad(point2.longitude - point1.longitude);

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const radiusOfEarth = 6371; // Radius of Earth in kilometers

    return radiusOfEarth * c; // Distance in kilometers
};

module.exports = {
    isPointInPolygon,
    haversineDistance,
};


// backend/utils/analyticsUtils.js

/**
 * Calculates the average speed of a vehicle based on distance and time.
 * 
 * @param {number} distance - The distance traveled by the vehicle in kilometers.
 * @param {number} time - The time taken in hours.
 * @returns {number} - The average speed in kilometers per hour (km/h).
 */
const calculateAverageSpeed = (distance, time) => {
    if (time <= 0) {
        throw new Error('Time must be greater than zero.');
    }
    return distance / time;
};

/**
 * Generates a report of vehicle usage based on provided data.
 * 
 * @param {Array} usageData - An array of usage data objects containing vehicle ID and time.
 * @returns {Object} - An object containing summary statistics of the vehicle usage.
 */
const generateUsageReport = (usageData) => {
    const report = {
        totalVehicles: 0,
        totalUsageTime: 0,
        averageUsageTime: 0,
    };

    if (usageData.length > 0) {
        report.totalVehicles = usageData.length;
        report.totalUsageTime = usageData.reduce((total, entry) => total + entry.time, 0);
        report.averageUsageTime = report.totalUsageTime / report.totalVehicles;
    }

    return report;
};

/**
 * Formats a date into a more readable format.
 * 
 * @param {Date} date - The date object to format.
 * @returns {string} - The formatted date string.
 */
const formatDate = (date) => {
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

module.exports = {
    calculateAverageSpeed,
    generateUsageReport,
    formatDate,
};


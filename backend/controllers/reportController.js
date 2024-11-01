// backend/controllers/reportController.js

const Report = require('../models/Report'); // Assuming a Report model is defined in the models folder

// Create a new report
exports.createReport = async (req, res) => {
    try {
        const { vehicleId, reportType, description, location, status } = req.body;

        // Create a new report with the provided details
        const newReport = new Report({
            vehicleId,
            reportType,
            description,
            location,
            status,
            createdAt: new Date(),
        });

        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create report', message: error.message });
    }
};

// Get all reports
exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 }); // Sorted by latest first
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve reports', message: error.message });
    }
};

// Get reports for a specific vehicle
exports.getReportsByVehicleId = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const vehicleReports = await Report.find({ vehicleId }).sort({ createdAt: -1 });
        res.status(200).json(vehicleReports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve vehicle reports', message: error.message });
    }
};

// Delete a specific report by report ID
exports.deleteReport = async (req, res) => {
    try {
        const { reportId } = req.params;
        const deletedReport = await Report.findByIdAndDelete(reportId);

        if (deletedReport) {
            res.status(200).json({ message: 'Report deleted successfully' });
        } else {
            res.status(404).json({ message: 'Report not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete report', message: error.message });
    }
};


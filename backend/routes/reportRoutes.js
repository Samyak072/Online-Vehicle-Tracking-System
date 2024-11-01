// backend/routes/reportRoutes.js

const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticate } = require('../middleware/authMiddleware');

// Route to create a new report
router.post('/', authenticate, reportController.createReport);

// Route to get all reports
router.get('/', authenticate, reportController.getAllReports);

// Route to get a specific report by ID
router.get('/:id', authenticate, reportController.getReportById);

// Route to update a report by ID
router.put('/:id', authenticate, reportController.updateReport);

// Route to delete a report by ID
router.delete('/:id', authenticate, reportController.deleteReport);

module.exports = router;


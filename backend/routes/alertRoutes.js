// backend/routes/alertRoutes.js

const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const { authenticate } = require('../middleware/authMiddleware');

// Route to create a new alert
router.post('/', authenticate, alertController.createAlert);

// Route to get all alerts
router.get('/', authenticate, alertController.getAllAlerts);

// Route to get a specific alert by ID
router.get('/:id', authenticate, alertController.getAlertById);

// Route to update an alert by ID
router.put('/:id', authenticate, alertController.updateAlert);

// Route to delete an alert by ID
router.delete('/:id', authenticate, alertController.deleteAlert);

module.exports = router;


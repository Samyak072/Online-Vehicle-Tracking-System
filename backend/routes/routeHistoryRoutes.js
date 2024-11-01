// backend/routes/routeHistoryRoutes.js

const express = require('express');
const router = express.Router();
const routeHistoryController = require('../controllers/routeHistoryController');
const { authenticate } = require('../middleware/authMiddleware');

// Route to create a new route history entry
router.post('/', authenticate, routeHistoryController.createRouteHistory);

// Route to get all route history entries
router.get('/', authenticate, routeHistoryController.getAllRouteHistories);

// Route to get a specific route history entry by ID
router.get('/:id', authenticate, routeHistoryController.getRouteHistoryById);

// Route to update a route history entry by ID
router.put('/:id', authenticate, routeHistoryController.updateRouteHistory);

// Route to delete a route history entry by ID
router.delete('/:id', authenticate, routeHistoryController.deleteRouteHistory);

module.exports = router;


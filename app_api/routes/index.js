const express = require('express');
const router = express.Router();

//This is where we import the controllers we will route
const tripsController = require('../controllers/trips');

//define route for our trips endpoint
router
        .route("/trips")
        .get(tripsController.tripsList);

// GET Method routes tripsFindByCode - requires parameter
router
        .route("/trips/:tripCode")
        .get(tripsController.tripsFindByCode);     //This is where we route our requests to the appropriate controller method

module.exports = router;
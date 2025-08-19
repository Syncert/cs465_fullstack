const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens

//This is where we import the controllers we will route
const tripsController = require('../controllers/trip');
const authController = require("../controllers/authentication");

// ---- JWT middleware (define ABOVE route uses) ----
function authenticateJWT(req, res, next) {
  const auth = req.headers.authorization || '';
  const [scheme, token] = auth.split(' ');

  if ((scheme || '').toLowerCase() !== 'bearer' || !token) {
    return res.status(401).json({ message: 'Missing or malformed Authorization header' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

//AUTHENTICATION ROUTING//

// /register //
// POST method routes register
router
        .route("/register")
        .post(authController.register);

// POST method routes login
router
        .route("/login")
        .post(authController.login);

// /trips ROUTING//

// GET Method routes tripsList
// POST Method routes tripsAddTrip - requires auth
router
        .route("/trips")
        .get(tripsController.tripsList)
        .post(authenticateJWT, tripsController.tripsAddTrip);

// /trips/:tripCode ROUTING//

// GET Method routes tripsFindByCode - requires parameter
// PUT Method routes tripsUpdateTrip - requires parameter and auth
// DELETE Method routes tripsDeleteTrip - requires parameter and auth
router
        .route("/trips/:tripCode")
        .get(tripsController.tripsFindByCode)
        .put(authenticateJWT, tripsController.tripsUpdateTrip)
        .delete(authenticateJWT, tripsController.tripsDeleteTrip);

module.exports = router;
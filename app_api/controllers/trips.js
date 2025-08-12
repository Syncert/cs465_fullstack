const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcome , response must include HTML status code
// and JSON message as the requesting client
const tripsList = async(req, res) => {
    const q = await Model
    .find({}) //No filter, return all records
    .exec();

    // Uncomment the following line to show results of query
    // on the console
    // console.log(q);

    if(!q)
    { //Database returned no data
        return res
            .status(404) //HTTP status code 404: Not Found
            .json(err);
    } else { //return resulting trip list
        return res
            .status(200) //HTTP status code 200: OK
            .json(q);
    }
    };

// GET: /trips - lists all the trips
// Regardless of outcome , response must include HTML status code
// and JSON message as the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
    .find({'code' : req.params.tripCode}) //Return single record
    .exec();

    // Uncomment the following line to show results of query
    // on the console
    // console.log(q);

    if(!q)
    { //Database returned no data
        return res
            .status(404) //HTTP status code 404: Not Found
            .json(err);
    } else { //return resulting trip list
        return res
            .status(200) //HTTP status code 200: OK
            .json(q);
    }
    };

// POST: /trips – Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async (req, res) => {
  const newTrip = new Trip({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description
  });

  const q = await newTrip.save();

  if (!q) {
    // Database returned no data
    return res
      .status(400)
      .json(err);
  } else {
    // Return new trip
    return res
      .status(201)
      .json(q);
  }

  // Uncomment the following line to show results of operation
  // on the console
  // console.log(q);
};

// PUT: /trips/:tripCode – Updates an existing Trip
// Regardless of outcome, response must include HTML status code
// and a JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
  // Uncomment for debugging
  // console.log(req.params);
  // console.log(req.body);

  try {
    const q = await Model.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
      },
      { new: true } // return the updated document
    ).exec();

    if (!q) {
      // No matching trip found
      return res.status(404).json({ message: 'Trip not found.' });
    }

    // Successfully updated trip
    return res.status(200).json(q);
  } catch (err) {
    // Handle database or validation error
    return res.status(500).json({ error: err.message });
  }

  // Uncomment the following line to show results of the operation
  // console.log(q);
};

 //DELETE: /trips/:tripCode - Deletes an existing Trip
 // Regardless of outcome, repsonse must include HTML status code and a JSON message to the requesting client

 const tripsDeleteTrip = async(req, res) => {
  // Uncomment for debugging
  // console.log(req.params);
  // console.log(req.body);
  try{
    const q = await Model
    .findOneAndDelete({'code' : req.params.tripCode}) //Return and delete single record
    .exec();

    // Uncomment the following line to show results of query
    // on the console
    // console.log(q);

    if(!q)
    { //Database returned no data
        return res
            .status(404) //HTTP status code 404: Not Found
            .json(err);
    } else { //return deleted trip
        return res
            .status(200) //HTTP status code 200: OK
            .json(q);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message});
  }

 };
    
module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};
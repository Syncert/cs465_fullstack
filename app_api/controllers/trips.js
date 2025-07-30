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

    
module.exports = {
    tripsList,
    tripsFindByCode
};
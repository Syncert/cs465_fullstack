// Bring in the DB connection and the Trip Schema
const Mongoose = require('./db');
const Trip = require('./trip');

// Read seed data from json file
var fs = require('fs');
var tripsData = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));
var trips = tripsData.trips; //extract the array


//delete any existing records then insert seed data
const seedDB = async() => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
}

// Close the MongoDB connection and exit
seedDB().then(async () => {
    await Mongoose.connections[0].close();
    process.exit(0);
});

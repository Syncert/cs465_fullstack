var fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

var tripsData = data.trips; //extract the array

/* GET travel view */
const travel = (req,res) => {
    res.render('travel', { 
        title: "Travlr Getaways", 
        tripsData
                        });
};

module.exports = {
    travel
}
var fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

var trips = data.trips; //extract the array

/* GET travel view */
const travel = (req,res) => {
    res.render('travel', { 
        title: "Travlr Getaways", 
        trips
                        });
};

module.exports = {
    travel
}
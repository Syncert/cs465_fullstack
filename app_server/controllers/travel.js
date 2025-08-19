// // Read JSON File Method
// var fs = require('fs');
// const data = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));
// var tripsData = data.trips; //extract the array

const tripsEndpoint = 'http://localhost:3000/api/trips'; 
const options = { 
method: 'GET', 
headers: { 
'Accept': 'application/json' 
} 
};

/* GET travel view */
const travel = async function (req, res, next) {
    // console.log('TRAVEL CONTROLLER BEGIN');
    await fetch(tripsEndpoint, options)
        .then((res) => res.json())
        .then((json) => {
            let message = null;
            if (!(json instanceof Array)) {
                message = "API lookup error";
                json = [];
            } else if (!json.length) {
                message = "No trips exist in our database";

            }
            // console.log(json);
            res.render("travel", {title: "Travlr Getaways", tripsData: json});
        })
        .catch((err) => res.status(500).send(err.message));
};

module.exports = {
    travel,
};
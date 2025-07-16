var fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/meals.json', 'utf8'));

var mealsData = data.meals; //extract the array

/* GET meals view */
const meals = (req,res) => {
    res.render('meals', { 
        title: "Travlr Getaways", 
        mealsData
                        });
};

module.exports = {
    meals
}
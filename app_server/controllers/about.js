var fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/about.json', 'utf8'));

var aboutData = data.about; //extract the array

/* GET about */
const about = (req,res) => {
    res.render('about', { title: "Travlr Getaways", aboutData});
};

module.exports = {
    about
}
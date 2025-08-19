var fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/contacts.json', 'utf8'));

var primaryContactData = data.primary_contact; //extract the array

/* GET contact */
const contact = (req,res) => {
    res.render('contact', { title: "Travlr Getaways", primaryContactData});
};

module.exports = {
    contact
}
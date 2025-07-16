var fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));

var roomsData = data.rooms; //extract the array

/* GET Rooms */
const rooms = (req,res) => {
    res.render('rooms', { title: "Travlr Getaways", roomsData});
};

module.exports = {
    rooms
}
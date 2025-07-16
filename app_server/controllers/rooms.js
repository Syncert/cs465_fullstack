var fs = require('fs');
var roomsData = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));

console.log(roomsData);

/* GET Rooms */
const rooms = (req,res) => {
    res.render('rooms', { title: "Travlr Getaways", roomsData});
};

module.exports = {
    rooms
}
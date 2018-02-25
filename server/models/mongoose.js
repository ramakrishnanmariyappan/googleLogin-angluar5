var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library');

var db = mongoose.connection;

db.on('error', function(err) {
    console.log('connection error' + err);
});
db.once('open', function() {
    console.log('connected successfully');    
});

module.exports = mongoose;

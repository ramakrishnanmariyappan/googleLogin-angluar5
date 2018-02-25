
var mongoose = require('./mongoose'),
    Schema = mongoose.Schema;

var postSchema = new Schema({
    title: String,
    author: String,
    isbn: String,
    description: String,
    category: String,
    image: String,
    comments: [{comment:String, commented_by: String, date: Date, rating: Number,}],
    user: [{email:String, isbn:String, from: Date, to: Date, remain: Number, favorite: Boolean}],
});

module.exports = mongoose.model('libs', postSchema);
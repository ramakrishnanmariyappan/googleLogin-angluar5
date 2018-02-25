
var mongoose = require('./mongoose'),
Schema = mongoose.Schema;

var userPostSchema = new Schema({
title: String,
author: String,
isbn: String,
description: String,
rating: Number,
category: String,
favorite: Number,
email: String
});

module.exports = mongoose.model('userposts', userPostSchema);
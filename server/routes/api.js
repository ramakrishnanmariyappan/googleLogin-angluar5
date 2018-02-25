var express = require('express');
var router = express.Router();
var db = require('../models/postSchema');
var userpost = require('../models/userpostSchema');
var moment = require('moment');

exports.viewBooks = function (req, res, next) {
  db.find({}).exec(function (err, result) {
    res.json(result)
  })
}
exports.userbookadd = function (req, res, next) {
  var newUserBook = new userpost({
    id: req.body.id,
    favorite: req.body.favorite,
    email: req.body.email,
  });
  newUserBook.save(function (error, result) {
    if (error) {
    }
    else {
      res.json({ 'response': " User Data Added Successfully" });
    }
  })
}
exports.addBook = function (req, res, next) {
  var newBook = new db({
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image
  });
  newBook.save(function (error, result) {
    if (error) {
    }
    else {
      res.json({ 'response': " Data Added Successfully" });
    }
  })
}
exports.deletebook = function (req, res, next) {
  db.remove({ _id: req.params.id }, function (error, result) {
    res.json(result);
  });
}
exports.getbook = function (req, res, next) {
  db.findById({ _id: req.params.id }, function (error, result) {
    res.json(result);
  })
}
exports.viewBook = function (req, res, next) {
  db.findById({ _id: req.params.id }, function (error, result) {
    res.json(result);
  })
}
exports.updatebook = function (req, res, next) {
  db.update({ _id: req.params.id }, {
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image
  }, function (error, result) {
    res.json(result);
  })
}
exports.saveComment = function (req, res) {
  var id = req.params.id;
  var comment = req.body.comment;
  var commented_by = req.body.commented_by;
  var rating = req.body.rating;
  var posted_date = new Date();

  db.findOne({ _id: id }, function (err, result) {
    if (err) {
    }
    else {
      result.comments.push({ comment: comment, commented_by: commented_by, date: posted_date, rating});

      result.save(function (err, saveComment) {
        if (err) {
          return res.status(500).send();
        } else {
          res.json(saveComment);
        }
      });
    }
  });
}
exports.userpost = function (req, res) {
  var id = req.params.id;
  var email = req.body.email;
  var isbn = req.body.isbn;
  var from = moment().format('L');
  var temp = moment(from).add(5, 'days');
  var to = moment(temp).format('L');
  var remain = moment(to).diff(from, 'days');
  var favorite = false;

  db.findOne({ _id: id, }, function (err, result) {
    if (err) {
    } else {
      result.user.push({ email:email, isbn:isbn, from: from, to: to, remain: remain, favorite: favorite });

      result.save(function (err, saveUser) {
        if (err) {
        } else {
          res.json(saveUser);
        }
      });
    }
  });
}
exports.returnbook = function (req, res) {
  var id = req.params.id;
  var email = req.body.email;
  var isbn = req.body.isbn;
  db.findOne({ _id: id, }, function (err, result) {
    if (err) {
    } else {
      result.user.pull({ email:email, isbn:isbn, from: from, to: to, remain: remain, favorite: favorite });

      result.save(function (err, savedStory) {
        if (err) {
        } else {
          res.json(savedStory);
        }
      });
    }
  });
}
exports.favorite = function (req, res) {
  var id = req.params.id;
  var email = req.body.email;
  var favorite = req.body.favorite;
  // console.log('req id' + req.params.id + 'emial' + req.body.email + 'favorite' + req.body.favorite);

  db.findById({ _id: id }, function (err, result) {
    if (err) {
    } else {
      console.log('result value' + result);
      result.update({"user.email" : email},{ $set : { 'user.$.favorite': favorite } } , function (err, fav) {
        if (err) {
          console.log('err' + err)
        } else {
          res.json(fav);
        }
      });
    }
  });
}
exports.returnbook = function (req, res) {
  var id = req.params.id;
  var email = req.body.email;
  var isbn = req.body.isbn

  db.findById({ _id: id }, function (err, result) {
    if (err) {
    } else {
      db.update({'user.email': req.body.email},{ $pull : {user: { 'email': email, 'isbn': isbn}}},{multi: true}, function (err, fav) {
        if (err) {
        } else {
          res.json(fav);
        }
      });
    }
  });
}
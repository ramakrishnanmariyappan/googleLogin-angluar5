// Get dependencies
const express = require('express');
const cors = require('cors')
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const moment = require('moment');

// Get our API routes
const index = require('./routes/index');
const api = require('./routes/api');

const app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');

// Parsers for POST data
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set our api routes
app.use('/', index);
app.get('/viewbooks', api.viewBooks);
app.post('/add', api.addBook);
app.get('/deletebook/:id', api.deletebook);
app.get('/getbook/:id', api.getbook);
app.post('/updatebook/:id', api.updatebook);
app.get('/book/:id', api.viewBook);
app.post('/userpost/:id', api.userpost);
app.post('/favorite/:id', api.favorite);
app.post('/returnbook/:id', api.returnbook);
app.post('/comment/:id', api.saveComment);

// Catch all other routes and return the index file
/**
 * Get port from environment and store in Express.
 */

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
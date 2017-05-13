// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const app = express();
let config = require('./server/config.js');
const mongoose = require('mongoose');    
require('dotenv').config()

//Mongoose Setup
let options = { 
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
              }; 
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.url, options);
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

// Parsers for POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json'}));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

console.log("process.env.NODE_ENV: ", process.env.NODE_ENV)
if(process.env.NODE_ENV !== 'test'){
  app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

const api = require('./server/routes/user.route');
const bookRoute = require('./server/routes/book');
app.use('/api/user', api);
app.use('/api/book', bookRoute);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));


module.exports = app; // for testing

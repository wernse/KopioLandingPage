// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const api = require('./server/routes/user.route');
const apiTest = require('./server/routes/test.route');
const app = express();
require('dotenv').config()

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

if(process.env.NODE_ENV !== 'dev'){
  app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

app.use('/api/user', api);
app.use('/api/test', apiTest);

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

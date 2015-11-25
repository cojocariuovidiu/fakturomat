process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express.js'),
app = express(),
config = require('./config/config.js');

app.listen(config.serverPort);
console.log("Server is listening on " + config.serverPort);
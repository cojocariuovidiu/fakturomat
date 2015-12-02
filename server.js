process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose.js'),
express = require('./config/express.js'),
passport = require('./config/passport.js'),
config = require('./config/config.js'),
db = mongoose();
app = express(),
passport = passport();

app.listen(config.serverPort);
console.log("Server is listening on " + config.serverPort);
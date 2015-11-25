process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var app = require('./config/express');

app.listen(process.env.NODE_ENV);
console.log("Server is listening on " + process.env.NODE_ENV);
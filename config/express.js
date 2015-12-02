var config = require('./config'),
mongoose = require('mongoose'),
express = require('express');
passport = require('passport'),
session = require('express-session'),
bodyParser = require('body-parser'),

module.exports = function(){
   var app = express();

   app.set('views', './app/views');
   app.set('x-powered-by', false);
   app.set('view engine', 'ejs');

   app.use(bodyParser({
      extended: true
   }));

   app.use(session({
      secret: config.sessionSecret,
      name: 'fakturomat',
      resave: true,
      saveUninitialized: true
      }
   ));

   app.use(passport.initialize());
   app.use(passport.session());

   require('../app/routes/index.server.routes')(app);
   require('../app/routes/users.server.routes')(app);

   app.use(express.static('./public'));
   
   return app;
}
var config = require('./config'),
express = require('express');

module.exports = function(){
   var app = express();

   app.set('views', './app/views');
   app.set('x-powered-by', false);
   app.set('view engine', 'ejs');

   require('../app/routes/index.server.routes')(app);

   app.use(express.static('./public'));
   
   return app;
}
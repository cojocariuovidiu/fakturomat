module.exports = function(app){
   var users = require('../controllers/user.server.controller.js');
   app
      .post('/api/users', users.signup)
      .get('/api/users', users.listAll) //only for development! its security risk
      .post('/api/signin', users.signin)
      .post('/api/signout', users.signout);
};
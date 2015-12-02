module.exports = function(app){
   var users = require('../controllers/user.server.controller.js');
   app
      .post('/api/users', users.signup)
      .get('/api/users', users.listAll)
      .post('/api/signin', passport.authenticate('local'), function(req, res){
         res.json(req.user);
      })
}
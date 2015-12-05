module.exports = function(app){
   var users = require('../controllers/user.server.controller.js');
   app
      .post('/api/users', users.signup)
      .get('/api/users', users.listAll)
/*      .post('/api/signin', passport.authenticate('local', function(err, user, info){
         res.json(req.user);
      }));*/
      .post('/api/signin', function(req, res, next){
         passport.authenticate('local', function(err, user, info){
            if(err)
               return next(err);
            if(!user)
               return res.status(401).send({
                  message: {
                     type: 'danger',
                     content: 'Error! Authentication failed.'
                  }
               });
            else{
               user.password = undefined; // client have no interest in having hashed password
               return res.send({ 
                  message: {
                     type: 'success',
                     content: 'You are logged in.'
                  },
                  user: user
               });
            }
         })(req, res, next);
      })
      .post('/api/signout', users.signout)
}
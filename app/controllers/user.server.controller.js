var User = require('mongoose').model('User'),
passport = require('passport');

exports.signout = function(req, res){
   req.logOut();
   res.clearCookie('fakturomat');
   res.json({
      message: {
         type: 'success',
         content: 'You are now logged out.'
      }
   })
};
exports.signup = function(req, res, next){
   if(!req.user){
      var user = new User(req.body),
      message = null;
      user.save(function(err){
         if(err)
            return next(err);
         else
            res.json({
               user: user,
               message: {
                  type: 'success',
                  content: 'Account have been created.'
               }
            });
      });
   }
   else
      res.json({
         message: {
            type: 'danger',
            content: 'You are already logged in.'
         }
      });
};
exports.signin = function(req, res, next){
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
         req.logIn(user, function(err){
            if(err)
               return next(err);
            else
               return res.send({ 
                  message: {
                     type: 'success',
                     content: 'You are logged in.'
                  },
                  user: user
               });   
         });
         
      }
   })(req, res, next);
};
exports.listAll = function(req, res, next){
   if(req.user){
      User.find({}, function(err, data){
         if(err)
            next(err)
         else{
            res.render('users', {
               title: 'List of all users',
               users: data
            });
         }
      });
   }
   else
      res.json({
         messages: 'Unauthorized access.'
      });
};
exports.requiresLogin = function(req, res, next){
   if(!req.isAuthenticated()){
      console.log('user not authenticated');
      return res.status(401).send({
         message: "Please log in first"
      });
   }
   next();
}
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
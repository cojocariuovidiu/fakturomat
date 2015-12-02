var User = require('mongoose').model('User'),
passport = require('passport');

exports.signout = function(req, res){
   res.logout();
};
exports.signup = function(req, res, next){
   if(!req.user){
      var user = new User(req.body),
      message = null;
      user.save(function(err){
         if(err)
            return next(err);
         else
            res.json(user);
      });
   }
};
exports.listAll = function(req, res, next){
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
};
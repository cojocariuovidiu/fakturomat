var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
User = require('mongoose').model('User');
module.exports = function(){
   passport.use(new LocalStrategy(function(username, password, done){
      User.findOne({
         username: username
      }, function(err, user){
         if(err)
            return done(err);
         if(!user)
            return done(null, false, { message: 'Unknown User'});
         
         user.authenticate(password, function(){
            return done(null, false, { message: {
               type: 'danger',
               content: 'User Credentials doesn&quot;t match with existing ones'
            }});
         }, function(){
            return done(null, user, {message: {
               type: 'success',
               content: 'Welcome, you are now logged in'
            }});
         });
      })
   }))
}
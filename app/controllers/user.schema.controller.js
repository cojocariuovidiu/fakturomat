var User = require('mongoose').model('User');

exports.signout = function(req, res){
   res.logout();
}
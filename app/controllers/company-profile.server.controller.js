var mongoose = require('mongoose'),
CompanyProfile = mongoose.model('CompanyProfile');

getErrorMessages = function(err){
   var Err = function(msg){
      this.type = 'danger';
      this.message = msg;
   },
   result = [];

   if(err.errors)
      for(var error in err.errors){
         if(err.errors)
            result.push(new Err(err.errors[error].message));
      }
   else
      result.push(new Err('Unknown server error'));

   return result;
}
exports.create = function(req, res){
   var companyProfile = new CompanyProfile(req.body);
   companyProfile.creator = req.user;

   companyProfile.save(function(err){ 
      if(err){
            console.log(err);
            return res.status(400).send(getErrorMessages(err));
         }
      else
         res.json(companyProfile);
   });
};
exports.list = function(req, res){
   CompanyProfile.find({creator: req.user}).populate('creator', '_id').exec(function(err, profiles){
      if(err)
         return res.status(400).send(getErrorMessages(err));
      else
         res.json(profiles);
   });
};
exports.read = function(req, res){
   var companyProfile = req.companyProfile;

   companyProfile.find({ user: req.user, _id: req._id}).populate(creator).exec(function(err, profile){
      if(err)
         return res.status(400).send(getErrorMessages(err));
      else
         res.json(profile);
   });
};
exports.update = function(req, res){
   var profile = req.body,
   companyProfile;

   profile.creator = req.user;

   companyProfile = new CompanyProfile(profile);
   console.log(companyProfile);
   companyProfile.update(profile, { runValidators: true }, function(err){
      if(err){
         console.log(err);
         return res.status(400).send(getErrorMessages(err));
      }
      else
         res.send(companyProfile);
   });
};
exports.delete = function(req, res){
   var companyProfile = req.companyProfile;

   companyProfile.remove(function(err){
      if(err)
         return res.status(400).send(getErrorMessage(err));
      else
         res.json(companyProfile);
   });
};
exports.profileByID = function(req, res, next, id){
   CompanyProfile.findById(id).populate('creator', '_id').exec(function(err, companyProfile){
      if(err)
         return next(err);
      if(!companyProfile)
         return next(new Error('Faile to load company profile ' + id));

      req.companyProfile = companyProfile;
      next();
   });
}
exports.hasAuthorization = function(req, res, next){
   if(req.companyProfile.creator._id.toString() != req.user._id.toString())
      return res.status(403).send({
         type: 'danger',
         message: 'User is not authorized'
      })
   else
      next();
};
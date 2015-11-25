var mongoose = require('mongoose'),
Schema = mongoose.Schema,
bcrytp =  require('bcrypt');

var UserSchema = new Schema({
   firstName: {
      type: String,
      trim: true
   },
   lastName: {
      type: String,
      trim: true
   },
   email: {
      type: String,
      trim: true,
      index: true,
      match: [/.+\@.+\..+/, "Fill in valid email address."]
   },
   username: {
      type: String,
      trim: true,
      required: "Username is required",
      unique: true
   },
   created: {
      type: Date,
      default: Date.now
   }
   password: {
      type: String,
      validate: [
         function(pass){
            return pass.length >= 6
         },
         'Password too short.'
         ]
   }
});
UserSchema.virtual('fullName')
   .get(function(){
      return this.firstName + ' ' + this.lastName;
   })
   .set(function(fullName){
      var nameArr = fullName.split(' ');
      this.firstName = nameArr[0] || '';
      this.lastName = nameArr[1] || '';
   });
UserSchema.methods.hashPassword = function(pass){
   return bcrypt.hash(pass, 14, function(err, hash){
      if(err)
         throw next(err);
      else
         return hash;
   });
};
UserSchema.methods.authenticate = function(pass){
   return this.password ? bcrypt.compare(pass, this.password, function(err, res){
      return res;
   }) : false;
}

mongoose.model('User', UserSchema);
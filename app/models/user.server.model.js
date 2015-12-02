var mongoose = require('mongoose'),
Schema = mongoose.Schema,
bcrypt =  require('bcrypt'),
SALT_WORK_FACTOR = 14;

var UserSchema = new Schema({
   firstName: {
      type: String,
      trim: true,
      default: ''
   },
   lastName: {
      type: String,
      trim: true,
      default: ''
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
   },
   password: {
      type: String,
      validate: [
         function(pass){
            return pass.length >= 6
         },
         'Password too short.'
         ],
      required: true

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

UserSchema.pre('save', function(next){
   console.log('Hashing proces started')
   var user = this;

   if(!user.isModified('password')) 
      return next()
   
   bcrypt.hash(user.password, SALT_WORK_FACTOR, function(err, hash){
      if(err)
         throw next(err);
      else{
         console.log("Returning hash");      
         user.password = hash;
         next();
      }
   });
})
UserSchema.methods.authenticate = function(pass, error, success){
   if(!this.password){
      console.log("User doesnt have password set");
      return error();
   }
   else{
      bcrypt.compare(pass, this.password, function(err, res){
         if(err){
            console.log('error');
            error();
         }
         if(res){
            console.log("Passwords match");
            success();
         } else {
            console.log("Passwords doesnt match");
            error();
         }
      });
   }
};

mongoose.model('User', UserSchema);
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
CompanyProfileSchema = new Schema({
   name: {
      type: String,
      trim: true,
      required: 'Company name cannot be blank.'
   },
   street: {
      type: String,
      trim: true,
      required: 'Adress cannot be blank.'
   },
   zip: {
      type: String,
      trim: true,
      validate: {
         validator: function(v){
            return /^\d{2}-\d{3}$/.test(v);
         },
         message: "Please provide ZIP code in format '00-000'"
      }
   },
   post: {
      type: String,
      trim: true,
      required: 'Post field cannot be blank.'
   },
   nip: {
      type: String,
      trim: true,
      validate: {
         validator: function(v){
            v.replace(/-/g, "");
            return /^\d{10}$/.test(v);
         },
         message: "Please provide valid NIP number"
      }
   },
   creator: {
      type: Schema.ObjectId,
      ref: 'User'
   }
});

mongoose.model('CompanyProfile', CompanyProfileSchema);
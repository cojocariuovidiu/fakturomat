var mongoose = require('mongoose'),
Schema = mongoose.Schema,
validateNip = function(v){
   v.replace(/-/g, "");
   return /^\d{10}$/.test(v);
},
validateZip = function(v){
   return /^\d{2}-\d{3}$/.test(v);
},
InvoiceSchema = new Schema({
   creator: {
      type: Schema.ObjectId,
      ref: 'User'
   },
   invoiceNumber: {
      type: String,
      trim: true,
      required: 'Invoice number cannot be blank'
   },
   date: {
      type: String,
      trim: true,
      required: 'Date cannot be blank'
   },
   companyName: {
      type: String,
      trim: true,
      required: 'Company Name cannot be blank'
   },
   companyNipNumber: {
      type: String,
      trim: true,
      validate: {
         validator: validateNip,
         message: "Please provide valid company NIP number"
      }
   },
   companyStreet: {
      type: String,
      trim: true,
      required: 'Company Street cannot be blank'
   },
   companyZip: {
      type: String,
      trim: true,
      validate: {
         validator: validateZip,
         message: "Please provide company ZIP code in format '00-000'"
      }
   },
   companyPost: {
      type: String,
      trim: true,
      required: 'Company Post cannot be blank'
   },
   clientName: {
      type: String,
      trim: true,
      required: 'Client Name cannot be blank'
   },
   clientNip: {
      type: String,
      trim: true,
      validate: {
         validator: validateNip,
         message: 'Please provide valid NIP number',
      }
   },
   clientStreet: {
      type: String,
      trim: true,
      required: 'Client Street cannot be blank'
   },
   clientZip: {
      type: String,
      trime: true,
      validate: {
         validator: validateZip,
         message: "Please provide client ZIP code in format '00-000'"
      }
   },
   clientPost: {
      type: String,
      trime: true,
      required: 'Client Post cannot be blank'
   },
   totalValue: {
      type: Number,
      trim: true,
      required: 'Total Value cannot be blank'
   },
   items: {
      type: []
   }
   /*[
      name: {
         type: String,
         trim: true,
         required: 'Product name cannot be blank'
      },
      qty: {
         type: Number,
         trim: true,
         validate: 'Please provide valid quantity number'
      },
      vat: {
         type: String,
         trim: true,
         validate: "Please choose vat rate"
      },
      netPrice: {
         type: String,
         trim: true,
         validate: "Net price cannot be blank"
      },
      fullValue: {
         type: String,
         trim: true,
         validate: "Full price cannot be blank"
      }
   ]*/
});

mongoose.model('Invoice', InvoiceSchema);
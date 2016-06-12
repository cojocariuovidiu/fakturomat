var Invoice = require('mongoose').model('Invoice'),
getErrorMessages = require('./errors.server.controller'),
PDFMake = require('pdfmake/src/printer'),
fonts = {
   Roboto: {
      normal: 'app/assets/fonts/Roboto-Regular.ttf',
      bold: 'app/assets/fonts/Roboto-Medium.ttf',
      italics: 'app/assets/fonts/Roboto-Italic.ttf',
      bolditalics: 'app/assets/fonts/Roboto-Italic.ttf'
   }
}
PDFGenerator = new PDFMake(fonts),
fs = require('fs');

exports.create = function(req, res){
   var invoice = new Invoice(req.body);
   invoice.creator = req.user;

   invoice.save(function(err){
      if(err){
         console.log(err);
         return res.status(400).send(getErrorMessages(err));
      }
      else {
         res.json(invoice);
      }
   });
};
exports.list = function(req, res){
   Invoice.find({creator: req.user}).populate('creator', '_id').exec(function(error, invoices){
      if(error)
         return res.status(400).send(getErrorMessages(error));
      else
         res.json(invoices);
   });
};
exports.invoiceByID = function(req, res, next, id){
   console.log("!")
   Invoice.findById(id).populate('creator', '_id').exec(function(err, invoice){
      if(err)
         return next(err);
      if(!invoice)
         return next(new Error('Failed to load invoice.'));
      else{
         req.invoice = invoice;
         console.log(req.invoice);
         next(); 
      }
   })
};
exports.generatePDF = function(req, res){
   var parsedDate = new Date(req.invoice.date),
   tableArr = [
                  [
                     {
                        text: '#'
                     },
                     {
                        text: 'Description'
                     },
                     {
                        text: 'Quantity'
                     },
                     {
                        text: 'Unit net price'
                     },
                     {
                        text: 'Unit brutto price'
                     },
                     {
                        text: 'VAT'
                     },
                     {
                        text: 'Total price'
                     }
                  ],
                  []
               ];
   req.invoice.items.forEach(function(val, index){
      console.log('The index is:' + index)
      tableArr[1].push(
         {
            text: (index + 1).toString()
         },
         {
            text: val.name
         },
         {
            text: val.qty
         },
         {
            text: val.netPrice + ' ' + val.currency
         },
         {
            text: val.netPrice + val.netPrice * val.vat + ' ' + val.currency
         },
         {
            text: val.vat * 100 + '%'
         },
         {
            text: val.fullPrice + ' ' + val.currency,
            alignment: 'right'
         }
      );
   })
   var docBlueprint = {
      content: [
         {
            text: 'Invoice #' + req.invoice.invoiceNumber,
            alignment: 'center',
            fontSize: 14,
            margin: [0, 0, 0, 50],
            bold: true
         },
         {
            columns: [
               {
                  text: [
                     'Issued to:\n',
                     req.invoice.clientName + '\n',
                     req.invoice.clientStreet + '\n',
                     req.invoice.clientPost + '\n',
                     req.invoice.clientZip + '\n',
                     'NIP #' + req.invoice.clientNip
                  ]
               },
               {
                  text: [
                  'Issued by:\n',
                     req.invoice.companyName + '\n',
                     req.invoice.companyStreet + '\n',
                     req.invoice.companyPost + '\n',
                     req.invoice.companyZip + '\n',
                     'NIP #' + req.invoice.companyNipNumber + '\n',
                     'Invoiced on ' + parsedDate.getDate() + '.' + (parsedDate.getMonth() + 1) + '.' + (parsedDate.getYear() + 1900)
                  ],
                  alignment: 'right'
               }
            ]   
         },
         {
            table: {
               headerRows: 1,
               widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto'],
               body: tableArr
            } 
         }
      ]
   },
   nameRegex = /[^a-z0-9]/gi,
   pdf = PDFGenerator.createPdfKitDocument(docBlueprint);
   

   res.setHeader('Content-disposition', 'attachment; filename=' + req.invoice.invoiceNumber.replace(nameRegex, '_') + '.pdf');
   pdf.pipe(res);
   pdf.end();
   return;
};
exports.hasAuthorization = function(req, res, next){
   if(req.invoice.creator._id.toString() !== req.user._id.toString())
      return res.status(403).send({
         type: 'danger',
         message: 'User is not authorized'
      });
   else
      next();
}
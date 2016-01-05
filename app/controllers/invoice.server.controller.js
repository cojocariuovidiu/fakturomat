var Invoice = require('mongoose').model('Invoice'),
getErrorMessages = require('./errors.server.controller'),
PDFDocument = require('pdfkit'),
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
exports.generatePDF = function(req, res){
   var doc = new PDFDocument;


};
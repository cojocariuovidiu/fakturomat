var invoices = require('../controllers/invoice.server.controller.js'),
users = require('../controllers/user.server.controller.js');

module.exports = function(app){
   app.route('/api/invoice')
      .post(users.requiresLogin, invoices.create);
   app.route('/api/invoices')
      .get(users.requiresLogin, invoices.list);
}
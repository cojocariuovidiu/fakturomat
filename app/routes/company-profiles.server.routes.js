var companyProfiles = require('../controllers/company-profile.server.controller.js'),
users = require('../controllers/user.server.controller.js');

module.exports = function(app){

   app.route('/api/company-profile')
      .post(users.requiresLogin, companyProfiles.create);

   app.route('/api/company-profiles')
      .get(users.requiresLogin, companyProfiles.list);
      
   app.route('/api/company-profile/:profileId')
      .put(users.requiresLogin, companyProfiles.hasAuthorization, companyProfiles.update)
      .get(users.requiresLogin, companyProfiles.hasAuthorization, companyProfiles.read)
      .delete(users.requiresLogin, companyProfiles.hasAuthorization, companyProfiles.delete);

   app.param('profileId', companyProfiles.profileByID);
};
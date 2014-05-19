'use strict';

var wine = require('./controllers/wine.js'),
    winery = require('./controllers/winery.js'),
    merchant = require('./controllers/merchant.js'),
    tourist = require('./controllers/tourist.js'),
    award = require('./controllers/award.js'),
    grape = require('./controllers/grape.js'),
    user = require('./controllers/user.js'),
    admin = require('./controllers/admin.js'),
    edit = require('./controllers/edit.js');

/**
 * Application routes
 */
module.exports = function(app) {

  
  app.route('/wine/')
    .get(wine.find)
    .post(wine.create)
  

  
  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword);
  app.route('/api/users/me')
    .get(users.me);
  app.route('/api/users/:id')
    .get(users.show);

  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);
    */
};
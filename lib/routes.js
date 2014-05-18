'use strict';
var wine = require('./routes/wine.js'),
    winery = require('./routes/winery.js'),
    merchant = require('./routes/merchant.js'),
    tourist = require('./routes/tourist.js'),
    award = require('./routes/award.js'),
    grape = require('./routes/grape.js'),
    user = require('./routes/user.js'),
    admin = require('./routes/admin.js'),
    edit = require('./routes/edit.js');

/**
 * Application routes
 */
module.exports = function(app) {

    app.use('/wine', wine);
    app.use('/winery', winery);
    app.use('/merchant', merchant);
    app.use('/tourist', tourist);
    app.use('/award', award);
    app.use('/grape', grape);
    app.use('/edit', edit);
    app.use('/user', user);
    app.use('/admin', admin);



    /*
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
'use strict';
/**
 * Public routers
 */

var winePublic = require('./routes/public/wine.js'),
    wineryPublic = require('./routes/public/winery.js'),
    merchantPublic = require('./routes/public/merchant.js'),
    touristPublic = require('./routes/public/tourist.js'),
    awardPublic = require('./routes/public/award.js'),
    grapePublic = require('./routes/public/grape.js'),
    userPublic = require('./routes/public/user.js'),
    adminPublic = require('./routes/public/admin.js'),
    editPublic = require('./routes/public/edit.js');

/**
 * Admin routers
 */
var wineAdmin = require('./routes/admin/wine.js'),
    wineryAdmin = require('./routes/admin/winery.js'),
    merchantAdmin = require('./routes/admin/merchant.js'),
    touristAdmin = require('./routes/admin/tourist.js'),
    awardAdmin = require('./routes/admin/award.js'),
    grapeAdmin = require('./routes/admin/grape.js'),
    userAdmin = require('./routes/admin/user.js'),
    adminAdmin = require('./routes/admin/admin.js'),
    editAdmin = require('./routes/admin/edit.js');


/**
 * Application routes
 */
module.exports = function(app) {

    app.use('/wine', winePublic);
    app.use('/winery', wineryPublic);
    app.use('/merchant', merchantPublic);
    app.use('/tourist', touristPublic);
    app.use('/award', awardPublic);
    app.use('/grape', grapePublic);
    app.use('/edit', editPublic);
    app.use('/user', userPublic);
    app.use('/admin', adminPublic);


    app.use('/admin/wine', wineAdmin);
    app.use('/admin/winery', wineryAdmin);
    app.use('/admin/merchant', merchantAdmin);
    app.use('/admin/tourist', touristAdmin);
    app.use('/admin/award', awardAdmin);
    app.use('/admin/grape', grapeAdmin);
    app.use('/admin/edit', editAdmin);
    app.use('/admin/user', userAdmin);
    app.use('/admin/admin', adminAdmin);


    /**
     * 404 route
     */
    app.use(function(req, res) {
        res.send(404);
    });

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
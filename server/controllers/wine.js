var mongoose = require('mongoose');
var Wine = mongoose.model('Wine');
var pagination = require('../helperMethods.js').pagination;
var filter = require('../helperMethods.js').filter;
/**
 * List all wines in db
 */
exports.listing = function(req, res) {
    var page = pagination(req);
    var query = filter(req, 'country');
    Wine.find(query).limit(page.size).skip(page.start).lean().exec(function(err, result) {
        res.send(result);
    });


};

/**
 *
 */
exports.userAddWine = function(req, res) {
    res.end(200);
};

/**
 *
 */
exports.show = function(req, res) {

};

/**
 *
 */
exports.delete = function(req, res) {

};
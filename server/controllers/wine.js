var mongoose = require('mongoose'),
    Wine = mongoose.model('Wine'),
    pagination = require('../helperMethods.js').pagination,
    filter = require('../helperMethods.js').filter,
    events = require('events'),
    event = new events.EventEmitter();
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
exports.add = function(req, res) {
    var wine = new Wine(req.body);
    wine.save(function(err, doc) {
        if (err) {
            return res.json(400, err);
        }
        event.emit('wine:add', doc);
        return res.json(doc);
    });
};

/**
 *
 */
exports.show = function(req, res) {
    Wine.findById(req.id, '-published ', function(err, doc) {
        if (!err) {
            return res.json(doc);
        } else {
            event.emit('winery:show', doc);
            return res.send(err);
        }
    });
};


/**
 *  Admin specific controllers
 */

exports.adminShow = function(req, res) {

};
exports.adminWineChange = function(req, res) {

};
exports.adminWineDelete = function(req, res) {

};
exports.adminPublish = function(req, res) {

};
exports.adminProblem = function(req, res) {

};
exports.adminProblemDelete = function(req, res) {

};
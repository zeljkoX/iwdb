var mongoose = require('mongoose'),
    events = require('events'),
    event = new events.EventEmitter();

exports.add = function(req, res) {
    var doc = req.doc;
    var review = req.body;
    doc.reviews.push(review);
    wine.save(function(err, doc) {
        if (err) {
            return res.json(400, err);
        }
        event.emit('review:add', req.id, doc);
        return res.json(doc);
    });
};

exports.listing = function(req, res) {
    return res.json(req.doc.reviews);
};

exports.rate = function(req, res) {
    var rid = req.params.rid;
    var doc = req.doc;
    var review = doc.reviews.id(rid);
    var position = docs.reviews.indexOf(review);
    //update review
};

/**
 *  Admin specific controllers
 */

exports.adminListing = function(req, res) {
    return res.json(req.doc.reviews);
};

exports.adminChange = function(req, res) {

};

exports.adminDelete = function(req, res) {

};
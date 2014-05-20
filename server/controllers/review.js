var mongoose = require('mongoose'),
    events = require('events'),
    event = new events.EventEmitter();

exports.add = function(req, res) {
    var doc = req.doc;
    doc.reviewAdd(req.body, function(err) {
        if (err) {
            return res.send(400, Error('Neuspjelo upisa recenzije'));
        }
        res.send(200);
        event.emit('review:add', req.id, doc);
        return;
    });
};

exports.listing = function(req, res) {
    return res.json(req.doc.reviews);
};

exports.rate = function(req, res) {
    var rid = req.params.rid;
    var doc = req.doc;
    var review = doc.reviews.id(rid);
    //update review
};

/**
 *  Admin specific controllers
 */

exports.adminListing = function(req, res) {
    return res.json(req.doc.reviews);
};

exports.adminChange = function(req, res) {
    var rid = req.params.rid;
    var doc = req.doc;
    doc.reviewChange(rid, req.body, function(err) {
        if (err) {
            return res.send(400, Error('Neuspjelo uredjivanje recenzije'));
        }
        res.send(200);
        event.emit('review:change', req.id, doc);
        return;
    });
};

exports.adminDelete = function(req, res) {
    var rid = req.params.rid;
    var doc = req.doc;
    doc.reviewDelete(rid, function(err) {
        if (err) {
            return res.send(400, Error('Neuspjelo brisanje recenzije'));
        }
        res.send(200);
        event.emit('review:delete', req.id, doc);
        return;
    });
};
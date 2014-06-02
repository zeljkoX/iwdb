var mongoose = require('mongoose'),
    Tourist = mongoose.model('Tourist'),
    events = require('events'),
    event = new events.EventEmitter();




/***********************
 *   Respond to events
 ***********************/

event.on('offer:add', function(offer) {
    Tourist.findById(offer.tourist._id, function(err, tourist) {
        if (err) {
            //implement adding to db errors
        }
        tourist.addOffer(offer, function(err) {
            if (err) {
                //implement adding to db errors
            }
        });
    });
});

event.on('offer:remove', function(wine) {
    Tourist.findById(offer.tourist._id, function(err, tourist) {
        if (err) {
            //implement adding to db errors
        }
        tourist.removeOffer(offer, function(err) {
            if (err) {
                //implement adding to db errors
            }
        });
    });
});
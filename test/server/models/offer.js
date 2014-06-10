'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Offer = mongoose.model('Offer');

var offer;


xdescribe('Offer Model', function() {
   

    it('should contain 0 documents', function(done) {
        Offer.find({}, function(err, offers) {
            offers.should.have.length(0);
            done();
        });
    });

    it('should menage dependencies on create', function(done) {
        //add to tourist
        //add to winery if published
    });
    it('should menage dependencies on change: name', function(done) {
        //update offer, winery, tourist
    });
     it('should menage dependencies on unpublish', function(done) {
        //unpublish on tourist
        //delete from winery
    });
     it('should menage dependencies on publish', function(done) {
        //publish on tourist if tourist is published and winery is published
        //add to winery if winery is published
    });
     it('should menage dependencies delete', function(done) {
        //delete from tourist
        //delete from winery
    });
    
});
'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Tourist = mongoose.model('Tourist');

var Tourist;


xdescribe('Tourist Model', function() {
   

    it('should contain 0 documents', function(done) {
        Tourist.find({}, function(err, tourists) {
            tourists.should.have.length(0);
            done();
        });
    });

    it('should menage dependencies on create', function(done) {
        //add to country if published
    });
    it('should menage dependencies on change: name', function(done) {
        //update offer, country
    });
     it('should menage dependencies on unpublish', function(done) {
        //remove form country
        //set statistics
        //unpublish every offer
    });
     it('should menage dependencies on publish', function(done) {
        //add to country
        //set up staistics
        //publish offers
    });
     it('should menage dependencies delete', function(done) {
        //delete only if number of offer is equal to zero
        //delete from country
        //set up statistics
    });
    
});
'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Merchant = mongoose.model('Merchant');

var merchant;


xdescribe('Merchant Model', function() {
   

    it('should contain 0 documents', function(done) {
        Merchant.find({}, function(err, merchants) {
            merchants.should.have.length(0);
            done();
        });
    });

    it('should menage dependencies on create', function(done) {
        //add to country
        //add to overall statistics
    });
    it('should menage dependencies on change: name', function(done) {
        //update merchant, country, and wines records if merchant offer is added
    });
     it('should menage dependencies on unpublish', function(done) {
        //unpublish every wine offer
        //set up statistics
    });
     it('should menage dependencies on publish', function(done) {
        //publish every wine offer if wine is published
        //set up statistics
    });
     it('should menage dependencies delete', function(done) {
        //should delete only if number of offers is equal to zero
        //delete every offer(and delete entries from wines db)
        //set up statistics
    });
    
});
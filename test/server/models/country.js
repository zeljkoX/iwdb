'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Country = mongoose.model('Country');

var country;

xdescribe('Country Model', function() {
   

    it('should contain 0 documents', function(done) {
        Country.find({}, function(err, countries) {
            countries.should.have.length(0);
            done();
        });
    });

    it('should menage dependencies on create', function(done) {
        //maybe overall statistic of number of countries
    });
    it('should menage dependencies on change: name', function(done) {
        //update every wine, wine region, winery, tourist, offer, merchant
    });
     it('should menage dependencies on unpublish', function(done) {
        //unpublish every wine, winery, region, tourist, merchant
        
    });
     it('should menage dependencies on publish', function(done) {
        //publish every wine, winery, region, tourist, merchant
    });
     it('should menage dependencies delete', function(done) {
        //should delete only if number of: winery, wines, tourist, merchant is equal to zero
    });
    
});
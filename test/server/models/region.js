'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Region = mongoose.model('Region'),
    data = require('../data.js');

var region;


describe('Region Model', function() {
   

    it('should contain 0 documents', function(done) {
        data.removeAll();

        Region.find({}, function(err, regions) {
            regions.should.have.length(0);
            done();
        });
    });
    it('should populate country', function(done) {
        data.populateCountry(done);
    });
    it('should populate regions', function(done) {
        data.populateRegion(done);
    });
    it('should populate wineries', function(done) {
        data.populateWinery(done);
    });
     it('should populate wines', function(done) {
        data.populateWine(done);
    });

    it('should menage dependencies on create', function() {
        //add to country
    });
    it('should menage dependencies on change: name', function() {
        //update winery, wine
    });

     it('should menage dependencies delete', function() {
        //should delete only if number of wines and wineries is equal to zero
        //delete from winery
        //delete from wine
    });
    
});
'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Region = mongoose.model('Region'),
    Country = mongoose.model('Country'),
    Promise = mongoose.Promise,
    data = require('../data.js'),
    async = require('async');

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

    it('should menage dependencies on create', function(done) {
        var regionPromise = Region.find({}).exec();
        regionPromise.then(function(regions) {
            regions.forEach(function(region) {
                region.country.should.have.properties('name', '_id');
            });
        });

        var countryPromise = Country.find({}).exec();
        countryPromise.then(function(countries) {
            countries.forEach(function(country) {
                country.regions.forEach(function(region) {
                    region.should.have.properties('name', '_id');
                });
            });
        });
        var all = new Promise().when(regionPromise, countryPromise);
        all.addBack(function(err) {
            done();
        });
    });
    it('should menage dependencies on change: name', function(done) {
        /*var regionPromise = Region.find({}).exec()
            .then(function(region) {
                var r = Region.findById(region[0]._id).exec()
                    .then(function(region) {
                        region.name = 'Novo ime';
                        region.save(function() {

                            console.log('fulfill');
                            return;
                        });
                    });
            })
            .then(function() {
                console.log('fulfill after');
            });*/
        var oldName;
        async.waterfall([
            //get region
            function(callback) {
                var regionPromise = Region.find({}, function(err, regions) {
                    callback(err, regions[0]);
                });
            },
            //chanege name
            function(region, callback) {
                oldName = region.name;
                region.name = 'Novo ime';
                    region.save(function(err,doc) {
                        //region.on('update', function(){
                            callback(err);
                        //});
                        
                    });
            },
            //check is saved
            function(callback) {
                Region.findOne({
                    name: 'Novo ime'
                }, function(err, region) {
                    region.name.should.equal('Novo ime');
                    callback(err);
                })

            },
            //check for old name
            function(callback) {
                Region.find({
                    name: oldName
                }, function(err, region) {
                    region.should.have.length(0);
                    callback(err);
                })

            }
        ], function(err) {
            should.not.exists(err);
            done();
        });


    });

    it('should menage dependencies delete', function() {
        //should delete only if number of wines and wineries is equal to zero
        //delete from winery
        //delete from wine
    });

});
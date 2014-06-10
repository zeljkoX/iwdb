'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Promise = mongoose.Promise,
    Winery = mongoose.model('Winery'),
    Country = mongoose.model('Country'),
    Region = mongoose.model('Region'),
    data = require('../data.js');

var winery;


xdescribe('Winery Model', function() {
   /* before(function(done) {
        winery = new Winery({
            name: 'Vukoje vinarija',
        });

        // Clear users before testing
        Winery.remove().exec();
        done();
    });

    afterEach(function(done) {
        Winery.remove().exec();
        done();
    });*/

    it('should contain 0 documents', function(done) {
        Winery.remove().exec();
        Winery.find({}, function(err, wineries) {
            should.not.exists(err);
            console.log(wineries);
            wineries.should.have.length(0);
            done();
        });
    });
     it('should populate country', function(done) {
        data.populateCountry(done);
        //set statistics{region, country}
    });
     it('should populate region', function(done) {
        data.populateRegion(done);
        //set statistics{region, country}
    });
    it('should menage dependencies on create', function(done) {
        this.timeout(5000);
        var create = new Promise;
        winery = new Winery({
            name: 'Vukoje',
            established: 1987,
            published: true,
            country: {
                name: 'Bosnia and Herzegovina'
                },
            region:{
                name: 'Herzegovina'
            }
        });
        winery.save(function(err){
            should.not.exists(err);
            winery.on('update', function(){
                 create.resolve();
            });
        });
        create.then(function(){
            var regionPromise = Region.findById(winery.region._id, function(err,region){
                should.not.exists(err);
                region.stats.numberOfWineries.should.be.equal(1);
                regionPromise.resolve();
            }).exec();

            var countryPromise = Country.findById(winery.country._id, function(err,country){
                should.not.exists(err);
                country.stats.numberOfWineries.should.be.equal(1);
                countryPromise.resolve();
            }).exec();

            var all = new Promise().when(countryPromise, regionPromise);
            all.addBack(function(err){
                should.not.exists(err);
                done();
            });

        });
        //set statistics{region, country}
    });
    it('should menage dependencies on change: name', function() {
        //update every wine, tourist, offer, merchant
    });
     it('should menage dependencies on unpublish', function() {
        //unpublish every wine
        //update statistics{region, country}
        
    });
     it('should menage dependencies on publish', function() {
        //update every wine
        //update statistics{region, country}
    });
     it('should menage dependencies delete', function() {
        //delete every wine
        //if there are records to merchant and tourist/offer unpublish and set notification
    });
    /*
    it('should have field name set up properly', function(done) {
        winery.save();
        winery.name.should.eql('Vukoje vinarija');
        done();
    });
    it('should have field url set up properly', function(done) {
        winery.save();
        winery.url.should.eql('vukoje-vinarija');
        done();
    });

    it('it should add review', function(done) {
        winery.reviewAdd('userId', 'pageId', {
            user: 'Zeljko'
        }, function(err) {
            should.not.exists(err);
            winery.reviews.should.have.length(1);
            done();
        });
    });

    it('it should change review', function(done) {
        var rid = winery.reviews[0]._id;
        console.log(rid);
        var data = {
            user: 'Jovana'
        };
        winery.reviewChange(rid, data, function(err) {
            should.not.exists(err);
            winery.reviews[0].user.should.eql('Jovana');
            done();
        });
    });
    it('it should delete review', function(done) {
        var rid = winery.reviews[0]._id;
        winery.reviewDelete(rid, function(err) {
            should.not.exists(err);
            winery.reviews.should.have.length(0);
            done();
        });
    });
    it('should increase page view field', function(done) {
        winery.pageView(function(err) {
            winery.stats.pageViews.should.equal(1);
            done();
        });
    });
    xit('should add award to winery', function(done) {
        winery.awards.should.have.length(0);
        var data = {
            name: 'Decanter',
            vintage: 2012,
            awardId: 'fdd',
            awardYear: 2014,
            rank: 'Gold Medal'
        };
        winery.addAwards(data, function(err) {
            should.not.exists(err);
            winery.awards.should.have.length(1);
            winery.awards[0].should.have.property('name');
            winery.awards[0].should.have.property('vintage');
            winery.awards[0].should.have.property('awardId');
            winery.awards[0].should.have.property('awardYear');
            winery.awards[0].should.have.property('rank');
            done();
        });

    });

    it('should add awards - param Array', function(done) {
        var data = [{
            name: 'Decanter',
            vintage: 2012,
            awardId: 'fdd',
            awardYear: 2014,
            rank: 'Gold Medal'
        }, {
            name: 'Vino RS',
            vintage: 2012,
            awardId: 'trrr',
            awardYear: 2014,
            rank: 'Gold Medal'
        }];
        winery.addAwards(data, function(err) {
            should.not.exists(err);
            winery.awards.should.have.length(2);
            done();
        });
    });

    it('Add awards - should throw if data argument is not Array', function(done) {
        winery.addAwards('bdd', function(err) {
            should.exists(err);
            done();
        });
    });

    it('Add awards - should not add same awards', function(done) {
        var data = [{
            name: 'Decanter',
            vintage: 2012,
            awardId: 'fdd',
            awardYear: 2014,
            rank: 'Gold Medal'
        }];
        winery.addAwards(data, function(err) {
            should.not.exists(err);
            winery.awards.should.have.length(2);
            done();
        });
    });*/


    /* it('should have field name set up properly', function(done) {
        winery.save(function() {
            Winery.find({}, function(err, wineries) {
                wineries[0].should.have.length(1);
                done();
            });
        });
    });*/
    /*
    it('should fail when saving a duplicate user', function(done) {
        user.save();
        var userDup = new Winery(user);
        userDup.save(function(err) {
            should.exist(err);
            done();
        });
    });

    it('should fail when saving without an email', function(done) {
        user.email = '';
        user.save(function(err) {
            should.exist(err);
            done();
        });
    });

    it("should authenticate user if password is valid", function() {
        user.authenticate('password').should.be.true;
    });

    it("should not authenticate user if password is invalid", function() {
        user.authenticate('blah').should.not.be.true;
    });

*/

});
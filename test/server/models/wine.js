'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Wine = mongoose.model('Wine');

var wine;

xdescribe('Wine Model', function() {
    before(function(done) {
        wine = new Wine({
            name: 'Vranac',
            vintage: 2012,
            winery: {
                name: 'Vinarija Vukoje',
                _id: 'sdfsdf',
                state: 'Republic Of Srpska',
                country: 'BiH',
                region: 'Hercegovina'
            },
            alc: 12.5,
            volume: ['0.750'],
            wineType: 'red',
            sweetness: 'dry'
        });

        // Clear users before testing
        Wine.remove().exec();
        done();
    });

    afterEach(function(done) {
        Wine.remove().exec();
        done();
    });

    it('should contain 0 documents', function(done) {
        Wine.find({}, function(err, wines) {
            wines.should.have.length(0);
            done();
        });
    });
    it('should be able to save without problems', function(done) {
        wine.save(done);
    });
    it('should add award to wine', function(done) {
        wine.awards.should.have.length(0);
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
        wine.addAwards(data, function(err) {
            should.not.exists(err);
            wine.awards.should.have.length(2);
            wine.awards[0].should.have.property('name');
            wine.awards[0].should.have.property('vintage');
            wine.awards[0].should.have.property('awardId');
            wine.awards[0].should.have.property('awardYear');
            wine.awards[0].should.have.property('rank');
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
        wine.addAwards(data, function(err) {
            should.not.exists(err);
            wine.awards.should.have.length(2);
            done();
        });
    });

    xit('should ', function(done) {

    });

});
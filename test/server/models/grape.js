'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Grape = mongoose.model('Grape');

var grape;
//mongoose.createConnection('mongodb://localhost/iwdb-test');

xdescribe('Grape Model', function() {
    before(function(done) {
        grape = new Grape({
            name: 'Pinot Noir'
        });

        // Clear users before testing
        Grape.remove().exec();
        done();
    });

    afterEach(function(done) {
        Grape.remove().exec();
        done();
    });

    it('should contain 0 documents', function(done) {
        Grape.find({}, function(err, grapes) {
            grapes.should.have.length(0);
            done();
        });
    });
    it('should be able to save without problems', function(done) {
        grape.save(done);
    });
    it('should increase page views', function(done) {
        grape.stats.pageViews.should.equal(0);
        grape.pageView(function(err) {
            should.not.exists(err);
            grape.stats.pageViews.should.equal(1);
            done();
        });
    });

    it('should increase number of wines', function(done) {
        grape.stats.numberOfWines.should.equal(0);
        grape.addWine(function(err) {
            should.not.exists(err);
            grape.stats.numberOfWines.should.equal(1);
            done();
        });
    });

    it('should increase number of wineries', function(done) {
        grape.stats.numberOfWineries.should.equal(0);
        grape.addWinery(function(err) {
            should.not.exists(err);
            grape.stats.numberOfWineries.should.equal(1);
            done();
        });
    });
});
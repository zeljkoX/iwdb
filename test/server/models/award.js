'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Award = mongoose.model('Award');

var award;
//mongoose.createConnection('mongodb://localhost/iwdb-test');

describe('Award Model', function() {
    before(function(done) {
        award = new Award({
            name: 'Decanter',
            location: 'Trebinje'
        });

        // Clear users before testing
        Award.remove().exec();
        done();
    });

    afterEach(function(done) {
        Award.remove().exec();
        done();
    });

    it('should contain 0 documents', function(done) {
        Award.find({}, function(err, awards) {
            awards.should.have.length(0);
            done();
        });
    });
    it('should be able to save without problems', function(done) {
        award.save(done);
    });
    it('should add ranks', function(done) {
        award.addRank({
            name: 'Golden Medal',
            rank: 1
        }, function(err) {
            should.not.exists(err);
            award.rank.should.have.length(1);
            done();
        });
    });

    it('should add awards', function(done) {
        var data = [{
            year: 2014,
            wine: {
                name: 'Vranac',
                _id: 'ggg'
            },
            winery: {
                name: 'Vinarija Vukoje',
                _id: 'hhh',
                location: 'Republic of Srpska'
            },
            rank: {
                _id: 'jjj',
                name: 'Golden Medal'
            }
        }, {
            year: 2014,
            wine: {
                name: 'Vranac',
                _id: 'ggg'
            },
            winery: {
                name: 'Vinarija Vukoje',
                _id: 'hhh',
                location: 'Republic of Srpska'
            },
            rank: {
                _id: 'jjj',
                name: 'Golden Medal'
            }
        }];
        award.addAwards(data, function(err) {
            should.not.exists(err);
            award.year[2014][data[0].rank.name].should.have.length(2);
            award.year[2014][data[0].rank.name][0].wine.name.should.equal('Vranac');
            done();
        });

    });

    it('shoud remove awards', function(done) {
        var data = [award.year[2014]['Golden Medal'][1]];
        award.removeAwards(data, function(err) {
            should.not.exists(err);
            award.year[2014]['Golden Medal'].should.have.length(1);
            done();
        });
    });

    xit('should add awards - param Array', function(done) {
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
        award.addAwards(data, function(err) {
            should.not.exists(err);
            award.awards.should.have.length(2);
            done();
        });
    });

    xit('Add awards - should throw if data argument is not Array', function(done) {
        award.addAwards('bdd', function(err) {
            should.exists(err);
            done();
        });
    });

    xit('Add awards - should not add same awards', function(done) {
        var data = [{
            name: 'Decanter',
            vintage: 2012,
            awardId: 'fdd',
            awardYear: 2014,
            rank: 'Gold Medal'
        }];
        award.addAwards(data, function(err) {
            should.not.exists(err);
            award.awards.should.have.length(2);
            done();
        });
    });
});
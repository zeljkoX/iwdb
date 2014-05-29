'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Winery = mongoose.model('Winery');

var winery;
//mongoose.createConnection('mongodb://localhost/iwdb-test');

xdescribe('Winery Model', function() {
    before(function(done) {
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
    });

    it('should contain 0 documents', function(done) {
        Winery.find({}, function(err, wineries) {
            wineries.should.have.length(0);
            done();
        });
    });
    it('should be able to save without problems', function(done) {
        winery.save(done);
    });
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
    });


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
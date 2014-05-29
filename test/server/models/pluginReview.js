'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Winery = mongoose.model('Winery');

var winery;
//mongoose.createConnection('mongodb://localhost/iwdb-test');

describe('Plugin Review', function() {
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

    it('Prepare document', function(done) {
        winery.save(done);
    });

    it('should have property reviews', function() {
        winery.should.have.property('reviews');
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
    it('it should update statistics', function() {
        winery.stats.numberOfReviews.should.equal(1);
    });


    it('it should change review', function(done) {
        var rid = winery.reviews[0]._id;
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
    it('it should update statistics', function() {
        winery.stats.numberOfReviews.should.equal(0);
    });
    it('should have property review', function() {
        winery.should.have.property('review');
        console.log(winery.review);
    });


});
'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('Account');

var user;
//mongoose.createConnection('mongodb://localhost/iwdb-test');

describe('User Model', function() {
    before(function(done) {
        user = new User({
            name: 'Zeljko',
            lastName: 'Markovic',
            email: 'jahrastaffaraj@gmail.com'

        });

        // Clear users before testing
        User.remove().exec();
        done();
    });

    afterEach(function(done) {
        User.remove().exec();
        done();
    });

    it('should contain 0 documents', function(done) {
        User.find({}, function(err, users) {
            users.should.have.length(0);
            done();
        });
    });
    it('should be able to save without problems', function(done) {
        user.save(done);
    });
    it('should add review', function(done) {
        var review = {
            name: 'Vranac',
            category: 'Wine',
            _id: '11111'
        };
        user.reviews.reviews.should.have.length(0);
        user.addReview(review, function(err) {
            should.not.exists(err);
            user.reviews.reviews.should.have.length(1);
            done();
        });

    });

    it('should delete review', function(done) {
        var review = user.reviews.reviews[0]._id;
        user.removeReview(review, function(err) {
            should.not.exists(err);
            user.reviews.reviews.should.have.length(0);
            done();
        });

    });
    it('should add liked review', function(done) {
        var review = {
            _id: '1111111',
            pid: '2222222',
            like: true
        };
        user.reviews.liked.should.have.length(0);
        user.addLikedReview(review, function(err) {
            should.not.exists(err);
            user.reviews.liked.should.have.length(1);
            done();
        });

    });

    it('should delete liked review', function(done) {
        var review = user.reviews.liked[0]._id;
        user.removeLikedReview(review, function(err) {
            should.not.exists(err);
            user.reviews.liked.should.have.length(0);
            done();
        });

    });

    xit('should add rating', function(done) {

    });

    xit('should delete rating', function(done) {

    });

    xit('should add fovourit page', function(done) {

    });

    xit('should remove favourit page', function(done) {

    });
});
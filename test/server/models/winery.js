'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Winery = mongoose.model('Winery');

var winery;
//mongoose.createConnection('mongodb://localhost/iwdb-test');

describe('Winery Model', function() {
    before(function(done) {
        winery = new Winery({
<<<<<<< HEAD
            name: 'Vukoje vinarija',
=======
            name: 'Vukoje',
>>>>>>> f010beb8c50d97b343ed15cc3b5279afaa3a6e34
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
<<<<<<< HEAD
=======
            done();
        });
    });
    it('should be able to save without problems', function(done) {
        winery.save(done);
    });
    it('should have field name set up properly', function(done) {
        winery.save();
        winery.name.should.eql('Vukoje');
        done();
    });

    it('it should add review', function(done) {
        winery.reviewAdd({
            user: 'Zeljko'
        }, function() {
            winery.reviews.should.have.length(1);
>>>>>>> f010beb8c50d97b343ed15cc3b5279afaa3a6e34
            done();
        });
    });

<<<<<<< HEAD
    it('should be able to save without problems', function(done) {
        winery.save(done);
    });



=======
    it('it should change review', function(done) {
        var rid = winery.reviews[0]._id;
        var data = {
            user: 'Jovana'
        };
        winery.reviewChange(rid, data, function(err) {
            winery.reviews[0].user.should.eql('Jovana');
            done();
        });
    });
    it('it should delete review', function(done) {
        var rid = winery.reviews[0]._id;
        winery.reviewDelete(rid, function() {
            winery.reviews.should.have.length(0);
            done();
        });
    });
>>>>>>> f010beb8c50d97b343ed15cc3b5279afaa3a6e34
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
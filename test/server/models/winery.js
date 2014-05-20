'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Winery = mongoose.model('Winery');

var winery;
//mongoose.createConnection('mongodb://localhost/iwdb-test');

describe('Winery Model', function() {
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
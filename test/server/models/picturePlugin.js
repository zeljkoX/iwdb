'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Winery = mongoose.model('Winery');

var winery;


describe('Picture plugin', function() {
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

    it('creating winery model', function(done) {
        winery.save(done);
    });

    it('should add picture', function(done) {
        winery.pictureAdd({
            name: 'zeljko'
        }, done);
    });

    it('should have field url pictures set up properly', function(done) {
        winery.should.have.ownProperty('pictures');
        done();
    });

    it('should have field url picture set up properly', function(done) {
        winery.should.have.ownProperty('picture');
        done();
    });

    it('should set picture as default', function(done) {
        var pid = winery.pictures[0]._id;
        winery.pictureSetDefault(pid, done);
    });

    it('should delete picture', function(done) {
        var pid = winery.pictures[0]._id;
        winery.pictureDelete(pid, done);
    });

});
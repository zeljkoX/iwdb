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
            name: 'zeljko',
            url: 'zeljko.jpg',
            desc: 'zeljko'
        }, function(err) {
            should.not.exists(err);
            winery.pictures.should.have.length(1);
            done();
        });
    });

    it('should have field pictures set up properly', function(done) {
        winery.should.have.property('pictures');
        done();
    });

    it('should have field picture set up properly', function(done) {
        winery.should.have.property('picture');
        done();
    });

    it('should set picture as default', function(done) {
        var pid = winery.pictures[0]._id;
        winery.pictureDefault(pid, function(err) {
            should.not.exists(err);
            done();
        });
    });

    it('should delete picture', function(done) {
        var pid = winery.pictures[0]._id;
        winery.pictureDelete(pid, function(err) {
            should.not.exists(err);
            done();
        });
    });

});
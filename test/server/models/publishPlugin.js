'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Winery = mongoose.model('Winery');

var winery;


describe('Publish plugin', function() {
    before(function(done) {
        winery = new Winery({
            name: 'Vukoje vinarija',
            published: false
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

    it('should not be published', function(done) {
        winery.published.should.not.be.true;
        done();
    });

    it('should be published', function(done) {
        winery.publish(function() {
            winery.published.should.be.true;
            done();
        });

    });
});
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    subschema = require('./subschemes.js'),
    plugin = require('./plugins.js'),
    autoIncrement = require('mongoose-auto-increment'),
    helper = require('../helperMethods.js');

var CountryError = helper.Error('Country');


var CountrySchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    continent: {
        type: String,
        enum: ['Europe', 'Asia', 'America', 'Australia', 'Africa']
    },
    abbr: {
        type: String
    },
    wineRegions: [],
    republic: {
        type: String
    },
    article: {
        type: String
    },
    autohtoneSorte: [subschema.ShortGrapeSchema],
    media: [subschema.MediaSchema],
    wineries: [subschema.ShortWinerySchema], // how to implement, where to store grapes???
    merchant: [subschema.ShortMerchantSchema],
    tourist: [subschema.ShortTouristSchema],
    stats: {
        pageViews: {
            type: Number,
            default: 0
        }
    }
});

CountrySchema.set('versionKey', false);

/***************************
 *  Methods
 ***************************/

/**
 *  Add winery to country db
 *
 *  @param {Array} wines
 */
CountrySchema.methods.addWinery = function(winery, cb) {
    this.wineries.addToSet(winery);

    this.save(function(err) {
        if (err) {
            return cb(CountryError('Winery not added'));
        }
        return cb(null);
    });
};

CountrySchema.methods.removeWinery = function(winery, cb) {
    var doc = this;
    doc.wineries.id(winery._id).remove(function(err) {
        if (err) {
            return cb(CountryError('Winery not deleted'));
        }
        doc.save(function(err) {
            if (err) {
                return cb(CountryError('Winery not deleted'));
            }
            return cb(null);
        });
    });

};

CountrySchema.methods.addTourist = function(tourist, cb) {
    this.tourist.addToSet(tourist);

    this.save(function(err) {
        if (err) {
            return cb(CountryError('Tourist Agency not added'));
        }
        return cb(null);
    });
};
CountrySchema.methods.removeTourist = function(tourist, cb) {
    var doc = this;
    doc.tourist.id(tourist._id).remove(function(err) {
        if (err) {
            return cb(CountryError('Tourist not deleted'));
        }
        doc.save(function(err) {
            if (err) {
                return cb(CountryError('Tourist not deleted'));
            }
            return cb(null);
        });
    });
};

CountrySchema.methods.addMerchant = function(merchant, cb) {
    this.merchant.addToSet(merchant);
    this.save(function(err) {
        if (err) {
            return cb(CountryError('Merchant not added'));
        }
        return cb(null);
    });
};

CountrySchema.methods.removeMerchant = function(merchant, cb) {
    var doc = this;
    doc.merchant.id(merchant._id).remove(function(err) {
        if (err) {
            return cb(CountryError('Merchant not deleted'));
        }
        doc.save(function(err) {
            if (err) {
                return cb(CountryError('Merchant not deleted'));
            }
            return cb(null);
        });
    });
};


/***************************
 *  Statics
 ***************************/
CountrySchema.statics.searchByName = function(name, cb) {
    this.find({
        name: name
    }, cb);
};

/***************
 *  PLUGINS
 ***************/

/**
 * Add url field and write to it url based name
 */
CountrySchema.plugin(plugin.urlify);

/**
 * Add page view mehod
 */
CountrySchema.plugin(plugin.pageView);

/**
 * Add picture field an picture methods
 */
CountrySchema.plugin(plugin.picture);

/**
 * Add publish field and method
 */
CountrySchema.plugin(plugin.publish);


module.exports = mongoose.model('Country', CountrySchema, 'countries');
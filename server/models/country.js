var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    subschema = require('./subschemes.js'),
    plugin = require('./plugins.js'),
    autoIncrement = require('mongoose-auto-increment'),
    helper = require('../helperMethods.js');

var CountryError = helper.Error('Country');
/** 
Fields edited by user
{regions, article, autohtoneSorte, media}
*/

/**
On change:
field: name, 
    -update winery, tourist, merchant, user, region, 
    
    */

var CountrySchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    continent: {
        type: String,
        enum: ['Europe', 'Asia', 'America', 'Australia', 'Africa'],
        required: true
    },
    abbr: {
        type: String
    }, 
    regions: [{
        name: {
            type: String,
            required: true
        },
        _id: {
            type: String
        }
    }],
    state: [], //Names of Republics
    article: {
        type: String
    },
    autohtoneSorte: [subschema.ShortGrapeSchema],
    media: [subschema.MediaSchema],
    wineries: [subschema.ShortWinerySchema], // how to implement, where to store grapes???
    merchant: [subschema.ShortMerchantSchema],
    tourist: [subschema.ShortTouristSchema],
    stats: {
        numberOfWineries: {
            type: Number,
            default: 0
        }
    }
}, {
    strict: true
});

CountrySchema.set('versionKey', false);

/**
 *  Transform function used to transform document for public use
 */
/*if (!CountrySchema.options.toObject) CountrySchema.options.toObject = {};
CountrySchema.options.toObject.transform = function(doc, ret, options) {
    delete ret._id;
    delete ret.published;
    delete ret.stats;
    delete ret.addedBy;
    delete ret.modified;
};*/

/***************************
 *  Methods
 ***************************/

/**
 *  Add winery to country db
 *
 *  @param {Array} wines
 */
CountrySchema.methods.addWinery = function(cb) {
    this.stats.numberOfWineries += 1;
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

/**
 *  Add region
 *
 *  @param {Object} region
 */
CountrySchema.methods.addRegion = function(region, cb) {
    this.regions.push(region);
    this.save(function(err) {
        if (err) {
            return cb(CountryError('Region not added'));
        }
        return cb(null);
    });
};
/**
 *  Remove region
 *
 *  @param {Object} region
 */
CountrySchema.methods.removeRegion = function(region, cb) {
    var doc = this;
    doc.regions.id(region._id).remove(function(err) {
        if (err) {
            return cb(CountryError('Region not deleted'));
        }
        doc.save(function(err) {
            if (err) {
                return cb(CountryError('Region not deleted'));
            }
            return cb(null);
        });
    });

};
/***************************
 *  Statics
 ***************************/
CountrySchema.statics.searchByName = function(name, cb) {
    return this.find({
        name: name
    }, cb).exec();
};

/***************
 *  PLUGINS
 ***************/
/**
 * increment _id field
 */
CountrySchema.plugin(autoIncrement.plugin, {
    model: 'Country',
    prepend: 7
});

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

/**
 * Add modified field
 */
CountrySchema.plugin(plugin.modified);


module.exports = mongoose.model('Country', CountrySchema, 'country');
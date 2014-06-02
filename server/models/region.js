var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    subschema = require('./subschemes.js'),
    plugin = require('./plugins.js'),
    autoIncrement = require('mongoose-auto-increment'),
    helper = require('../helperMethods.js');

var Region = helper.Error('Region');


var RegionSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    country: {
        type: String,
        required: true
    },
    article: {
        type: String
    },
    media: [subschema.MediaSchema],
    stats: {
        pageViews: {
            type: Number,
            default: 0
        },
        numberOfWineries: {
            type: Number,
            default: 0
        }
    }
}, {
    strict: true
});

RegionSchema.set('versionKey', false);

/***************************
 *  Methods
 ***************************/

/**
 *  Add winery to country db
 *
 *  @param {Array} wines
 */
RegionSchema.methods.addWinery = function(winery, cb) {
    this.wineries.addToSet(winery);

    this.save(function(err) {
        if (err) {
            return cb(RegionError('Winery not added'));
        }
        return cb(null);
    });
};

RegionSchema.methods.removeWinery = function(winery, cb) {
    var doc = this;
    doc.wineries.id(winery._id).remove(function(err) {
        if (err) {
            return cb(RegionError('Winery not deleted'));
        }
        doc.save(function(err) {
            if (err) {
                return cb(RegionError('Winery not deleted'));
            }
            return cb(null);
        });
    });

};


/***************************
 *  Statics
 ***************************/
RegionSchema.statics.searchByName = function(name, cb) {
    this.find({
        name: name
    }, cb);
};

/***************
 *  PLUGINS
 ***************/

/**
 * increment _id field
 */
RegionSchema.plugin(autoIncrement.plugin, {
    model: 'Region',
    startAt: 0,
    incrementBy: 1,
    prepend: 7
});

/**
 * Add url field and write to it url based name
 */
RegionSchema.plugin(plugin.urlify);

/**
 * Add page view mehod
 */
RegionSchema.plugin(plugin.pageView);

/**
 * Add picture field an picture methods
 */
RegionSchema.plugin(plugin.picture);

/**
 * Add publish field and method
 */
RegionSchema.plugin(plugin.publish);

/**
 * Add modified field
 */
RegionSchema.plugin(plugin.modified);


module.exports = mongoose.model('Region', RegionSchema, 'countries');
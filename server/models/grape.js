var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    plugin = require('./plugins.js'),
    subschema = require('./subschemes.js'),
    helper = require('../helperMethods.js');

var GrapeError = helper.Error('Grape');

var GrapeSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    aka: [], // also known as - secondary names
    article: {
        type: String
    },
    year: {
        type: Number
    },
    country: [subschema.LocationSchema], //name, republic
    kalem: [subschema.ShortGrapeSchema],
    stats: {
    } //statistic   perhaps number of wineris with this grape
}, {
    strict: true
});
GrapeSchema.set('versionKey', false);

/***************************
 *  Methods
 ***************************/
/**
 *  Update statistics for number of wines
 *
 */
GrapeSchema.methods.addWine = function(cb) {
    this.stats.numberOfWines += 1;

    this.save(function(err) {
        if (err) {
            return cb(GrapeError('Statistic not updated'));
        }
        return cb(null);
    });
};

/**
 *  Update statistics for number of wineries
 *
 */
GrapeSchema.methods.addWinery = function(cb) {
    this.stats.numberOfWineries += 1;

    this.save(function(err) {
        if (err) {
            return cb(GrapeError('Statistic not updated'));
        }
        return cb(null);
    });
};

/***************************
 *  Statics
 ***************************/
GrapeSchema.statics.searchByName = function(name, cb) {
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
GrapeSchema.plugin(plugin.urlify);

/**
 * Add publish field and method
 */
GrapeSchema.plugin(plugin.publish);
/**
 * Add picture field an picture methods
 */
GrapeSchema.plugin(plugin.picture);
/**
 * Add page view mehod
 */
GrapeSchema.plugin(plugin.pageView);

/**
 * Add modified field
 */
GrapeSchema.plugin(plugin.modified);


module.exports = mongoose.model('Grape', GrapeSchema, 'grape');
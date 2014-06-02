var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    plugin = require('./plugins.js'),
    subschema = require('./subschemes.js');

var MerchantSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
        max: 50,
        min: 5
    },
    email: {
        type: String,
        required: true
    },
    tel: [],
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    article: {
        type: String
    },
    region: [subschema.LocationSchema], //CountriesSchema
    rss: {
        type: String
    },
    shipping: {
        type: String
    },
    postage: {
        Type: String
    },
    orderTerms: {
        type: String
    }, //terms of order
    wines: [subschema.MerchantWineSchema],
    www: {
        type: String
    },
    retail: {
        type: Boolean
    },
    onlineOrdering: {
        type: Boolean
    },
    stats: {
        pageViews: {
            type: Number,
            default: 0
        }
    }
}, {
    strict: true
});

virtual = MerchantSchema.virtual('idurl');
virtual.get(function() {
    return this._id + '/' + this.url;
});

/**
 *  Transform function used to transform document for public use
 */
if (!MerchantSchema.options.toObject) MerchantSchema.options.toObject = {};
MerchantSchema.options.toObject.transform = function(doc, ret, options) {
    delete ret._id;
    delete ret.published;
    delete ret.stats;
    delete ret.addedBy;
    delete ret.modified;
    delete ret.review;
};

/***************************
 *  Methods
 ***************************/


/***************
 *  PLUGINS
 ***************/

/**
 * increment _id field
 */
MerchantSchema.plugin(autoIncrement.plugin, {
    model: 'Merchant',
    startAt: 0,
    incrementBy: 1,
    prepend: 7
});

/**
 * Add url field and write to it url based name
 */
MerchantSchema.plugin(plugin.urlify);

/**
 * Add reviews and topReview fields.
 */
MerchantSchema.plugin(plugin.review);

/**
 * Add publish field and method
 */
MerchantSchema.plugin(plugin.publish);

/**
 * Add picture field an picture methods
 */
MerchantSchema.plugin(plugin.picture);

/**
 * Add map field an map methods
 */
MerchantSchema.plugin(plugin.map);

/**
 * Add notified field an notified methods
 */
MerchantSchema.plugin(plugin.notify);

/**
 * Add page view method
 */
MerchantSchema.plugin(plugin.pageView);

/**
 * Add addedBy field
 */
MerchantSchema.plugin(plugin.addedBy);

/**
 * Add modified field
 */
MerchantSchema.plugin(plugin.modified);


module.exports = mongoose.model('Merchant', MerchantSchema, 'merchant');
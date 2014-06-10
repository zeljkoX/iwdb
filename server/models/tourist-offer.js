var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    plugin = require('./plugins.js'),
    subschema = require('./subschemes.js'),
    helper = require('../helperMethods.js');

var OfferError = helper.Error('Offer');


var OfferSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
        max: 50,
        min: 5
    },
    agency: {
        name: {
            type: String,
            required: true
        },
        _id: {
            type: String,
            required: true
        },
        phone: {
            type: String
        },
        email: {
            type: String
        },
        www: {
            type: String
        }
    },
    price: {
        value: {
            type: Number,
            min: 0
        },
        currency: {
            type: String
        }
    },
    duration: {
        type: Number, //number of days
        required: true,
        default: 1
    },
    available: {
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Daily']
        },
        hour: {
            type: String
        }
    },
    include: {
        booking: {
            type: Boolean,
            default: false
        },
        food: {
            type: Boolean,
            default: false
        },
        sleep: {
            type: Boolean,
            default: false
        },
        guided: {
            type: Boolean
        },
        shop: {
            type: Boolean
        },
        wineTasting: {
            type: Boolean
        }
    },
    article: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    region: [subschema.ShortRegionSchema],
    winery: [subschema.ShortWinerySchema] // list of Wineries
}, {
    strict: true
});

OfferSchema.set('versionKey', false);

virtual = OfferSchema.virtual('idurl');
virtual.get(function() {
    return this._id + '/' + this.url;
});

/***************************
 *  Methods
 ***************************/


/***************************
 *  Statics
 ***************************/


/***************
 *  PLUGINS
 ***************/

/**
 * increment _id field
 */
OfferSchema.plugin(autoIncrement.plugin, {
    model: 'Offer',
    prepend: 7
});

/**
 * Add url field and write to it url based name
 */
OfferSchema.plugin(plugin.urlify);

/**
 * Add reviews and topReview fields.
 */
OfferSchema.plugin(plugin.review);

/**
 * Add rating .
 */
OfferSchema.plugin(plugin.rating);

/**
 * Add publish field and method
 */
OfferSchema.plugin(plugin.publish);

/**
 * Add picture field an picture methods
 */
OfferSchema.plugin(plugin.picture);

/**
 * Add page view mehod
 */
OfferSchema.plugin(plugin.pageView);

/**
 * Add addedBy field
 */
OfferSchema.plugin(plugin.addedBy);

/**
 * Add modified field
 */
OfferSchema.plugin(plugin.modified);



module.exports = mongoose.model('Offer', OfferSchema, 'offer');
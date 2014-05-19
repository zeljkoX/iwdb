var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    urlifyPlugin = require('./plugins.js').urlify,
    subschema = require('./subschemes.js');

var MerchantSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
        max: 50,
        min: 5
    },
    url: {
        type: String //Calculated based on name field
    },
    published: {
        type: Boolean
    },
    email: {
        type: String
    },
    tel: [],
    city: {
        type: String
    },
    country: {
        type: String
    },
    article: {
        type: String
    },
    region: [subschema.LocationSchema], //CountriesSchema
    profil: {
        type: String
    },
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
    reviews: [subschema.ReviewSchema],
    rating: [subschema.RatingSchema],
    www: {
        type: String
    },
    map: {},
    created: {
        type: Date
    },
    modified: {
        type: Date
    },
    retail: {
        type: Boolean
    },
    onlineOrdering: {
        type: Boolean
    },
    stat: {} //numberOfupdates Maybe??
});

virtual = MerchantSchema.virtual('idurl');
virtual.get(function() {
    return this._id + '/' + this.url;
});

MerchantSchema.plugin(autoIncrement.plugin, 'Merchant');
MerchantSchema.plugin(urlifyPlugin);
module.exports = mongoose.model('Merchant', MerchantSchema, 'merchant');
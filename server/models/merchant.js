var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    subschema = require('./subschemes.js');

var MerchantSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
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
    rating: {},
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
    numberOfUpdates: {} //Maybe??
});
MerchantSchema.plugin(autoIncrement.plugin, 'Merchant');
module.exports = mongoose.model('Merchant', MerchantSchema, 'merchant');
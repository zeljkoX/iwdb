var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    urlify = require('urlify'),
    urlifyPlugin = require('./plugins.js').urlify,
    subschema = require('./subschemes.js');

/**
 * Schemas definitions
 */
/*
Operacije:
-trazi vino po ID
-trazi po imenu
*/
var WineSchema = new Schema({
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
    vintage: {
        type: Number
    }, //year of harvest
    addedBy: {
        type: String,
        enum: ['user', 'admin']
    },
    profil: {
        type: String
    }, //picture
    pictures: [subschema.PictureSchema],
    winery: {}, //{name, id, state, region , contact}
    alc: {
        type: Number
    },
    volume: {
        type: Number
    }, //size of bottle
    intro: {
        type: String
    }, //short descrioption
    article: {
        type: String
    },
    varietal: [subschema.ShortGrapeSchema],
    wineType: {
        type: String,
        enum: ['red', 'white', 'rose', 'sampanjac']
    },
    sweetness: {
        type: String,
        enum: ['dry', 'semydry', 'sweet']
    },
    averagePrice: {
        type: Number
    },
    awards: [subschema.AwardPerWineSchema], //awards for that particular wine
    food: {
        type: String
    },
    score: {
        type: Number
    },
    color: {
        type: String
    },
    smell: {
        type: String
    },
    taste: {
        type: String
    },
    clima: {
        type: String
    },
    sugar: {
        type: Number
    },
    food: [],
    temperature: {
        type: Number
    },
    organic: {
        type: Boolean
    },
    odlezavanje: {
        type: String
    },
    rss: {
        type: String
    },
    merchants: [subschema.ShortMerchantSchema],
    news: [] //news related to this document TO DO
});
WineSchema.statics.searchByWinery = function(name, cb) {
    this.find({
        name: name // winery.name
    }, cb);
};

WineSchema.plugin(autoIncrement.plugin, {
    model: 'Wine',
    startAt: 0,
    incrementBy: 1,
    prepend: 7
});
WineSchema.plugin(urlifyPlugin);
module.exports = mongoose.model('Wine', WineSchema, 'wine');
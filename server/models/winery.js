var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    urlifyPlugin = require('./plugins.js').urlify,
    subschema = require('./subschemes.js');


var WinerySchema = new Schema({
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
    established: {
        type: Number
    },
    country: {}, // {name , republic}
    contact: {}, // {tel:[], email, www}
    touristInfo: {}, //{restaurant, hotel}
    location: {}, // street adress, city
    description: {
        type: String
    },
    profil: {
        type: String
    }, //picture
    wines: [subschema.ListOfWinesSchema], //listOfWinesSchema
    media: [subschema.MediaSchema],
    selling: {
        type: String
    }, //?
    recenzion: [], //to implement
    literPerYear: {
        type: Number
    },
    altitude: {
        type: Number
    },
    owner: {
        type: String
    },
    povrsina: {
        type: Number
    },
    notified: {
        type: Boolean
    }, //email nootification to winery
    grapes: [subschema.ShortGrapeSchema],
    pictures: [subschema.PictureSchema],
    awards: [subschema.AwardPerWineSchema],
    wineriesLocations: [subschema.LocationSchema], //definition of wineyards   WineriesLocationSchema
    rss: {
        type: String
    },
    map: {},
    news: [] //news related to this document TO DO
});
WinerySchema.statics.searchByCountry = function(name, cb) {
    this.find({
        name: name //country.name
    }, cb);
};

WinerySchema.statics.searchByCountryAndName = function(country, name, cb) {
    this.find({
        name: country, //country.name
        name: name
    }, cb);
};

WinerySchema.plugin(autoIncrement.plugin, {
    model: 'Winery',
    startAt: 0,
    incrementBy: 1,
    prepend: 7
});
WinerySchema.plugin(urlifyPlugin);
module.exports = mongoose.model('Winery', WinerySchema, 'winery');
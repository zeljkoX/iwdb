var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    subschema = require('./subschemes.js');

var GrapeSchema = new Schema({
    name: {
        type: String
    },
    aka: [], // also known as - secondary names
    published: {
        type: Boolean
    },
    article: {
        type: String
    },
    year: {
        type: Number
    },
    country: [subschema.LocationSchema], //name, republic
    kalem: [subschema.ShortGrapeSchema],
    stat: {} //statistic   perhaps number of wineris with this grape
});
GrapeSchema.statics.searchByName = function(name, cb) {
    this.find({
        name: name
    }, cb);
};

module.exports = mongoose.model('Grape', GrapeSchema, 'grape');
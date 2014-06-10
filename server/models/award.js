var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    Wine = require('./wine.js'),
    Winery = require('./winery.js'),
    plugin = require('./plugins.js'),
    subschema = require('./subschemes.js'),
    helper = require('../helperMethods.js');

var AwardError = helper.Error('Award');
var AwardModel = mongoose.model('AwardModel', subschema.AwardSchema)

/** 
Fields edited by user
{name, rank, year, location, article, rss, position, region}
*/

/**
On change:
field: name, location
    -update year field, iterate every document and modify winery.name field
    -in iteration access every document and change its subschema (AwardPerWineSchema) , name field
*/


var AwardSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
        max: 50,
        min: 3
    },
    rank: [subschema.AwardRankSchema], //fields: [name, descriptio, picture, rank]
    year: {
        redaRadi: {}
    }, //redaRadi polje je da bi inicijalni dokument sadrzavao polje year
    location: {
        type: String
    },
    article: {
        type: String
    },
    region: [subschema.locationSchema], //fields: [{name, id}]
    rss: {
        type: String
    },
    position: {
        type: Number, //used for positioning between awards
        required: true
    },
    stats: {
    }
}, {
    strict: true
});

AwardSchema.set('versionKey', false);


virtual = AwardSchema.virtual('idurl');
virtual.get(function() {
    return this._id + '/' + this.url;
});

/**
 *  Transform function used to transform document for public use
 */
if (!AwardSchema.options.toObject) AwardSchema.options.toObject = {};
AwardSchema.options.toObject.transform = function(doc, ret, options) {
    delete ret._id;
    delete ret.published;
    delete ret.stats;
    delete ret.news;
    delete ret.addedBy;
    delete ret.modified;

};
/***************************
 *  Methods
 ***************************/

/**
 *  Add awards
 *
 *  @param {Object} awards
 *  @param {Function} cb
 */


AwardSchema.methods.addAwards = function(awards, cb) {
    if (!Array.isArray(awards) || !cb) {
        return cb(AwardError('Arguments not valid'));
    }
    var doc = this;

    awards.forEach(function(award) {
        try {
            var model = new AwardModel(award);

            if (!doc.year.hasOwnProperty(award.year)) {
                doc.year[award.year] = {};
                doc.rank.forEach(function(item) {
                    doc.year[award.year][item.name] = [];
                });
            }

            doc.year[award.year][award.rank.name].push(model);
            /* if (doc.awards[award.name].indexOf(award) == -1) {
            doc.awards[award.name].push(award);
            Wine.findById(award.wine._id, function(wine) {
                wine.addAwards([award]);
            });
            Winery.findById(award.winery._id, function(winery) {
                winery.addAwards([award]);
            });
        }*/
        } catch (err) {
            return cb(AwardError('Exception: addAwards()'));
        }
    });

    this.save(function(err) {
        if (err) {
            return cb(AwardError('Awards not saved'));
        }
        cb(null);
    });
};

AwardSchema.methods.removeAwards = function(awards, cb) {
    if (!Array.isArray(awards) || !cb) {
        return cb(AwardError('Arguments not valid'));
    }
    var doc = this;

    awards.forEach(function(award) {
        try {
            var array = doc.year[award.year][award.rank.name],
                index = array.indexOf(award);
            array.splice(index, 1);
        } catch (err) {
            return cb(AwardError('Exception: removeAwards()'));
        }
    });

    this.save(function(err) {
        if (err) {
            return cb(AwardError('Awards not removed'));
        }
        cb(null);
    });

};

AwardSchema.methods.addRank = function(rank, cb) {
    if (!rank || !cb) {
        return;
    }
    var doc = this;
    //iterate every year and add field for that rank
    doc.rank.push(rank);
    /*Object.keys(doc.year).forEach(function(year) {
        if (year) {
            doc.year[year][rank.name] = [];
        }
    });*/
    doc.save(function(err) {
        if (err) {
            return cb(AwardError('Rank not saved'));
        }
        cb(null);
    });
};

AwardSchema.methods.deleteRank = function(rank, cb) {
    //should delete all wines for that rank TODO
    if (!rank || !cb) {
        return;
    }
    var doc = this;
    doc.rank.id(rank._id).remove(function(err) {
        if (err) {
            cb(AwardError('Rank not deleted'));
        }
        Object.keys(doc.year).forEach(function(year) {
            delete doc.year[year][rank.name];
        });
    });
};


/***************************
 *  Statics
 ***************************/

AwardSchema.statics.searchByName = function(name, cb) {
    this.findOne({
        name: id
    }, cb)
};

AwardSchema.statics.searchByNameAndYear = function(name, year, cb) {
    this.findOne({
        name: id
    }, function(err, result) {
        if (err) {
            return;
        }
        return cb(false, result.years.id(year));
    });

};


/***************
 *  PLUGINS
 ***************/

/**
 * increment _id field
 */
AwardSchema.plugin(autoIncrement.plugin, {
    model: 'Award',
    prepend: 7
});

/**
 * Add url field and write to it url based name
 */
AwardSchema.plugin(plugin.urlify);

/**
 * Add reviews and topReview fields.
 */
AwardSchema.plugin(plugin.review);

/**
 * Add publish field and method
 */
AwardSchema.plugin(plugin.publish);

/**
 * Add picture field an picture methods
 */
AwardSchema.plugin(plugin.picture);

/**
 * Add page view mehod
 */
AwardSchema.plugin(plugin.pageView);

/**
 * Add addedBy field
 */
AwardSchema.plugin(plugin.addedBy);

/**
 * Add modified field
 */
AwardSchema.plugin(plugin.modified);


module.exports = mongoose.model('Award', AwardSchema, 'award');
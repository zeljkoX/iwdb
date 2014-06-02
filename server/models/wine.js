var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    plugin = require('./plugins.js'),
    subschema = require('./subschemes.js');


/** 
Fields edited by user
{name, vintage, alc, volume, intro, article, varietal, wineType, sweetness, awards, details, rss}
*/

/**
On change:
field: name, 
    -update subdocument in winery db
    -iterate every award and change name of wine
    -iterate merchant wine schema and update
    
*/

/**
 * Schemas definitions
 */

var WineSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
        max: 50,
        min: 5
    },
    vintage: {
        type: Number
    }, //year of harvest  ??? to delete
    addedBy: {
        name: {
            type: String
        },
        _id: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    winery: {
        name: {
            type: String
        },
        _id: {
            type: String
        },
        country: {
            type: String
        },
        state: {
            type: String
        },
        region: {
            type: String
        }
    },
    alc: {
        type: Number
    },
    volume: [], //size of bottle
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
    awards: [subschema.AwardPerWineSchema], //awards for that particular wine  //add as plugin

    details: {
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
        }
    },
    rss: {
        type: String
    },
    merchants: [subschema.ShortMerchantSchema],
    news: [], //news related to this document TO DO
    stats: {
        pageViews: {
            type: Number,
            default: 0
        }
    },
}, {
    strict: true
});

WineSchema.set('versionKey', false);

/***************************
 *  Virtual fields
 ***************************/
var idurl = WineSchema.virtual('idurl');
idurl.get(function() {
    return this._id + '/' + this.url;
});

var numberOfAwards = WineSchema.virtual('numberOfAwards');
numberOfAwards.get(function() {
    return this.awards.length;
});

/***************************
 *  Methods
 ***************************/

/**
 *  Method to invoke after document is updated
 *  fix dependencies
 *  @param 
 */
WinerySchema.methods.onUpdate = function(cb) {
    //if name is updated
    function name(){
        //update subdocument in winery db
        
        //iterate every award and change name of wine
        
        //iterate merchant wine schema and update
    };
    

};


/***************************
 *  Statics
 ***************************/

WineSchema.statics.searchByWinery = function(name, cb) {
    this.find({
        name: name // winery.name
    }, cb);
};

/***************
 *  PLUGINS
 ***************/

/**
 * increment _id field
 */
WineSchema.plugin(autoIncrement.plugin, {
    model: 'Wine',
    startAt: 0,
    incrementBy: 1,
    prepend: 7
});

/**
 * Add url field and write to it url based name
 */
WineSchema.plugin(plugin.urlify);

/**
 * Add awards field and addAwards method
 */
WineSchema.plugin(plugin.awards);

/**
 * Add reviews and topReview fields.
 */
WineSchema.plugin(plugin.rating);

/**
 * Add reviews and topReview fields.
 */
WineSchema.plugin(plugin.review);

/**
 * Add publish field and method
 */
WineSchema.plugin(plugin.publish);

/**
 * Add picture field an picture methods
 */
WineSchema.plugin(plugin.picture);

/**
 * Add page view mehod
 */
WineSchema.plugin(plugin.pageView);

/**
 * Add addedBy field
 */
WineSchema.plugin(plugin.addedBy);

/**
 * Add modified field
 */
WineSchema.plugin(plugin.modified);

module.exports = mongoose.model('Wine', WineSchema, 'wine');
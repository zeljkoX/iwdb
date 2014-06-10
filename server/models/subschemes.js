/**
Subschemas used in main schemas documents
*/
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
Used in: wine.js, country.js, grape.js, winery.js
*/
exports.ShortGrapeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    _id: {
        type: String
    }
});


/**
Used in: 
*/
exports.ShortWineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    _id: {type: String}
});


exports.ShortRegionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    _id: {
        type: String
    }
});
/**
Used in: winery.js, wine.js
*/
exports.AwardSchema = new Schema({
    year: {
        type: Number
    },
    wine: {
        name: {
            type: String,
            required: true
        },
        _id: {
            type: String
        }
    },
    winery: {
        name: {
            type: String,
            required: true
        },
        _id: {
            type: String
        }
    },
    rank: {
        name: {
            type: String,
            required: true
        },
        _id: {
            type: String
        }
    }
});

exports.AwardRankSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    picture: {
        type: String
    },
    rank: {
        type: Number
    }
});
/**
Used in: winery.js, wine.js
*/
exports.AwardPerWineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    vintage: {
        type: Number
    },
    awardId: {
        type: String //Schema.Types.ObjectId
    },
    awardYear: {
        type: Number
    },
    rank: {
        type: String
    },
    _id: {
        type: String
    }
});

/**
Used in: winery.js
*/
ListOfWinesSchema = new Schema({
    red: [exports.ShortWineSchema],
    white: [exports.ShortWineSchema],
    rose: [exports.ShortWineSchema],
    sampanjac: [exports.ShortWineSchema]
});

/**
Used in: 
*/
exports.AwardRankSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    picture: {
        type: String
    },
    rank: {
        type: Number
    }
});

/**
Used in: 
*/
exports.PictureSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    alt: {
        type: String
    },
    name: {
        type: String
    }
});

/**
Used in: winery.js, wine.js
*/
exports.MediaSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    description: {
        type: String
    }
});

/**
Used in: 
*/
exports.ShortWinerySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    _id: {
        type: String
    },
    map: {},
    address: {
        type: String
    }
});

/**
Used in: 
*/
exports.WinariesLocationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lat: {
        type: Number
    },
    lon: {
        type: Number
    },
    povrsina: {
        type: String
    },
    city: {
        type: Number
    },
    street: {
        type: String
    },
    grapes: [exports.ShortGrapeSchema],
    numberOfGrapes: {
        type: String
    }
});

/**
Used in: 
*/
exports.MerchantWineSchema = new Schema({
    wine: {
        name: {
            type: String,
            required: true
        },
        _id: {
            type: String
        },
        vintage: {
            type: Number
        }
    },
    winery: {
        name: {
            type: String
        },
        _id: {
            type: String
        }
    },
    price: {
        type: Number
    },
    currency: {
        type: String
    }
});

/**
Used in: wine.js, country.js, merchant.js
*/
exports.ShortMerchantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    _id: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    price: {
        type: String
    },
    currency: {
        type: String
    }
});

/**
Used in: 
*/
exports.TouristPlanSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    winery: [], //ShortWinerySchema
    price: {
        type: String
    }
});

exports.LocationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    _id: {
        type: String //TODO Object ID
    }
});

exports.ReviewSchema = new Schema({
    user: {}, //id, name, location
    date: {
        type: Date,
        default: Date.now
    },
    plus: {
        type: Number
    },
    minus: {
        type: Number
    },
    rating: {
        type: Number //Rating od strane korisnika koji je napisao recenziju
    },
    review: {
        type: String
    }
});

exports.RatingSchema = new Schema({
    1: {
        type: Number
    },
    2: {
        type: Number
    },
    4: {
        type: Number
    },
    5: {
        type: Number
    },
    6: {
        type: Number
    },
    7: {
        type: Number
    },
    8: {
        type: Number
    },
    9: {
        type: Number
    },
    10: {
        type: Number
    },
    sum: {
        type: Number
    },
    number: {
        type: Number
    }, //number of ratings
    rate: {
        type: Number,
        min: 0,
        max: 10
    }
});

exports.UserReviewSchema = new Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    review: {
        type: String
    },
    rating: {
        type: Number
    },
    _id: {
        type: String
    }
});

exports.LikedReviewSchema = new Schema({
    _id: { //rid
        type: String
    },
    pid: {
        type: String
    }, //page id TODO
    like: {
        type: Boolean,
        default: false
    }
});

exports.UserRatingSchema = new Schema({
    pageId: {
        type: String
    },
    date: {
        type: Date
    },
    rate: {
        type: Number
    }
});

exports.PictureSchema = new Schema({
    name: {
        type: String
    },
    url: {
        type: String //url from other site
    },
    desc: {
        type: String
    }
});

exports.PageMiniSchema = new Schema({
    name: {
        type: String
    },

    _id: {
        type: String //url from other site
    },
    category: {
        type: String
    }
});
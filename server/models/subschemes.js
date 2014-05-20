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
    _id: Schema.Types.ObjectId
});


/**
Used in: 
*/
exports.ShortWineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    wineId: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId
    },
    awardYear: {
        type: Number
    },
    award: {
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
exports.AwardPrizeSchema = new Schema({
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
    _id: Schema.Types.ObjectId,
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
    wineName: {
        type: String,
        required: true
    },
    winery: {
        type: String
    },
    wineId: {
        type: Schema.Types.ObjectId
    },
    wineVintage: {
        type: Number
    }, //Godina berbe
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
    _id: Schema.Types.ObjectId,
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
    id: {
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
        type: Number,
        min: 1,
        max: 10
    },
    2: {
        type: Number,
        min: 1,
        max: 10
    },
    4: {
        type: Number,
        min: 1,
        max: 10
    },
    5: {
        type: Number,
        min: 1,
        max: 10
    },
    6: {
        type: Number,
        min: 1,
        max: 10
    },
    7: {
        type: Number,
        min: 1,
        max: 10
    },
    8: {
        type: Number,
        min: 1,
        max: 10
    },
    9: {
        type: Number
    },
    10: {
        type: Number,
        min: 1,
        max: 10
    },
    all: {
        type: Number, //Ukupan broj ocjena
        min: 1,
        max: 10
    },
    rate: {
        type: Number,
        min: 0,
        max: 10
    }
});

exports.UserReviewSchema = new Schema({
    pageId: {
        type: String
    },
    pageName: {
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
    category: {
        type: String
    }
});

exports.LikedReviewSchema = new Schema({
    rid: {
        type: String
    },
    pid: {
        type: String
    }, //pafe id TODO
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
        type: Number,
        min: 1,
        max: 10
    }
});

exports.PictureSchema = new Schema({
    name: {},
    url: {
        type: String //url from other site
    },
    desc: {
        type: String
    }
});
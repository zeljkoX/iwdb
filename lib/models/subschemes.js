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
    awardId: Schema.Types.ObjectId,
    wineYear: {
        type: Number
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
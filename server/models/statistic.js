var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    plugin = require('./plugins.js'),
    subschema = require('./subschemes.js');


var StatisticSchema = new Schema({
    topArticles: [],
    lastAddedArticles: [],
    published: Number,
    unpublished: Number,
    custom: {}
});

module.exports = mongoose.model('Statistic', StatisticSchema, 'statistic');

/*
Winery
	topArticles: tip viewed wineries
    lastAddedArticles: last added winaries
    published: number of published winaries
    unpublished: number of unpublished winaries
    custom: {}

Wine
	topArticles: tip viewed wines
    lastAddedArticles: last added wines
    published: number of published wines
    unpublished: number of unpublished wines
    custom: {}


Awards
	topArticles: top viewed awards 
    lastAddedArticles: last added awards
    published: number of published awards
    unpublished: number of unpublished awards
    custom: {}


Country
	- topArticles: tip viewed wineries
    - lastAddedArticles: last added winaries
    - published: number of published winaries
    - unpublished: number of unpublished winaries
    custom: {
		topWinaries by country
		

    }

*/
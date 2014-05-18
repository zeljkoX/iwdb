var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EditSchema = new Schema({
	user: {type: String, required: true},
	explanation: {type: String},
	category: {type: String},
	date: {type: Date},
	changes: {}    //json object of changes
});

module.exports = mongoose.model('Edit', EditSchema, 'edit');
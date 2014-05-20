var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AdminSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
        max: 50,
        min: 3
    }
});

module.exports = mongoose.model('Admin', AdminSchema, 'admin');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    mainUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String
    }
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('ShortUrl', schema);
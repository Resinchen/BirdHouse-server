const { Schema, model } = require('mongoose');
var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const schema = new Schema({
    latitude: {type: SchemaTypes.Double, required: true},
    longitude: {type: SchemaTypes.Double, required: true}
});

module.exports = model('Point', schema);

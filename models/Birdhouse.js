const { Schema, model } = require('mongoose');
var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const toHexString = (stroke) => {
    var result = '';
    for (var i = 0; i < stroke.length; i++) {
        result += stroke.charCodeAt(i).toString(16);
    }
    return result;
};

const schema = new Schema({
    id_device: {
        type: String,
        required: true,
        set: (data) => toHexString(data),
    },
    address: {
        type: Object,
        required: true,
        get: (data) => {
            try {
                return JSON.parse(data);
            } catch (err) {
                return data;
            }
        },
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Point',
        required: true,
    },
    visiters: { type: Map, of: Number },
    filled: { type: SchemaTypes.Double, default: 0.0 },
    date_created: {type: Date, default: Date.now()}
});

module.exports = model('Birdhouse', schema);

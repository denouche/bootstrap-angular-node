'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var UserSchema = new Schema({
    name:                   { type: String, required: true },
    email:                  { type: String, required: true },
    creationDate:           { type: Date, default: Date.now },
    status:                 { type: String, enum: ['ok', 'deleted'], default: 'ok' },
    contacts:               [ { type: Schema.Types.ObjectId, ref: 'Contact' }]
});

module.exports = mongoose.model('User', UserSchema);

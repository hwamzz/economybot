const mongo = require('mongoose')

module.exports = mongo.model(
    'Cards',
    new mongo.Schema({
        name: String,
        value: Number,
        suit: String
    })
);
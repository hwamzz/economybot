const mongo = require('mongoose')

module.exports = mongo.model(
    'crypto',
    new mongo.Schema({
        id: String,
        btc: { 
            type: Number, 
            default: 0,
            required: true 
        },
        ltc: { 
            type: Number, 
            default: 0,
            required: true 
        },
        eth: { 
            type: Number, 
            default: 0,
            required: true 
        },
    })
);
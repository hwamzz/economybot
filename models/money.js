const mongo = require('mongoose')

module.exports = mongo.model(
    'money',
    new mongo.Schema({
        id: String,
        purse: { 
            type: Number, 
            default: 0,
            required: true 
        },
        bank: { 
            type: Number, 
            default: 0,
            required: true 
        },
    })
);
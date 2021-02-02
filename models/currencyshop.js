const mongo = require('mongoose')

module.exports = mongo.model(
    'currency-shop',
    new mongo.Schema({
        name: { 
            type: String, 
            unique: true 
        },
        cost: { 
            type: Number, 
            required: true
        }
    })
);
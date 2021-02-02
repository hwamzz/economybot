const mongo = require('mongoose')

module.exports = mongo.model(
    'member-items',
    new mongo.Schema({
        member_id: String,
        item_id: String,
        amount: { 
            type: Number, 
            required: true, 
            default: 0
        }
    })
)
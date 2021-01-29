const mongo = require('mongoose')

mongo.connect("mongodb+srv://hwamzz:Hooded789@cluster0.ndh1e.mongodb.net/test", {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const cards = require('./schemas/cards')

function seedCards(model) {
    const suits = ['HEARTS', 'DIAMONDS', 'CLUBS', 'SPADES']
    const cards = [
        {name: 'ACE', value: 1, alternative_value: 11}, 
        {name: '2', value: 2}, 
        {name: '3', value: 3}, 
        {name: '4', value: 4}, 
        {name: '5', value: 5}, 
        {name: '6', value: 6}, 
        {name: '7', value: 7},
        {name: '8', value: 8},
        {name: '9', value: 9},
        {name: '10', value: 10},
        {name: 'JACK', value: 10},
        {name: 'QUEEN', value: 10},
        {name: 'KING', value: 10}, 
    ]
    for (suit in suits) {
        for (card in cards) {
            cards[card].suit = suits[suit]
            //console.log(suits[suit])
            //console.log(cards[card])
        }
        //console.log(cards)
        model.cards.insert(cards, function (err, docs) {
            if (err) { 
                return console.error(err);
            } else {
              console.log("Multiple documents inserted to Collection");
            }
        }); 
    } 
}
seedCards(cards)
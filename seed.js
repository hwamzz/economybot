const mongo = require('mongoose')
const { Seeder } = require('mongo-seeding')
const config = {
    database: "mongodb+srv://hwamzz:Hooded789@cluster0.ndh1e.mongodb.net/test",
    dropDatabase: false,
    dropCollections: true,
}
const currencyshop = require('./models/currencyshop')
require('./models/money')
require('./models/memberitems')
const seeder = new Seeder(config);
const seedShop = new Seeder(config);

const generateCards = () => {
    let decks = [];
    let newCards = [];
    let suits = ['HEARTS', 'DIAMONDS', 'SPADES', 'CLUBS']
    let cards = [
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
            newCards = cards.map(v => ({...v, suit:  suits[suit]}))
        }
        decks.push(newCards);
    }
    return decks.flat();
}


const shop = [ currencyshop.updateMany
                ({ name: 'Tea', cost: 1 }),
                ({ name: 'Coffee', cost: 2 }),
                ({ name: 'Cake', cost: 5 }),
            ];


(async () => {
    try {
        await seeder.import( [{ name: 'cards', documents: generateCards() }] )
        console.log('Seed complete!')
    } catch (err) {
        console.log(err)
    }
})()


try {
    seedShop.import( [{ name: 'currencyshop', documents: shop }] )
    console.log('Shop seed complete!')
} catch (err) {
    console.log(err)
}


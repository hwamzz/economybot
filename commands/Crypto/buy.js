const { Client, Message, MessageEmbed } = require('discord.js')
const { get } = require('https')
const httpClient = require('axios')

// Nomics API
const endpoint = 'https://api.nomics.com/v1/'
const resource = 'currencies/ticker'
const NOMICS_API_KEY = '88f99dbd0b96afd980d4b11c6df15906'; 
const params = '&interval=1d,30d&convert=GBP&per-page=100&page=1'

module.exports = {
    name: 'buy',
    usage: 'e!buy <cryptocurrency>',
    description: 'Buy a crypto currency from our list: BTC, LTC or ETH using your purse balance!',
    run: async(client, message, args) => {
        const member = message.member;
        // Check if there are args
        if(!args[0]) return message.channel.send('Please include a cryptocurrency to buy (BTC, LTC or ETH)')
        if(!args[1]) return message.channel.send('Please include an amount to buy!')
        // Define args
        const amountToBuy = parseInt(args[1])
        const cryptocur = args[0].toUpperCase()
        const crypto = ['BTC', 'LTC', 'ETH', 'eth', 'btc', 'ltc'];
        // Check if valid crypto and if args are correct values
        if(!crypto.includes(args[0])) return message.channel.send('Invalid cryptocurrency provided (BTC, LTC or ETH)!')
        if(!isNaN(args[0])) return message.channel.send('This value cannot be a number')
        if(isNaN(args[1])) return message.channel.send('Amount to buy must be a number')

        // Get price of crypto
        let response = [];
        let url = `${endpoint}${resource}?key=${NOMICS_API_KEY}&ids=${cryptocur}${params}`
        response = await httpClient.get(url)
        .catch(err => {
            console.log(err)
        })

        let price = parseInt(response.data[0].price).toFixed(0);

        // Check if they have enough coins, remove the coins from their balance, give them the crypto
        const totalCost = price * amountToBuy;
        if(await client.purse(message.author.id) < totalCost) return message.channel.send(`You don't have enough coins to make this purchase!`);

        if (cryptocur === 'BTC') {
            client.rmv(member.id, totalCost)
            client.addBTC(member.id, amountToBuy)
            message.channel.send(`Successfully bought ${amountToBuy} ${cryptocur} for £${totalCost}!`)
        } else if (cryptocur === 'LTC') {
            client.rmv(member.id, totalCost)
            client.addLTC(member.id, amountToBuy)
            message.channel.send(`Successfully bought ${amountToBuy} ${cryptocur} for £${totalCost}!`)
        } else if (cryptocur === 'ETH') {
            client.rmv(member.id, totalCost)
            client.addETH(member.id, amountToBuy)
            message.channel.send(`Successfully bought ${amountToBuy} ${cryptocur} for £${totalCost}!`)
        } else {
            return message.channel.send('An internal error occured please contact a developer or try again later!')
        }
    }
}
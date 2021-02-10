const { Client, Message, MessageEmbed } = require('discord.js')
const querystring = require('querystring')
const fetch = require('node-fetch')
const { get } = require('https')
const httpClient = require('axios')

// Nomics API
const endpoint = 'https://api.nomics.com/v1/'
const resource = 'currencies/ticker'
const NOMICS_API_KEY = '88f99dbd0b96afd980d4b11c6df15906'; 
const params = '&interval=1d,30d&convert=GBP&per-page=100&page=1'

module.exports = {
    name: 'sell',
    usage: 'e!sell <crypto> <amount',
    description: 'Sell a crypto currency from our list: BTC, LTC or ETH for coins!',
    run: async(client, message, args) => {
        const member = message.member;
        // Check if there are args
        if(!args[0]) return message.channel.send('Please include a cryptocurrency to sell (BTC, LTC or ETH)')
        if(!args[1]) return message.channel.send('Please include an amount to sell!')
        // Define args
        const amountToSell = parseInt(args[1])
        const cryptocur = args[0].toUpperCase()
        const crypto = ['BTC', 'LTC', 'ETH', 'eth', 'btc', 'ltc'];
        // Check if valid crypto and if args are correct values
        if(!crypto.includes(args[0])) return message.channel.send('Invalid cryptocurrency provided (BTC, LTC or ETH)!')
        if(!isNaN(args[0])) return message.channel.send('This value cannot be a number')
        if(isNaN(args[1])) return message.channel.send('Amount to sell must be a number')

        // Get price of crypto
        let response = [];
        let url = `${endpoint}${resource}?key=${NOMICS_API_KEY}&ids=${cryptocur}${params}`
        response = await httpClient.get(url)
        .catch(err => {
            console.log(err)
        })

        let price = parseInt(response.data[0].price).toFixed(0);

        let bt = ['BTC', 'btc']
        let lt = ['LTC', 'ltc']
        let et = ['ETH', 'eth']

        // Check if they have enough coins, remove the coins from their balance, give them the crypto
        const totalCost = price * amountToSell;
        
        if (bt.includes(cryptocur)) {
            if(await client.btc(message.author.id) < amountToSell) return message.channel.send(`You don't have enough crypto to sell!`);
            client.add(member.id, totalCost)
            client.addBTC(message.author.id, -amountToSell)
            message.channel.send(`Successfully sold ${amountToSell} ${cryptocur} for £${totalCost}!`)
        } else if (lt.includes(cryptocur)) {
            if(await client.ltc(message.author.id) < amountToSell) return message.channel.send(`You don't have enough crypto to sell!`);
            client.add(member.id, totalCost)
            client.addLTC(message.author.id, -amountToSell)
            message.channel.send(`Successfully sold ${amountToSell} ${cryptocur} for £${totalCost}!`)
        } else if (et.includes(cryptocur)) {
            if(await client.eth(message.author.id) < amountToSell) return message.channel.send(`You don't have enough crypto to sell!`);
            client.add(member.id, totalCost)
            client.addETH(message.author.id, -amountToSell)
            message.channel.send(`Successfully sold ${amountToSell} ${cryptocur} for £${totalCost}!`)
        } else return message.channel.send('Internal error.')


        // if (cryptocur === 'BTC') {
        //     client.add(member.id, totalCost)
        //     client.rmvBTC(member.id, amountToSell)
        //     message.channel.send(`Successfully sold ${amountToSell} ${cryptocur} for £${totalCost}!`)
        // } else if (cryptocur === 'LTC') {
        //     client.add(member.id, totalCost)
        //     client.rmvLTC(member.id, amountToSell)
        //     message.channel.send(`Successfully sold ${amountToSell} ${cryptocur} for £${totalCost}!`)
        // } else if (cryptocur === 'ETH') {
        //     client.add(member.id, totalCost)
        //     client.rmvETH(member.id, amountToSell)
        //     message.channel.send(`Successfully sold ${amountToSell} ${cryptocur} for £${totalCost}!`)
        // } else {
        //     return message.channel.send('An internal error occured please contact a developer or try again later!')
        // }
    }
}
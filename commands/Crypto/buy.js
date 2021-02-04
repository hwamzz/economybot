const { Client, Message, MessageEmbed } = require('discord.js')
const querystring = require('querystring')
const fetch = require('node-fetch')
const { query } = require('express')
const { get } = require('https')
//new Nomics({apiKey: "88f99dbd0b96afd980d4b11c6df15906"})

module.exports = {
    name: 'buy',
    usage: 'e!buy <cryptocurrency>',
    description: 'Buy a crypto currency from our list: BTC, XRP or ETH using your purse balance!',
    run: async(client, message, args) => {
        if(!args[0]) return message.channel.send('Please include a cryptocurrency to buy (BTC, XRP or ETH)')
        if(!args[1]) return message.channel.send('Please include an amount to buy!')
        const amountToBuy = parseInt(args[1])
        const cryptocur = args[0].toUpperCase()
        const crypto = ['BTC', 'XRP', 'ETH', 'eth', 'btc', 'xrp'];
        if(!crypto.includes(args[0])) return message.channel.send('Invalid cryptocurrency provided (BTC, XRP or ETH)!')
        if(!isNaN(args[0])) return message.channel.send('This value cannot be a number')
        if(isNaN(args[1])) return message.channel.send('Amount to buy must be a number')
        let results = [];
        const NOMICS_API_KEY = '88f99dbd0b96afd980d4b11c6df15906';
        await require('axios')
            .get(`https://api.nomics.com/v1/currencies/ticker?key=88f99dbd0b96afd980d4b11c6df15906&ids=${cryptocur}&interval=1d,30d&convert=GBP&per-page=100&page=1`)
            .then(response => console.log(response))
            .map(results)

        //fetch(`https://api.nomics.com/v1/currencies/ticker?key=88f99dbd0b96afd980d4b11c6df15906&ids=${query}&interval=1d,30d&convert=EUR&per-page=100&page=1`)
        //    .then(response => response.json())
        //    .then(data => console.log(data))

        //const data = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=88f99dbd0b96afd980d4b11c6df15906&ids=${query}&interval=1d,30d&convert=GBP&per-page=100&page=1`)
        //if (!data) return message.channel.send('No data found, please try again later!')

        message.channel.send(`Fetched ${cryptocur}'s price!`);
        let coinPrice;
        const totalCost = coinPrice * amountToBuy
        //if (await client.purse(message.author.id) > totalCost) return message.channel.send('Not enough coins in purse!')

        //client.rmv(message.author.id, totalCost)

    }
}
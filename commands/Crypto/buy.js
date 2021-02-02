const { Client, Message, MessageEmbed } = require('discord.js')
const querystring = require('querystring')
const fetch = require('node-fetch')
const CoinGecko = require('coingecko-api')

module.exports = {
    name: 'buy',
    usage: 'e!buy <cryptocurrency>',
    description: 'Buy a crypto currency from our list: Bitcoin, Ethereum, Ripple or Litecoin using your purse balance!',
    run: async(client, message, args) => {
        if(!args[0]) return message.channel.send('Please include a cryptocurrency to buy (Bitcoin, Ethereum, Ripple or Litecoin)')
        if(!args[1]) return message.channel.send('Please include an amount to buy!')
        const crypto = ['Bitcoin', 'Ethereum', 'Ripple', 'Litecoin'];
        if(!crypto.includes(args[0])) return message.channel.send('Invalid cryptocurrency provided!')
        if(!isNaN(args[0])) return message.channel.send('This value cannot be a number')
        if(isNaN(args[1])) return message.channel.send('Amount to buy must be a number')

        const amountToBuy = parseInt(args[1])
        const query = args[0]

        let data = await CoinGeckoClient.coins(`${query}`);
        if (!data) return message.channel.send('No data found, please try again later!')

        const coinPrice = data;
        const totalCost = coinPrice * amountToBuy
        if (await client.purse(message.author.id) > totalCost) return message.channel.send('Not enough coins in purse!')

        client.rmv(message.author.id, totalCost)

    }
}
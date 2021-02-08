const { Client, Message, MessageEmbed } = require('discord.js')
const endpoint = 'https://api.nomics.com/v1/'
const resource = 'currencies/ticker'
const NOMICS_API_KEY = '88f99dbd0b96afd980d4b11c6df15906'; 
const params = '&interval=1d,30d&convert=GBP&per-page=100&page=1'
const httpClient = require('axios')

module.exports = {
    name: 'inventory',
    usage: 'e!inventory',
    aliases: 'e!inv',
    description: 'View your cryptocurrency and other items!',
    run: async(client, message, args) => {
        const target = message.mentions.members.first() || message.member;
        const btc = await client.btc(target.id)
        const ltc = await client.ltc(target.id)
        const eth = await client.eth(target.id)

        let response = [];
        let url = `${endpoint}${resource}?key=${NOMICS_API_KEY}&ids=BTC,LTC,ETH${params}`
        response = await httpClient.get(url)
        .catch(err => {
            console.log(err)
        })
        let btcPrice = parseInt(response.data[0].price).toFixed(0);
        let ltcPrice = parseInt(response.data[2].price).toFixed(0);
        let ethPrice = parseInt(response.data[1].price).toFixed(0);

        const btcTotal = btcPrice * btc;
        const ltcTotal = ltcPrice * ltc;
        const ethTotal = ethPrice * eth;

        const totals = btcTotal + ltcTotal + ethTotal;

        const inventoryEmbed = new MessageEmbed()
            .setColor('#98asfg')
            .setTitle(`${target.displayName}'s inventory`)
            .addFields(
                { name: `Bitcoin: ${btc}`, value: `**Valued at:** £${btcTotal}` },
                { name: `Litecoin: ${ltc}`, value: `**Valued at:** £${ltcTotal}` },
                { name: `Ethereum: ${eth}`, value: `**Valued at:** £${ethTotal}` },
                { name: 'Total: ', value: `£${totals}` }
            );

        message.channel.send(inventoryEmbed)
    }
}
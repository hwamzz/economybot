const { Client, Message, MessageEmbed } = require('discord.js')
const endpoint = 'https://api.nomics.com/v1/'
const resource = 'currencies/ticker'
const NOMICS_API_KEY = '88f99dbd0b96afd980d4b11c6df15906'; 
const params = '&interval=1d,30d&convert=GBP&per-page=100&page=1'
const httpClient = require('axios')

module.exports = {
    name: 'bal',
    usage: `e!bal`,
    aliases: `b`,
    description: `Check your purse and bank balance, and your net worth!`,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.member;

        const purse = await client.purse(member.id);
        var bank = await client.bank(member.id);

        const btc = await client.btc(member.id)
        const ltc = await client.ltc(member.id)
        const eth = await client.eth(member.id)

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

        const totals = btcTotal + ltcTotal + ethTotal + purse + bank;

        if (bank === 'undefined') bank += 1000;

        const balanceEmbed = new MessageEmbed()
        .setColor('#fff777')
        .setTitle(`Balance info`)
        .setDescription(`You have **${purse}** coins in your purse! \n You have **${bank}** coins in your bank! \n Your net worth is **${totals}**`)

        message.channel.send(balanceEmbed);
    }
}